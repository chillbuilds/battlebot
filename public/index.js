let activeSocket = false
var socket;
let lastKey = ''

let keyArr = [87, 65, 83, 68, 32]

$(connectBtn).on('click', function() {
  if(activeSocket === false){

    socket = new WebSocket('ws://192.168.43.72:7070')
    activeSocket = true

    socket.onopen = function(e) {
      console.log('Server connection established')
      socket.send('Browser connection established')
      $('#connectBtn').attr('style', 'background: rgba(0, 255, 0, 0.5);')
    }
    
    socket.onmessage = function(event) {
      console.log(`Data from server: ${event.data}`)
    }
    
    socket.onclose = function(event) {
      if (event.wasClean) {
        $('#connectBtn').attr('style', 'background: rgba(0, 0, 0, 0);')
        activeSocket = false
      } else {
        // server process killed or network down
        alert(`You pull the monster mask off the server as it utters, "I would have gotten away with it, too. If it wasn't for error code ${event.code}"`)
        activeSocket = false
        $('#connectBtn').attr('style', 'background: rgba(255, 0, 0, 0.5);')
      }
    }
    
    socket.onerror = function(error) {
      $('#connectBtn').attr('style', 'background: rgba(255, 0, 0, 0.5);')
      activeSocket = false
    }
  }else{
    activeSocket = false
    socket.send('Browser connection closed')
    socket.close()
  }
})

$(document).on('keydown', function(event) {
  if(activeSocket === true){
  for(var i = 0; i < keyArr.length; i++){
    if(keyArr[i] === event.which && event.which !== lastKey){
      socket.send(`keydown @ ${event.which}`)
    }
  }
  lastKey = event.which
}
})

$(document).on('keyup', function(event) {
  for(var i = 0; i < keyArr.length; i++){
    if(keyArr[i] === event.which){
      socket.send(`keyup @ ${event.which}`)
    }
  }
  if(event.which === lastKey){
    lastKey = undefined
  }
})