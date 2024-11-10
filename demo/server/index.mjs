import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const recvSet = new Set();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    if (message.byteLength === 9 && message.toString() === 'DASHBOARD') {
      recvSet.add(ws);
    } else if (message.byteLength === 4 && message.toString() === 'PING') {
      ws.send(Buffer.from('PONG'))
    } else {
      [...recvSet].forEach((ws) => {
        ws.send(message);
      })
    }
  });

  ws.on('close', () => {
    recvSet.delete(ws);
  });
});
