// List of all standard DOM events
const allEvents = [
    // Mouse events
    'click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave',
    // Keyboard events
    'keydown', 'keyup', 'keypress',
    // Form events
    'focus', 'blur', 'change', 'submit', 'reset', 'input',
    // Window events
    'resize', 'scroll', 'load', 'unload', 'beforeunload',
    // Document events
    'DOMContentLoaded',
    // Drag and Drop events
    'dragstart', 'drag', 'dragenter', 'dragleave', 'dragover', 'drop', 'dragend',
    // Animation events
    'animationstart', 'animationend', 'animationiteration',
    // Transition events
    'transitionend',
    // Message events
    'message', 'messageerror',
    // Storage events
    'storage',
    // Media events
    'play', 'pause', 'playing', 'seeking', 'seeked', 'timeupdate', 'ended', 'loadeddata', 'loadedmetadata',
    // Pointer events
    //'pointerdown', 'pointerup', 'pointermove', 'pointerover', 'pointerout', 'pointerenter', 'pointerleave',
    // Touch events
    'touchstart', 'touchend', 'touchmove', 'touchcancel',
    // Clipboard events
    'cut', 'copy', 'paste'
];

class EventLogger {
    constructor(options = {}) {
        this.options = {
            logToConsole: true,
            logToUI: true,
            excludeEvents: [],
            excludeSelectors: [],
            maxLogs: 100,
            ...options
        };
        
        this.eventLog = [];
        this.paused = false;
        
        if (this.options.logToUI) {
            this.createUI();
        }
    }

    createUI() {
        // Create UI container
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            bottom: 0;
            right: 0;
            width: 400px;
            height: 300px;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 10px;
            font-family: monospace;
            font-size: 12px;
            overflow: hidden;
            z-index: 10000;
        `;

        // Create controls
        const controls = document.createElement('div');
        controls.innerHTML = `
            <button id="clearEvents">Clear</button>
            <button id="togglePause">Pause</button>
            <button id="toggleCollapse">Collapse</button>
            <input type="text" id="eventFilter" placeholder="Filter events..." style="margin-left: 10px;">
        `;
        container.appendChild(controls);

        // Create log container
        const logContainer = document.createElement('div');
        logContainer.style.cssText = `
            height: calc(100% - 30px);
            overflow-y: auto;
            margin-top: 10px;
        `;
        container.appendChild(logContainer);

        // Add event listeners to controls
        controls.querySelector('#clearEvents').onclick = () => this.clearLogs();
        controls.querySelector('#togglePause').onclick = () => this.togglePause();
        controls.querySelector('#toggleCollapse').onclick = () => this.toggleCollapse();
        controls.querySelector('#eventFilter').oninput = (e) => this.filterLogs(e.target.value);

        document.body.appendChild(container);
        this.logContainer = logContainer;
    }

    start() {
        allEvents.forEach(eventName => {
            if (!this.options.excludeEvents.includes(eventName)) {
                window.addEventListener(eventName, (event) => this.logEvent(event), true);
                document.addEventListener(eventName, (event) => this.logEvent(event), true);
            }
        });

        // Special handling for postMessage
        window.addEventListener('message', (event) => {
            this.logEvent(event, {
                type: 'postMessage',
                origin: event.origin,
                data: event.data
            });
        });
    }

    logEvent(event, extraData = {}) {
        if (this.paused) return;

        // Check if event target matches excluded selectors
        if (this.options.excludeSelectors.some(selector => 
            event.target.matches && event.target.matches(selector))) {
            return;
        }

        const logEntry = {
            timestamp: new Date().toISOString(),
            type: event.type,
            target: this.getElementDescription(event.target),
            properties: this.getEventProperties(event),
            ...extraData
        };

        this.eventLog.unshift(logEntry);
        
        // Trim log if it exceeds maximum size
        if (this.eventLog.length > this.options.maxLogs) {
            this.eventLog.pop();
        }

        if (this.options.logToConsole) {
            console.log('Event:', logEntry);
        }

        if (this.options.logToUI) {
            this.updateUI();
        }
    }

    getElementDescription(element) {
        if (!element) return 'none';
        if (element === window) return 'window';
        if (element === document) return 'document';

        let description = element.tagName.toLowerCase();
        if (element.id) description += `#${element.id}`;
        if (element.className) description += `.${element.className.split(' ').join('.')}`;
        return description;
    }

    getEventProperties(event) {
        const properties = {};
        
        // Common properties
        if (event.clientX !== undefined) properties.clientX = event.clientX;
        if (event.clientY !== undefined) properties.clientY = event.clientY;
        if (event.key !== undefined) properties.key = event.key;
        if (event.code !== undefined) properties.code = event.code;
        if (event.keyCode !== undefined) properties.keyCode = event.keyCode;
        
        // For postMessage events
        if (event.type === 'message') {
            try {
                properties.data = JSON.stringify(event.data);
                properties.origin = event.origin;
            } catch (e) {
                properties.data = 'Unable to stringify data';
            }
        }

        return properties;
    }

    updateUI() {
        if (!this.logContainer) return;

        const currentFilter = document.querySelector('#eventFilter')?.value || '';
        const filtered = this.eventLog.filter(entry => 
            entry.type.includes(currentFilter) || 
            entry.target.includes(currentFilter)
        );

        this.logContainer.innerHTML = filtered.map(entry => `
            <div style="border-bottom: 1px solid #444; padding: 5px 0;">
                <span style="color: #aaa;">${entry.timestamp.split('T')[1]}</span>
                <span style="color: #ff9;">${entry.type}</span>
                <span style="color: #9f9;">${entry.target}</span>
                <pre style="color: #99f; margin: 2px 0;">${JSON.stringify(entry.properties, null, 2)}</pre>
            </div>
        `).join('');
    }

    clearLogs() {
        this.eventLog = [];
        if (this.logContainer) {
            this.logContainer.innerHTML = '';
        }
    }

    togglePause() {
        this.paused = !this.paused;
        const button = document.querySelector('#togglePause');
        if (button) {
            button.textContent = this.paused ? 'Resume' : 'Pause';
        }
    }

    toggleCollapse() {
        const container = this.logContainer.parentElement;
        if (container.style.height === '30px') {
            container.style.height = '300px';
        } else {
            container.style.height = '30px';
        }
    }

    filterLogs(filterText) {
        this.updateUI();
    }
}

// Usage example:
const logger = new EventLogger({
    logToConsole: true,  // Log to browser console
    logToUI: true,       // Show UI overlay
    excludeEvents: ['mousemove', 'mouseenter', 'mouseleave'], // Events to ignore
    excludeSelectors: ['.no-log'], // Elements to ignore
    maxLogs: 100        // Maximum number of logs to keep
});

logger.start();
