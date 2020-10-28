let today;
let newDate;

window.addEventListener('load', () => {
    //open and connect socket
    let socket = io();

    //listen for confirmation of connection
    socket.on('connect', () => {
        console.log("Connected");
    });

     /* --- Code to SEND a socket message to the Server --- */
    //for the good memories
    let memGood = document.getElementById("good-memories");
    let sendGoodMem = document.getElementById("button-good");


    sendGoodMem.addEventListener('click', () => {
        let goodMemory = memGood.value;
        console.log(goodMemory);

        let msgObj = {"memory" : goodMemory};

        //send the message object to the server
        socket.emit('msg', msgObj);
    
    });

    //Code to send bad memories to Server
    let memBad = document.getElementById("bad-memories");
    let sendBadMem = document.getElementById("button-bad");

    sendBadMem.addEventListener('click', () => {
        let badMemory = memBad.value;
        console.log(badMemory);

        let msgObj2 = {"memory" : badMemory};

        //send the message object to the server
        socket.emit('badmsg', msgObj2);
    })

    /* -- Code to RECEIVE a socket message from the server -- */
    let goodMemBox = document.getElementById('happy-info');
    let badMemBox = document.getElementById('bad-info');

    //Listen for the message 'msg' from the server
    socket.on('msg', (data) => {
        console.log("message arrived!");
        console.log(data);
    
        today = new Date();
        newDate = today.toDateString();

    //create a message string and the page element where messages will show up
    let receivedMsg = newDate + ' ' + data.memory;
    let msgEl = document.createElement('p');
    msgEl.innerHTML = receivedMsg;

    //Add the element to the page
    goodMemBox.appendChild(msgEl);

    //fancy scroll
    goodMemBox.scrollTop = goodMemBox.scrollHeight;

    });

    //for creating bad memory display
    socket.on('badmsg', (data) => {
        console.log("bad message arrived!");
        console.log(data);

        today = new Date();
        newDate = today.toDateString();

        let receivedMsgBad = newDate + ' ' + data.memory;
        let badmsgEl = document.createElement('p');
        badmsgEl.innerHTML = receivedMsgBad;

        badMemBox.appendChild(badmsgEl);

        badMemBox.scrollTop = badMemBox.scrollHeight;
    })


});

