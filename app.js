var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

// var     

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    //console.log(socket.id);
    socket.on('name', function(name){
        //czy podłączono dwóch graczy, TODO zrobić im pokój
        if (Object.keys(io.sockets.sockets).length === 2) {
            let circlePlayer = Object.keys(io.sockets.sockets)[0];
            let crossPlayer = Object.keys(io.sockets.sockets)[1];
console.log('circle: ' + circlePlayer);
console.log('cross:' + crossPlayer);
            io.sockets.sockets[circlePlayer].emit('status', 'turn');
            io.sockets.sockets[crossPlayer].emit('status', 'wait');
            // Object.keys(io.sockets.sockets).forEach((item) => {
            //     console.log("general socket: Item:", item);
            //     io.sockets.sockets[item].emit('status', item);                
            // });                      
        }
        // console.log('length: ' + Object.keys(io.sockets.sockets).length);
        // console.log('new name: ' + name);
        // console.log('id: ' + socket.id);
        // Object.keys(io.sockets.sockets).forEach((item) => {
        //     console.log("general socket: Item:", item);
        // });
    });
});

http.listen(3000, function(){
    console.log('listening...');
})