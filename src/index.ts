import express from 'express';

const app = express();
const port = 3000;

app.get('/health', (req, res) => {
    res.json({"status": "OK"});
});

app.listen(port, () => {
    console.log(`Running on port: ${port}`)
});


