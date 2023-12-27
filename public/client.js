const webSocket = new WebSocket("ws://localhost:3000");

let userId = null;

function sendMessage() {
    const inputMsgText = document.getElementById("inputbox").value;
    webSocket.send(
        JSON.stringify({
            type: "message",
            payload: {
                sender: userId,
                message: inputMsgText
            }
        })
    );
}
webSocket.onmessage = function (event) {
    console.log(`event: ${event.data}`);
    const msgData = JSON.parse(event.data);
    if(msgData.type == 'joined') {
        userId = msgData.payload.userId;
    } else if (msgData.type == 'message') {
        const msgsElement = document.getElementById("allMessages");
        if (msgData.payload.sender == userId) {
            msgsElement.innerHTML += `<h3 style="color:red;"> You: ` + msgData.payload.message + `</h3>`;
        } else {
            msgsElement.innerHTML += `<h3 style="color:blue;"> Stranger: ` + msgData.payload.message + `</h3>`;
        }
    }
}