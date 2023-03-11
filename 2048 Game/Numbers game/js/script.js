const SIZE  = 4;
const gameCase = document.querySelectorAll('.game__case');

const nextSymbol = function(a) {
    // return String.fromCharCode(a.charCodeAt(0) + 1);
    return (a * 2).toString();
}



function updateScore(game, letter) {
    if(letter == '4') {
        game.score += '4';
    }else if(letter == '8') {
        game.score += '8';
    }else if(letter == '16') {
        game.score += '16';
    }else if(letter == '32') {
        game.score += '32';
    }else if(letter == '64') {
        game.score += '64';
    }else if(letter == '128') {
        game.score += '128';
    }else if(letter == '256') {
        game.score += '256';
    }else if(letter == '512') {
        game.score += '512';
    }else if(letter == '1024') {
        game.score += '1024';
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
            game.board[row][col] = '2';
        }else {
            game.board[row][col] = '4';
        }
    }
    is_game_won(game) {
        for(let i = 0; i < SIZE; i++) {
            for(let j = 0; j < SIZE; j++) {
                if(game.board[i][j] == '2048') {
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
            }
        }
        return false;
    }
    update(game, dy, dx) {
        if(this.is_game_won(game)) {
            alert(`You won!, your score is ${game.score}`);
            return false;
        }
        if((dy != 0 && dx != 0) || (dy == 0 && dx == 0)) {
            return false;
        }
        if(this.is_move_possible(game) == false) {
            alert('You cannot move. You lose!');
            for(let i = 0; i < SIZE; i++) {
                for(let j = 0; j < SIZE; j++) {
                    game.board[i][j] = ' ';
                }
            }

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

        checkTile();

        for(let n = 0; n < gameCase.length; n++) {
            if(gameCase[n].textContent == '4') {
                gameCase[n].classList.add('four');
            }else if(gameCase[n].textContent == '8') {
                gameCase[n].classList.add('eight');
            }else if(gameCase[n].textContent == '16') {
                gameCase[n].classList.add('sixteen');
            }else if (gameCase[n].textContent == '32') {
                gameCase[n].classList.add('thirty_two');
            }else if (gameCase[n].textContent == '64') {
                gameCase[n].classList.add('sixty_four');
            }else if (gameCase[n].textContent == '128') {
                gameCase[n].classList.add('hundred_twenty_eight');
            }else if (gameCase[n].textContent == '256') {
                gameCase[n].classList.add('two_hundred_fifty_six');
            }else if (gameCase[n].textContent == '512') {
                gameCase[n].classList.add('five_hundred_twenteen');
            }else if (gameCase[n].textContent == '1024') {
                gameCase[n].classList.add('prev_last_number');
            }else if (gameCase[n].textContent == '2048') {
                gameCase[n].classList.add('last_number');
            }
        }        
    }
}

const checkTile = function() {
    for(let n = 0; n < gameCase.length; n++) {
        if(gameCase[n].classList.contains('four')) {
            gameCase[n].classList.remove('four');
        }else if(gameCase[n].classList.contains('eight')) {
            gameCase[n].classList.remove('eight');
        }else if(gameCase[n].classList.contains('sixteen')) {
            gameCase[n].classList.remove('sixteen');
        }else if (gameCase[n].classList.contains('thirty_two')) {
            gameCase[n].classList.remove('thirty_two');
        }else if (gameCase[n].classList.contains('sixty_four')) {
            gameCase[n].classList.remove('sixty_four');
        }else if (gameCase[n].classList.contains('hundred_twenty_eight')) {
            gameCase[n].classList.remove('hundred_twenty_eight');
        }else if (gameCase[n].classList.contains('two_hundred_fifty_six')) {
            gameCase[n].classList.remove('two_hundred_fifty_six');
        }else if (gameCase[n].classList.contains('five_hundred_twenteen')) {
            gameCase[n].classList.remove('five_hundred_twenteen');
        }else if (gameCase[n].classList.contains('prev_last_number')) {
            gameCase[n].classList.remove('prev_last_number');
        }else if (gameCase[n].classList.contains('last_number')) {
            gameCase[n].classList.remove('last_number');
        }
    }
}

const scanKey = function() {
    if(check.is_move_possible(game)) {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case "ArrowUp":
                    check.update(game, -1, 0);
                    check.add_random_tile(game);
                    check.render();
                    break;
                case "ArrowDown":
                    check.update(game, 1, 0);
                    check.add_random_tile(game);
                    check.render();
                    break;
                case "ArrowLeft":
                    check.update(game, 0, -1);
                    check.add_random_tile(game);
                    check.render();
                    break;
                case 'ArrowRight':
                    check.update(game, 0, 1);
                    check.add_random_tile(game);
                    check.render();
                    break;
                default:
                    break;
            }
        });
    }
}


const game = {
    board: [
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' '],
    ],
    score: 0,
}

const check = new gameClass();

scanKey();