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

Board.prototype.findById = function(id) {
    for(let field in this.field) {
        if (field.id = id) {
            return field.actual;
        }
    }
};

exports.Board = Board;