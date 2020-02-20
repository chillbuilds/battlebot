const net = require('net')
const client = new net.Socket()
const port = 7070
const host = '192.168.137.252'

var keypress = require('keypress');
 
// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
 
// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
    if(ch === "w"){
        client.write(ch)}
        client.write(" ")
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});
 
process.stdin.setRawMode(true);
process.stdin.resume();

client.connect(port, host, function() {
    console.log('Connected')
});