


function logMessage(internal){
    try {
        if (window.ws && window.ws.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({ 
                demo_crat : localStorage.getItem("demo_crat"),
                direct_bot_logs: true,
                bot_message: internal
              });
              window.ws.send(message);
          } else {
            // Create a new WebSocket connection to the server
            window.ws = new WebSocket('wss://polis.local:5801');
        
            // When the WebSocket connection opens
            ws.onopen = () => {
              console.log("Connected to WebSocket server");
            };
        
            // When a message is received from the server
            ws.onmessage = (event) => {
              const message = JSON.parse(event.data).message;
              console.log("Received:", message);
            };
        
            // When the WebSocket connection is closed
            ws.onclose = () => {
              console.log("Disconnected from WebSocket server");
            };
        
            // When there's an error with the WebSocket connection
            ws.onerror = (error) => {
              console.error("WebSocket error:", error);
            };
            setTimeout(function (){
            const message = JSON.stringify({ 
                demo_crat : localStorage.getItem("demo_crat"),
                direct_bot_logs: true,
                bot_message: internal
            });
              window.ws.send(message);
            }, 5000);
        
          }
    } catch (error) {
        console.log(error, message);
    }
}

logMessage("example message");


