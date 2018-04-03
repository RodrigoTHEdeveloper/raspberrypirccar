///////////////////////////////////////////////////////////
//   					Pagina							 //
///////////////////////////////////////////////////////////

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(7000);

app.use('/', express.static('client'));
app.use('/camara', express.static('client/camara.html')); 
app.use('/debug', express.static('client/debug.html')); 

console.log("Corriendo en puerto 7000")

var horizontal=0;
var vertical=0;

io.on("connection",function(socket) {
	console.log("Usuario:"+socket.id)

	//Resivir Teclas Desde el Cliente
	
	socket.on("Dir2",function(data){
//		console.log("Horizontal direction: "+data)
        horizontal = data.horizontal;
        vertical = data.vertical;
	})
})


///////////////////////////////////////////////////////////
//   					ARDUINO	Y/O Raspberry						 //
///////////////////////////////////////////////////////////

var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {

    var motorLeft = new five.Led(3);
    var motorRight = new five.Led(4);

    motorLeft.off();
    motorRight.off();

    io.on("connection", function(socket) {
        setInterval(function () {
           io.sockets.emit("dir", {
                hor: horizontal,
                ver: vertical
            });
        })
    })


        setInterval(function() {
            if (vertical == -1 ) { // si se apreta ^
                motorLeft.on();
                motorRight.on();
            } else if (vertical == 0 ) { // si se apreta v
                motorLeft.off();
                motorRight.off();
            } else if (horizontal == -1 ) { // si se apreta <
                motorLeft.off();
                motorRight.on();
            } else if (horizontal == 1 ) { // si se apreta >
                motorLeft.on();
                motorRight.off();
            }
        })

});
