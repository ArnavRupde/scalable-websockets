import express from 'express';
import http from 'http';
import {WebSocketServer} from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});

const port = 3000;

wss.on("connection", async(ws, req)=> {
    console.log("client connected");
    ws.on("message", (message) => {
        console.log(`Received message from client: ${message}`);
        ws.send(`Original message was: ${message}`);
    });
});

app.get('/health', (req, res) => {
    res.json({"status": "OK"});
});

server.listen(port, () => {
    console.log(`Running on port: ${port}`);
});


