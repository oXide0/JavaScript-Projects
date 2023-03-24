const game = {
    board: [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' '],
    ],
}

const drawDiagonal = function(line, signCoord, lineDistance, direction) {
    if(signCoord == 'o') {
        line.style.background = '#DAEBF6';
    }else {
        line.style.background = '#FB1349';
    }
    if(direction == 'y') {
        line.style.top = `${lineDistance}px`;
    }else if(direction == 'x') {
        line.style.left = `${lineDistance}px`;
    }
    
    line.classList.remove('hidden');
}

const isGameWon = function() {
    const horizontalLine = document.querySelector('.horizontal_border');
    const verticalLine = document.querySelector('.vertical_border');
    const leftDiagonalLine = document.querySelector('.left_diagonal_border');
    const rightDiagonalLine = document.querySelector('.right_diagonal_border');
    if(game.board[0][0] != ' ' && game.board[0][0] == game.board[0][1] && game.board[0][0] == game.board[0][2]) {
        drawDiagonal(horizontalLine, game.board[0][0], 95, 'y');
        setTimeout(() => {
            alert('You win!');
        }, 100);
        return true;
    }else if(game.board[1][0] != ' ' && game.board[1][0] == game.board[1][1] && game.board[1][0] == game.board[1][2]){
        drawDiagonal(horizontalLine, game.board[1][0], 290, 'y');
        setTimeout(() => {
            alert('You win!');
        }, 100);
        return true;
    }else if(game.board[2][0] != ' ' && game.board[2][0] == game.board[2][1] && game.board[2][0] == game.board[2][2]){
        drawDiagonal(horizontalLine, game.board[2][0], 490, 'y');
        setTimeout(() => {
            alert('You win!');
        }, 100);
        return true;
    }else if(game.board[0][0] != ' ' && game.board[0][0] == game.board[1][0] && game.board[0][0] == game.board[2][0]){
        drawDiagonal(verticalLine, game.board[0][0], 95, 'x');
        setTimeout(() => {
            alert('You win!');
        }, 100);
        return true;
    }else if(game.board[0][1] != ' ' && game.board[0][1] == game.board[1][1] && game.board[0][1] == game.board[2][1]){
        drawDiagonal(verticalLine, game.board[0][1], 290, 'x');
        setTimeout(() => {
            alert('You win!');
        }, 100);
        return true;
    }else if(game.board[0][2] != ' ' && game.board[0][2] == game.board[1][2] && game.board[0][2] == game.board[2][2]){
        drawDiagonal(verticalLine, game.board[0][2], 490, 'x');
        setTimeout(() => {
            alert('You win!');
        }, 100);
        return true;
    }else if(game.board[0][0] != ' ' && game.board[0][0] == game.board[1][1] && game.board[0][0] == game.board[2][2]){
        drawDiagonal(leftDiagonalLine, game.board[0][0], 0, 'z');
        setTimeout(() => {
            alert('You win!');
        }, 100);
        return true;
    }else if(game.board[0][2] != ' ' && game.board[0][2] == game.board[1][1] && game.board[0][2] == game.board[2][0]){
        drawDiagonal(rightDiagonalLine, game.board[0][2], 0, 'z');
        setTimeout(() => {
            alert('You win!');
        }, 100);
        return true;
    }
    return false;
}

const isDraw = function() {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(game.board[i][j] == ' ') {
                return false;
            }
        }
    }
    setTimeout(() => {
        alert('Draw');
    }, 100);
    return true;
}



const update = function() {
    let step = false;
    let occupiedPosition = [];
    const boardCases = document.querySelectorAll('.board__case');
    for(let i = 0; i < boardCases.length; i++) {
        boardCases[i].addEventListener('click', () => {
            if(step == false && occupiedPosition.includes(i) == false) {
                if(i < 3) {
                    game.board[0][i] = 'o';
                }else if(i >=3 && i < 6){
                    game.board[1][i - 3] = 'o';
                }else {
                    game.board[2][i - 6] = 'o';
                }
                
                const div = document.createElement('div');
                div.classList.add('round');
                boardCases[i].appendChild(div);
                occupiedPosition.push(i);
                step = true;
            }else if(step == true && occupiedPosition.includes(i) == false){
                if(i < 3) {
                    game.board[0][i] = 'x';
                }else if(i >=3 && i < 6){
                    game.board[1][i - 3] = 'x';
                }else {
                    game.board[2][i - 6] = 'x';
                }
                
                boardCases[i].insertAdjacentHTML('afterbegin', '<svg class="dagger" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/> <path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/> </svg>');
                occupiedPosition.push(i);
                step = false;
            }
            if(isGameWon() || isDraw()) {
                const array = [
                    document.querySelector('.horizontal_border'),
                    document.querySelector('.vertical_border'),
                    document.querySelector('.left_diagonal_border'),
                    document.querySelector('.right_diagonal_border')
                ];
                game.board = [
                    [' ', ' ', ' '],
                    [' ', ' ', ' '],
                    [' ', ' ', ' '],
                ];
                setTimeout(() => {
                    for(let j = 0; j < boardCases.length; j++) {
                        boardCases[j].textContent = '';
                    }
                    for(let j = 0; j < array.length; j++) {
                        if(array[j].classList.contains('hidden') == false) {
                            array[j].classList.add('hidden');
                        }
                    }
                }, 100);
                step = false;
                occupiedPosition = [];
                return;
            }
        });
    }
}

update();