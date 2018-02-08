function Board() {
    this.field = []; 
    fillBoard.call(this); 
}

function fillBoard() {
    for(let i = 0; i < 9; i++) { 
        this.field.push({
            id: i,
            actual: -1
        });
    }
}

exports.Board = Board;