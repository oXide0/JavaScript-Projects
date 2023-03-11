const SIZE  = 4;
const gameCase = document.querySelectorAll('.game__case');

const nextSymbol = function(a) {
    return String.fromCharCode(a.charCodeAt(0) + 1);
}

function updateScore(game, letter) {
    if(letter == 'B') {
        game.score += 4;
    }else if(letter == 'C') {
        game.score += 8;
    }else if(letter == 'D') {
        game.score += 16;
    }else if(letter == 'E') {
        game.score += 32;
    }else if(letter == 'F') {
        game.score += 64;
    }else if(letter == 'G') {
        game.score += 128;
    }else if(letter == 'H') {
        game.score += 256;
    }else if(letter == 'I') {
        game.score += 512;
    }else if(letter == 'J') {
        game.score += 1024;
    }
}

class gameClass {
    add_random_tile(game) {
        let row, col;
        do {
            row = Math.floor(Math.random() * SIZE);
            col = Math.floor(Math.random() * SIZE);
        }while(game.board[row][col] != ' ');

        if(Math.floor(Math.random() * SIZE) % 2 == 0) {
            game.board[row][col] = 'A';
        }else {
            game.board[row][col] = 'B';
        }
    }
    is_game_won(game) {
        for(let i = 0; i < SIZE; i++) {
            for(let j = 0; j < SIZE; j++) {
                if(game.board[i][j] == 'K') {
                    return true;
                }
            }
        }
        return false;
    }
    is_move_possible(game) {
        for(let i = 0; i < SIZE; i++) {
            for(let j = 0; j < SIZE; j++) {
                if(game.board[i][j] == ' ') {
                    return true;
                }
            
                if(j + 1 < SIZE && game.board[i][j] == game.board[i][j + 1]) {
                    return true;
                }
                if(i + 1 < SIZE && game.board[i][j] == game.board[i + 1][j]) {
                    return true;
                }

                return false;
            }
        }
    }
    update(game, dy, dx) {
        if((dy != 0 && dx != 0) || (dy == 0 && dx == 0)) {
            return false;
        }
        let hasChanged = false;

        // Direction UP
        if(dy == -1) {
            for(let k = 0; k < SIZE; k++) {
                for(let i = 0; i < SIZE; i++) {
                    for(let j = 0; j < SIZE; j++) {
                        if(game.board[i][j] == ' ' && i != 3 && game.board[i + 1][j] != ' ') {
                            game.board[i][j] = game.board[i + 1][j];
                            game.board[i + 1][j] = ' ';
                            hasChanged = true;
                        }
                    }
                }
            }

            for(let i = SIZE - 1; i >= 0; i--) {
                for(let j = SIZE - 1; j >= 0; j--) {
                    if(i != 3 && game.board[i][j] == game.board[i + 1][j] && game.board[i][j] != ' ') {
                        game.board[i][j] = nextSymbol(game.board[i + 1][j]);
                        updateScore(game, game.board[i][j]);
                        game.board[i + 1][j] = ' ';
                        hasChanged = true;
                    }
                }
            }

            for(let k = 0; k < SIZE; k++) {
                for(let i = 0; i < SIZE; i++) {
                    for(let j = 0; j < SIZE; j++) {
                        if(game.board[i][j] == ' ' && i != 3) {
                            game.board[i][j] = game.board[i + 1][j];
                            game.board[i + 1][j] = ' ';
                        }
                    }
                }
            }
        // Direction Down
        }else if(dy == 1) {
            for(let k = 0; k < SIZE; k++) {
                for(let i = 0; i < SIZE; i++) {
                    for(let j = 0; j < SIZE; j++) {
                        if(i != 3 && game.board[i + 1][j] == ' ' && game.board[i][j] != ' ') {
                            game.board[i + 1][j] = game.board[i][j];
                            game.board[i][j] = ' ';
                            hasChanged = true;
                        }
                    }
                }
            }

            for(let i = SIZE - 1; i >= 0; i--) {
                for(let j = SIZE - 1; j >= 0; j--) {
                    if(i != 3 && game.board[i + 1][j] == game.board[i][j] && game.board[i + 1][j] != ' ') {
                        game.board[i + 1][j] = nextSymbol(game.board[i][j]);
                        updateScore(game, game.board[i + 1][j]);
                        game.board[i][j] = ' ';
                        hasChanged = true;
                    }
                }
            }
            
            for(let k = 0; k < SIZE; k++) {
                for(let i = 0; i < SIZE; i++) {
                    for(let j = 0; j < SIZE; j++) {
                        if(i != 3 && game.board[i + 1][j] == ' ') {
                            game.board[i + 1][j] = game.board[i][j];
                            game.board[i][j] = ' ';
                        }
                    }
                }
            }
        // Direction Left
        }else if(dx == -1) {
            for(let k = 0; k < SIZE; k++) {
                for(let i = 0; i < SIZE; i++) {
                    for(let j = 0; j < SIZE; j++) {
                        if(game.board[i][j] == ' ' && j != 3 && game.board[i][j + 1] != ' ') {
                            game.board[i][j] = game.board[i][j + 1];
                            game.board[i][j + 1] = ' ';
                            hasChanged = true;
                        }
                    }
                }
            }

            for(let i = 0; i < SIZE; i++) {
                for(let j = 0; j < SIZE; j++) {
                    if(j != 3 && game.board[i][j] == game.board[i][j + 1] && game.board[i][j] != ' ') {
                        game.board[i][j] = nextSymbol(game.board[i][j + 1]);
                        updateScore(game, game.board[i][j]);
                        game.board[i][j + 1] = ' ';
                        hasChanged = true;
                    }
                }
            }
            
            for(let k = 0; k < SIZE; k++) {
                for(let i = 0; i < SIZE; i++) {
                    for(let j = 0; j < SIZE; j++) {
                        if(game.board[i][j] == ' ' && j != 3) {
                            game.board[i][j] = game.board[i][j + 1];
                            game.board[i][j + 1] = ' ';
                        }
                    }
                }
            }
        // Direction Right
        }else if(dx == 1) {
            for(let k = 0; k < SIZE; k++) {
                for(let i = 0; i < SIZE; i++) {
                    for(let j = 0; j < SIZE; j++) {
                        if(j != 3 && game.board[i][j + 1] == ' ' && game.board[i][j] != ' ') {
                            game.board[i][j + 1] = game.board[i][j];
                            game.board[i][j] = ' ';
                            hasChanged = true;
                        }
                    }
                }
            }
            for(let i = SIZE - 1; i >= 0; i--) {
                for(let j = SIZE - 1; j >= 0; j--) {
                    if(j != 3 && game.board[i][j + 1] == game.board[i][j] && game.board[i][j + 1] != ' ') {
                        game.board[i][j + 1] = nextSymbol(game.board[i][j]);
                        updateScore(game, game.board[i][j + 1]);
                        game.board[i][j] = ' ';
                        hasChanged = true;
                    }
                }
            }
            for(let k = 0; k < SIZE; k++) {
                for(let i = 0; i < SIZE; i++) {
                    for(let j = 0; j < SIZE; j++) {
                        if(j != 3 && game.board[i][j + 1] == ' ') {
                            game.board[i][j + 1] = game.board[i][j];
                            game.board[i][j] = ' ';
                        }
                    }
                }
            }
        }
        
        return hasChanged;
    }
    render() {
        let k = 0;
        for(let i = 0; i < SIZE; i++) {
            for(let j = 0; j < SIZE; j++) {
                gameCase[k].textContent = game.board[i][j];
                k++;
            }
        }
    }
}


const game = {
    board: [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
    ],
    score: 1234,
}

const check = new gameClass();


console.log('is_game_won: ', check.is_game_won(game));
console.log('is_move_possible: ', check.is_move_possible(game));

const result = check.update(game, 0, 1);
console.log('upadate: ', result);
console.log('score: ', game.score);

check.add_random_tile(game);



check.render();