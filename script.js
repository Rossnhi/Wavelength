let sendMessage = document.getElementById("sendMessage");
sendMessage.addEventListener("click", send)

let message = document.getElementById("message");

let chatBox = document.getElementById("chatBox");

function send() {
    displayMessage("self");



    message.value = "";
}

function displayMessage(person) {
    let textNode = document.createTextNode(message.value);

	let li = document.createElement('li');
    li.className = person;
	li.appendChild(textNode);
	
	chatBox.appendChild(li);

}

let peer = new Peer();
peer.on('open', function(id) {
    let textNode = document.createTextNode("My ID: " + peer.id);
    document.getElementById("id").appendChild(textNode);
  });

let peerID = document.getElementById("peerID");
let connectToPeer = document.getElementById("connect");
connectToPeer.addEventListener("click", startConnection)

let conn;

function startConnection() {
    conn = peer.connect(peerID.value);
}

conn.on("open", function() {
    document.getElementById("connStatus").className = "connected";
});


