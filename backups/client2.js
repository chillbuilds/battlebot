const net = require('net')
const client = new net.Socket()
const port = 7070
const host = '192.168.137.252'

client.connect(port, host, function() {
    console.log('Connected');
    client.write("Hello From Client " + client.address().address);
    dataStream()
});

function dataStream() {
    setInterval(function(){ 
        let date = new Date
        let millisecond = date.getMilliseconds()
        let milli = millisecond.toString()
        client.write("sup")
        }, 70);
}