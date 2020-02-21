let socket = new WebSocket('ws://192.168.137.37:7070')
let keyArr = [
    {code: 87, key: 'w', action: '', pressed: false},
    {code: 65, key: 'a', action: '', pressed: false},
    {code: 83, key: 's', action: '', pressed: false},
    {code: 68, key: 'd', action: '', pressed: false}]

socket.onopen = function(e) {
  console.log("Server connection established")
  socket.send("Browser connection established")
};

socket.onmessage = function(event) {
  console.log(`Data received from server: ${event.data}`)
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`The server enjoyed your company, but had to bounce because ${event.reason}`)
  } else {
    // server process killed or network down
    alert(`The server's last words were "I would have gotten away with it, too. If it wasn't for error code ${event.code}"`);
  }
}

socket.onerror = function(error) {
  alert(`Socket error: ${error.message}`);
};

$(document).on("keydown", function(event) {
    for(var i = 0; i < keyArr.length; i++){
        if(keyArr[i].code === event.which){
        socket.send(keyArr[i].key)}
    }
});