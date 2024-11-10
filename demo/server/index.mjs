import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const recvSet = new Set();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    if (message === 'DASHBOARD') {
      recvSet.add(ws);
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
