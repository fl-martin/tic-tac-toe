const gameBoard = (()=> {
    const gameboardValues = ["","","","","","","","",""];
    const emptySpots = ()=>gameboardValues.filter((empty) => (empty === "")).length;
    const changeBoardValues = (position, mark)=> {
        if(gameboardValues[position] == "") {
            gameboardValues[position] = mark;
    }}
    const printBoard = ()=> {
        for (let i = 0; i < gameboardValues.length; i++) {
            document.getElementById(`${i}`).textContent = gameboardValues[i];
        }
    };
    const subArrays = ()=> [                                                           
        horizontalTop = [gameboardValues[0], gameboardValues[1], gameboardValues[2]],
        horizontalMid = [gameboardValues[3], gameboardValues[4], gameboardValues[5]],
        horizontalBottom = [gameboardValues[6], gameboardValues[7], gameboardValues[8]],
        verticalLeft = [gameboardValues[0], gameboardValues[3], gameboardValues[6]],
        verticalMid = [gameboardValues[1], gameboardValues[4], gameboardValues[7]],
        verticalRight = [gameboardValues[2], gameboardValues[5], gameboardValues[8]],
        diagonal1 = [gameboardValues[0], gameboardValues[4], gameboardValues[8]],
        diagonal2 = [gameboardValues[2], gameboardValues[4], gameboardValues[6]],
    ]
    const inRow3 = ()=> {                                    
        for (let i = 0; i < subArrays().length; i++) {
            if (subArrays()[i].every((item)=> item == "X")) return true; 
            else if (subArrays()[i].every((item)=> item == "O")) return true;
        }
    } 
    const resetValues = ()=> {
        gameboardValues.fill("", 0, 9);
        gameBoard.printBoard();
    }
    return {printBoard, emptySpots, changeBoardValues, inRow3, resetValues, subArrays}
})();

const player = (name)=> {
    const playerName = ()=> name;
    const drawX = (position)=> {
        gameBoard.changeBoardValues(position, "X");
        gameBoard.printBoard();
    };
    const drawO = (position)=> {
        gameBoard.changeBoardValues(position, "O");
        gameBoard.printBoard();
    };
    return {playerName, drawX, drawO}
};

const gameFlow = (()=> {
    const createPlayer = (name) => player(name);
    const players = [player1, player2];
    const playerReady = document.querySelectorAll('.readybutton').forEach(button => {
        button.addEventListener('click', (e)=> {
            if (e.target.parentNode.id == "player1") i = 0;
            else if (e.target.parentNode.id == "player2") i = 1;
            if (`${document.getElementById(`${e.target.parentNode.id}NameInput`).value}` !== "") {      //don't accept empty player names
                players[i] = createPlayer(`${document.getElementById(`${e.target.parentNode.id}NameInput`).value}`);
                displayControl.playerNames(players[i].playerName(), e.target.parentNode.id);
                displayControl.hideInputs(e.target.parentNode.id);
            }
            if ((players[0] != player1) && (players[1] != player2)) displayControl.showGameboard();
        });
    });
    const draw = document.querySelectorAll('.spot').forEach(spot=> spot.addEventListener('click', (e)=> {
        if(gameBoard.emptySpots() % 2 != 0) {
            players[0].drawX(e.target.id);
            checkWinner(players[0].playerName());
        }
        else if(gameBoard.emptySpots() % 2 == 0) {
            players[1].drawO(e.target.id);
            checkWinner(players[1].playerName());
        }   
    }));                                              
    const checkWinner = (player)=> {
        if (gameBoard.inRow3()) {
            displayControl.winner(player);
            players[0] = player1;
            players[1] = player2;
        }
        else if (gameBoard.emptySpots() == 0) {
            displayControl.tie();
            players[0] = player1;
            players[1] = player2;
        }
    };                                        
    return
})();

const displayControl = (()=> {
    const playerNames = (name, player) => {
        document.getElementById(`${player}NameDisplay`).textContent = name;
    };
    const hideInputs = (player)=> {
          removeFadeOut(document.getElementById(`${player}NameInput`), 1000)
          removeFadeOut(document.getElementById(`create${player}`), 1000)
    }
    const showInputs = ()=> {
        const nameinputs = document.querySelectorAll('.nameinput');
        const readyButtons = document.querySelectorAll('.readybutton');
        const namesDisplay = document.querySelectorAll('.namedisplay');
        for (let i = 0; i<2; i++) {
            showFadeIn(nameinputs[i], 1000);
            showFadeIn(readyButtons[i], 1000);
            namesDisplay[i].textContent = "";
        }
    };
    const showGameboard = ()=> {
        showFadeIn(document.getElementById('gameboard'), 800);
    }
    const winner = (player)=> {
        document.getElementById('winner').innerText = `${player} WINS!`;
        showFadeIn(document.getElementById('winnerAlert'), 2000);
    };
    const tie = ()=> {
        document.getElementById('winner').innerText = `It's a tie!`;
        showFadeIn(document.getElementById('winnerAlert'), 2000);
    }
    const restartButton = document.getElementById('restartbutton').addEventListener('click',()=> {
        displayControl.showInputs();
        removeFadeOut(document.getElementById('gameboard'), 1000);
        removeFadeOut(document.getElementById('winnerAlert'), 1000);
        gameBoard.resetValues();
    })
    const removeFadeOut = (el,speed) => {
        var seconds = speed/1000;
        el.style.transition = "opacity "+seconds+"s ease";
        el.style.opacity = 0;
        setTimeout(function() {
            el.style.visibility = 'hidden';
        }, speed);
    }
    const showFadeIn = (el,speed) => {
        var seconds = speed/1000;
        el.style.visibility = 'visible';
        el.style.transition = "opacity "+seconds+"s ease";
        el.style.opacity = 1;
    }
    return {playerNames, hideInputs, showGameboard, showInputs, winner, tie}
})();