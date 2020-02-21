let socket = new WebSocket('ws://192.168.137.37:7070');

socket.onopen = function(e) {
  console.log("Server connection established");
  socket.send("Browser connection established");
};

socket.onmessage = function(event) {
  console.log(`Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    alert(`The server enjoyed your company, but had to bounce because ${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    alert(`The server's last words were "I would have gotten away with it, too. If it wasn't for error code ${event.code}"`);
  }
};

socket.onerror = function(error) {
  alert(`Socket error: ${error.message}`);
};

$(document).on("keydown", function(event) {
    socket.send(event.which)
});