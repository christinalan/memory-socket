let trashClicked;
let string;
let element;

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

    //create a message string and the page element where messages will show up
    let receivedMsg = data.memory;
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

        let receivedMsgBad = data.memory;
        let badmsgEl = document.createElement('p');
        badmsgEl.innerHTML = receivedMsgBad;

        badMemBox.appendChild(badmsgEl);

        badMemBox.scrollTop = badMemBox.scrollHeight;
    })


});

/*
    // fetch info from good memory database 
    document.getElementById('get-happy-tracker').addEventListener('click', () => {
        fetch('/getGoodMemories')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('happy-info').innerHTML = '';
            console.log(data.data);
            for (let i=0; i< data.data.length; i++) {
                let string = data.data[i].date + " : " + data.data[i].memory;
                let element = document.createElement('p');
                element.innerHTML = string;
                document.getElementById('happy-info').appendChild(element);
            }
        })
    })

    document.getElementById('button-bad').addEventListener('click', () => {
        let badMemory = document.getElementById('bad-memories').value;
        console.log(badMemory);

        let obj2 = {"memory" : badMemory};
        //stringify the data. server will parse and convert the string back into json object
        let jsonData = JSON.stringify(obj2);

        //make a fetch request of type POST so that we can send input to the server
        fetch('/badMemories', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); //shows that the server has successfully inserted new memory
        }) 

        //fetch request to send input to the trash button in the server
        fetch('/trashBadMem', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    })

    document.getElementById('get-bad-tracker').addEventListener('click', () => {
        fetch('/getBadMemories')
        .then(resp => resp.json())
        .then(data => {
            document.getElementById('bad-info').innerHTML = '';
            console.log(data.data);
       
                for (let i=0; i< data.data.length; i++) {
                    string = data.data[i].date + " : " + data.data[i].memory;
                    element = document.createElement('p');
                    element.innerHTML = string;
                    document.getElementById('bad-info').appendChild(element);
                }
       
        })
    })

    document.getElementById('trash-image').addEventListener('click', () => {
        fetch('/trashedBadMem')
        .then(resp => resp.json())
        .then(data => {
            console.log(data.data);
        })
              //if it's clicked, then content disappears
        document.getElementById('bad-info').innerHTML = '';
    //   trashClicked = !trashClicked;
    //   console.log(trashClicked);
    })
    
})

*/