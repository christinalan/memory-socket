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

/*
let today = new Date();
let newDate = today.toDateString();

//need to add a route to server that listens for a POST request for good memories
app.post('/goodMemories', (req, res) => {
    console.log(req.body);
    // let currentDate = Date();
    let obj = {
        date: newDate,
        memory: req.body.memory
    }
//insert memory into the memory database
    db.insert(obj, (err, newDocs) => {
        if(err) {
            res.json({task:"task failed"})
        } else {
        res.json({task:"success"});
        }
    })

})

//add route to get all logged good memory info
app.get('/getGoodMemories', (req, res) => {

    db.find({}, (err, docs)=> {
        if(err) {
            res.json({task:"task failed"})
        } else {
            console.log(docs)
            let obj = {data: docs};
            res.json(obj);
        }
    })

})

//route to server that listens for POST request for bad memories
app.post('/badMemories', (req, res) => {
    console.log(req.body);
    // let currentDate = Date();
    let obj2 = {
        date: newDate,
        memory: req.body.memory
    }

    //insert memory into the memory database
    dbBad.insert(obj2, (err, newDocs) => {
        if(err) {
            res.json({task:"task failed"})
        } else {
        res.json({task:"success"});
        }
    })
  
})

//add route to store all logged bad memories
app.get('/getBadMemories', (req, res) => {
    dbBad.find({}, (err, docs)=> {
        if(err) {
            res.json({task:"task failed"})
        } else {
            console.log(docs)
            let obj2 = {data: docs};
            res.json(obj2);
        }
    })
})

//routes for trashing bad memories
app.post('/trashBadMem', (req, res) => {
    console.log(req.body);
})

app.get('/trashedBadMem', (req, res) => {
    dbBad.remove({}, {multi: true}, (err, numRemoved)=> {
        if(err) {
            res.json({task:"task failed"})
        } else {
            console.log(numRemoved)
            let obj2 = {data: numRemoved};
            res.json(obj2);
        }
    })
})

*/