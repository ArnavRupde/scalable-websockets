import express from 'express';
import http from 'http';
import {WebSocketServer} from 'ws';
import path from 'path'

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});

app.use(express.static( path.resolve('./public') ));

const port = 3000;

wss.on("connection", async(ws, req)=> {
    console.log("client connected");
    ws.on("message", (messageData) => {
        console.log(`Received message from client: ${messageData}`);
        wss.clients.forEach(
            function each(client) {
                if(client !== ws)
                    client.send(messageData.toString());
            }
        );
    });
});

app.get('/health', (req, res) => {
    res.json({"status": "OK"});
});

server.listen(port, () => {
    console.log(`Running on port: ${port}`);
});


