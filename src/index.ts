import express from 'express';
import http from 'http';
import {WebSocketServer} from 'ws';
import {createClient} from 'redis'
import path from 'path'
import {v4 as uuidv4} from 'uuid';
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});

app.use(express.static( path.resolve('./public') ));

const port = 3000;

// Set up redis publisher and subscriber client
const redisConnectionUrl = process.env.REDIS_URL;

const publisher = createClient({
    url: redisConnectionUrl
});
const subscriber = createClient({
    url: redisConnectionUrl
});

( async () => {
    await publisher.connect();
}) ();
( async () => {
    await subscriber.connect();
}) ();

wss.on("connection", async(ws, req)=> {
    console.log("client connected");

    // Assign random id to user
    const userId = uuidv4();
    ws.send(JSON.stringify({
        type: 'joined',
        payload: {
            userId: userId
        }
    }));
    ws.on("message", async(messageData) => {
        console.log(`Received message from client: ${messageData}`);
        await publisher.publish('Chats', messageData.toString());
        // wss.clients.forEach(
        //     function each(client) {
        //         if(client !== ws)
        //             client.send(messageData.toString());
        //     }
        // );
    });
});

subscriber.subscribe('Chats', function(message, channel) {
    if(channel == 'Chats') {
        // Send message to all websocket clients
        wss.clients.forEach(
            function each(client) {
                client.send(message);
            }
        )
    }
} );

app.get('/health', (req, res) => {
    res.json({"status": "OK"});
});

server.listen(port, () => {
    console.log(`Running on port: ${port}`);
});


