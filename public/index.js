
// $(document).on("keydown", function(event) {
//     // alert(event.which)
//     console.log(event.which)
// });

// const webSocket = new WebSocket('ws://192.168.137.37:7070')

// webSocket.onopen = function (event) {
//     console.log(event)
//     webSocket.send("Here's some text that the server is urgently awaiting!"); 
// };


// $('.postBtn').on('click', function(){
//     webSocket.send("Here's some text that the server is urgently awaiting!")
//     webSocket.close()
// })
// webSocket.send("Here's some text that the server is urgently awaiting!"); 

let socket = new WebSocket('ws://192.168.137.37:7070');

socket.onopen = function(e) {
  console.log("[open] Connection established");
  console.log("Sending to server");
  socket.send("My name is John");
};

socket.onmessage = function(event) {
  console.log(`[message] Data received from server: ${event.data}`);
};

socket.onclose = function(event) {
  if (event.wasClean) {
    console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
  } else {
    // e.g. server process killed or network down
    // event.code is usually 1006 in this case
    console.log('[close] Connection died');
  }
};

socket.onerror = function(error) {
  console.log(`[error] ${error.message}`);
};

$(document).on("keydown", function(event) {
    // alert(event.which)
    console.log(event.which)
});