const webSocket = new WebSocket("ws://localhost:3000");

function sendMessage() {
    const inputMsgText = document.getElementById("inputbox").value;
    webSocket.send(
        JSON.stringify({
            type: "message",
            payload: {
                message: inputMsgText
            }
        })
    );
    const msgsElement = document.getElementById("allMessages");
    msgsElement.innerHTML += `<h3 style="color:red;"> You: ` + inputMsgText + `</h3>`;
}
webSocket.onmessage = function (event) {
    console.log(`event: ${event.data}`);
    const msgData = JSON.parse(event.data);
    if (msgData.type == 'message') {
        const msgsElement = document.getElementById("allMessages");
        msgsElement.innerHTML += `<h3 style="color:blue;"> Stranger: ` + msgData.payload.message + `</h3>`;
    }
}