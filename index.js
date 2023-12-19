const http = require("http")
const express = require('express')
const path = require('path')
const app = express()
const {Server} = require('socket.io')
const server = http.createServer(app)
const PORT = process.env.PORT || 3000
app.use(express.static(__dirname + "/public"))
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})
server.listen(PORT,()=> console.log(`server running on ${PORT}`))

const io = new Server(server)
io.on("connection",(socket) =>{
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})