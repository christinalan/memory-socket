let express = require('express');
let app = express();
app.use('/', express.static('public'));

//initialize actual http server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
})

//intialize socket.io
let io = require('socket.io').listen(server);

//listen for users to connect
io.sockets.on('connection', (socket) => {
    console.log("we have a new client: " + socket.id);

//listen for a message named 'msg' from the client
    socket.on('msg', (data) => {
    console.log("Received a 'msg' event");
    console.log(data);

    //send the message to all the clients, including the one who just sent
    io.sockets.emit('msg', data);
});

//listen for a secondn message named 'badmsg' from the client
    socket.on('badmsg', (data) => {
        console.log("Received a 'badmsg' event");
        console.log(data);

//send the message to all the clients, including the one who just sent
        io.sockets.emit('badmsg', data);
    })
//listen for client to disconnect
    socket.on('disconnect', () => {
    console.log("client has disconnected: " + socket.id)
    });

});

