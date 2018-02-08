var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

var Players = require('./Players').Players;
var Board = require('./Board').Board;

var players;
var board = new Board();

function checkWinCondition() {

};

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
    //console.log(socket.id);
    socket.on('name', function(name){
        //czy podłączono dwóch graczy, TODO zrobić im pokój
        if (Object.keys(io.sockets.sockets).length === 2) {
            players = new Players(Object.keys(io.sockets.sockets));
            io.sockets.sockets[players.getActivePlayer()].emit('message',  {status: 'turn', board: board});
            io.sockets.sockets[players.getUnactivePlayer()].emit('message', {status: 'wait'});                   
        }
    });
    socket.on('turn', function(move){
        if ((move>=0) && (move<9)){
            if (board.field[move] === -1){
                board.field[move].actual = players.activePlayer;
                console.log(board);

                checkWinCondition();

                players.changePlayer();

                io.sockets.sockets[players.getActivePlayer()].emit('message',  {status: 'turn', board: board});
                io.sockets.sockets[players.getUnactivePlayer()].emit('message', {status: 'wait'});
            } else {
                console.log('You can\'t make the same move again');
            }
        }
    });
});

http.listen(3000, function(){
    console.log('listening...');
})