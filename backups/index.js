const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile("index.html");
});
  
app.get("/api/commands", function(req, res) {
    return res.json(characters);
});
  
app.listen(port, function() {
    console.log(`http://192.168.137.37:${port}`)
})