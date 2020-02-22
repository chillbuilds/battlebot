let activeSocket = false
var socket;
let lastKey = ''

let keyArr = [
    {code: 87, codeStr: '87', action: '', pressed: false},
    {code: 65, codeStr: '65', action: '', pressed: false},
    {code: 83, codeStr: '83', action: '', pressed: false},
    {code: 68, codeStr: '68', action: '', pressed: false},
    {code: 32, codeStr: '32', action: '', pressed: false}]

$(connectBtn).on('click', function() {
  if(activeSocket === false){

    activeSocket = true
    socket = new WebSocket('ws://192.168.43.72:7070')

    socket.onopen = function(e) {
      console.log("Server connection established")
      socket.send("Browser connection established")
    }
    
    socket.onmessage = function(event) {
      console.log(`Data from server: ${event.data}`)
    }
    
    socket.onclose = function(event) {
      if (event.wasClean) {
        alert('Thanks for playing. Please tip your server.')
        activeSocket = false
      } else {
        // server process killed or network down
        alert(`You pull the monster mask off the server as it utters, "I would have gotten away with it, too. If it wasn't for error code ${event.code}"`)
        activeSocket = false
      }
    }
    
    socket.onerror = function(error) {
      alert(`Socket error: ${error.message}`)
    }
  }
})

$(document).on('keydown', function(event) {
  if(activeSocket === true){
  for(var i = 0; i < keyArr.length; i++){
    if(keyArr[i].code === event.which && event.which !== lastKey){
      socket.send(`keydown @ ${event.which}`)
    }
  }
  lastKey = event.which
}
})

$(document).on('keyup', function(event) {
  socket.send(`keyup @ ${event.which}`)
  if(event.which === lastKey){
    lastKey = 999
  }
})