let sendMessage = document.getElementById("sendMessage");
sendMessage.addEventListener("click", send)

let myMessage = document.getElementById("message");
myMessage.addEventListener("change", send)

let chatBox = document.getElementById("chatBox");

let conn;

function send() {
    if(myMessage.value.trim() != "") {
        displayMessage("self", myMessage.value);

        if (conn) {
            conn.send(myMessage.value);
        }

        myMessage.value = "";
    }
}

function displayMessage(person, message) {
    let textNode = document.createTextNode(message);

	let li = document.createElement('li');
    li.className = person;
	li.appendChild(textNode);
	
	chatBox.appendChild(li);

}

let peer = new Peer({
	config: {'iceServers': [ { urls: 'stun:freeturn.net:5349' },
     { urls: 'turns:freeturn.tel:5349', username: 'free', credential: 'free' } ]} /* Sample servers, please use appropriate ones */
  });
peer.on('open', function(id) {
    let textNode = document.createTextNode("My ID: " + peer.id);
    document.getElementById("id").appendChild(textNode);
  });

peer.on("connection", function(con) {
    document.getElementById("connStatus").className = "connected";
    con.on('data', function(data) {
        displayMessage('other', data);
    });
    conn = con;
    while (chatBox.firstChild) {
        chatBox.removeChild(chatBox.firstChild);
    }
});

let peerID = document.getElementById("peerID");
let connectToPeer = document.getElementById("connect");
connectToPeer.addEventListener("click", startConnection)



function startConnection() {
    conn = peer.connect(peerID.value);
    conn.on("open", function() {
        document.getElementById("connStatus").className = "connected";
        conn.on('data', function(data) {
            displayMessage('other', data);
          });
    });
    while (chatBox.firstChild) {
        chatBox.removeChild(chatBox.firstChild);
    }
}




