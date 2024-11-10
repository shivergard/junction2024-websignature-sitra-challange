import { useEffect, useState } from 'react';
import './App.css';
import Card from './Card.js';
import MouseCurvatureChart from './MouseCurvatureChart.js';
import InteractionSimilarityScore from './InteractionSimilarityScore.js';

/*
const eventSource = (() => {
  const messageChannel = new MessageChannel();
  messageChannel.port2.start();
  let seq = 0;
  setInterval(() => {
    messageChannel.port1.postMessage(JSON.stringify({
      "topic": "Topic " + seq++,
      "response": ["agree", "disagree", "pass"][Math.random() * 3 | 0],
      "mouseCurvatureAnglePdf": new Array(100).fill(0).map(() => Math.random()),
      "interactionSimilarityScore": 100 * Math.random(),
    }));
  }, 2000);

  return messageChannel.port2;
})();
*/

const eventSource = (() => {
  const socket = new WebSocket('ws://172.25.169.169:5000');
  const messageChannel = new MessageChannel();
  messageChannel.port2.start();

  let intervalId;

  socket.onmessage = (event) => {
    event.data.text().then((data) => messageChannel.port1.postMessage(data), (error) => {
      console.error('Error receiving message', error);
    });
  };

  socket.onopen = () => {
    socket.send('DASHBOARD');
    intervalId = setInterval(() => {
      socket.send('PING');
    }, 5000);
  };

  socket.onclose = () => {
    console.log('Disconnected from server');
    if (intervalId != null) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  socket.onerror = (error) => {
    console.log('Error occurred');
    console.log(error);
    alert('Error')
  };

  return messageChannel.port2;
})();

const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const listener = (event) => {
      setEvents([...events.slice(-49), JSON.parse(event.data)]);
    };

    eventSource.addEventListener('message', listener, true);

    return () => {
      eventSource.removeEventListener('message', listener, true);
    };
  }, [events])

  return (
    <>{
      events.length
        ? <div className="App">
          <Card
            topic={events[events.length - 1].topic}
            response={events[events.length - 1].response}
          />
          <MouseCurvatureChart events={events} />
          <InteractionSimilarityScore events={events} />
        </div>
        : undefined
    }</>
  );
}

export default App;
