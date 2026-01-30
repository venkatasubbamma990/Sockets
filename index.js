const express = require('express')
const app = express()
const port = 8000

const http = require('http').Server(app)

const io = require('socket.io')(http)



app.get('/' , (req,res)=> {
    res.send("Hello World")
})

app.get('/socket' , (req,res)=> {
    res.sendFile(__dirname + '/src/index.html')
})

io.on('connection', (socket)=> {
    console.log("New client connected with socket ID:", socket.id)
    

    socket.on('message', (message) => {
        console.log('Message received from client:', message )
    })
    socket.on('disconnect', () => {
        console.log("Client disconnected with socket ID:", socket.id)
    })
    socket.emit('message', 'Hello Client')
})
http.listen(port , ()=> {
    console.log(`server is listening on http://localhost:${port}`)
})