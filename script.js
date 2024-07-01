const gameboard = {
    gameboard: [],
    rounds: [],
    fishkas: [],
    players: [],
    currentFishka: 'x',

    outsourceLogic: function(){
        gameRules.n1();
        gameRules.n2();
        gameRules.n3();
        gameRules.n4();
    },
    markSquare: function(e){
        const targetElement = e.target;

        //duplicate prevention
        const targetElementClass = targetElement.getAttribute("class");

        if (targetElementClass === 'o' ||   targetElementClass === 'x') {
            //ignore user's input if occupied square
        } else {
            gameFlow.playRound();
            targetElement.setAttribute("class", gameboard.currentFishka);
            scoreboardControl.displayWhoPlays();

            let index = targetElement.getAttribute("title");
            gameboard.gameboard[index] = gameboard.currentFishka;

            //check if the player won
            gameboard.outsourceLogic();
        }
    },
};

/* Logic for the game: all possible ways to win on an array with 9 values:
n + 2 => (3, 5, 7) - covers the right side slash /
n + 3 => all downwards squares (i loop + 3)
n + 4 => (squares 9, 5, 1 (9-4)), right to left side slash (i loop + 4) \
n + 1 =>  split array in 3 parts, 123, 456, 789, and look if all 3 match. */
const gameRules = {
    n1: function(){
        var firstColumn = gameboard.gameboard.slice(0, 3);
        var secondColumn = gameboard.gameboard.slice(3, 6);
        var thirdColumn = gameboard.gameboard.slice(6, 9);

        this.victoryCondition(firstColumn);
        this.victoryCondition(secondColumn);
        this.victoryCondition(thirdColumn);
    },
    n2: function(){
        var column = [];
        let boardPart;

        for (let i = 2; i < 7; i += 2 ) {
            boardPart = gameboard.gameboard[i];
            column.push(boardPart);
        }

        this.victoryCondition(column)
    },
    n3: function(){
        var column = [];
        var column2 = [];
        var column3 = [];

        let boardPart;

        for (let i = 0; i < 9; i += 3) {
            boardPart = gameboard.gameboard[i];
            column.push(boardPart);
        }

        for (let j = 1; j < 9; j += 3) {
            boardPart = gameboard.gameboard[j];
            column2.push(boardPart);
        }

        for (let k = 2; k < 9; k += 3) {
            boardPart = gameboard.gameboard[k];
            column3.push(boardPart);
        }

        this.victoryCondition(column)
        this.victoryCondition(column2)
        this.victoryCondition(column3)

    },
    n4: function(){
        var column = [];
        let boardPart;

        for (let i = 0; i < 9; i += 4) {
            boardPart = gameboard.gameboard[i];
            column.push(boardPart);
        }
        this.victoryCondition(column)
    },

    victoryCondition: function(column){

        reducedColumn = column.reduce((accumulator, currentValue) => accumulator + currentValue);
        switch(reducedColumn){
            case 'xxx':
                gameFlow.declareWinner('x')
                if (gameboard.players[0].getFishka() === 'x'){
                    gameboard.players[0].awardScore();
                } else {
                    gameboard.players[1].awardScore();
                }
                break;

            case 'ooo':
                gameFlow.declareWinner('o')
                if (gameboard.players[0].getFishka() === 'o'){
                    gameboard.players[0].awardScore();
                } else {
                    gameboard.players[1].awardScore();
                }
                break;

            default:
                gameFlow.drawCheck();
        }
        },
};

const domManager = (function(){
    function renderListeners(){
        document.addEventListener("DOMContentLoaded", openModal);

        const submit = document.querySelector("#submit-choices");
        submit.addEventListener("click", getPlayerValues);
        submit.addEventListener("click", createBoard);
    }

    function createBoard() {
        let square;
        gameboard.gameboard.splice(0,9,null,null,null,null,null,null,null,null,null);

        for (let i = 0; i < 9; i++){
        square = document.createElement("div")
        square.setAttribute("title", `${i}`);
        square.setAttribute("class", "game-square");
        square.addEventListener("click", gameboard.markSquare);

        const keyDOM = document.querySelector(".tic-tac-toe-container");
        keyDOM.appendChild(square);
        }

        const buttonsContainer = document.querySelector(".buttons-container");
        buttons.createButtons(buttonsContainer);
        scoreboardControl.handleDom();
    }

    function getPlayerValues(){
        const player1Name = document.querySelector("#player1-name").value;
        const player2Name = document.querySelector("#player2-name").value;
        const player1Fishka = document.querySelector("#player1-fishka").value;
        let player2Fishka;

        if (player1Name === '' || player2Name === '') {
            var warning = document.querySelector("#warning-text");
            warning.textContent = "Please fill in all the necessary details before proceeding";
        } else {
            var warning = document.querySelector("#warning-text");
            warning.textContent = '';
            closeModal();
            if (player1Fishka == "o") {
                player2Fishka = "x";
            } else {
                player2Fishka = "o";
            }
            const player1 = createPlayer(player1Name, player1Fishka);
            const player2 = createPlayer(player2Name, player2Fishka);
            gameboard.players.push(player1, player2);
        }
    };

    function closeModal(){
        const modal = document.querySelector("dialog")
        modal.close();
    };

    function openModal(){
        const modal = document.querySelector("dialog")
        modal.showModal();
    }

    renderListeners();

    return {
        createBoard,
        openModal
    }
})();

function createPlayer(name, fishka){
    const playerName = name;
    var score = 0;

    const awardScore = () => score++;
    const getScore = () => score;
    const getFishka = () => fishka;
    const getPlayerName = () => playerName;

    return{
        awardScore,
        getScore,
        getFishka,
        getPlayerName
    }
}

const gameFlow = (function(){

    function playRound(){
        console.log(gameboard.rounds.length)
        if (gameboard.rounds.length === 9) {
            //return draw, pop-up to start over
        } else {
            //find out what turn it is
            const currentRound = gameboard.rounds.reduce((accumulator, item) => accumulator + item, 0);
            //find out who's turn it is
            if (currentRound % 2 === 0) {
                gameboard.currentFishka = gameboard.players[0].getFishka();
            } else {
                gameboard.currentFishka = gameboard.players[1].getFishka();;
            }
            gameboard.rounds.push(1);
            scoreboardControl.displayRound(gameboard.rounds.length)
        }
    }

    function drawCheck(){
        if (gameboard.rounds.length == '9'){
            endGame();
        } else {
            //continue
        }
    }

    function markWinner(nodeList){
        nodeList.forEach((item) => {
            item.setAttribute("id", 'winner')
        })
    }

    function declareWinner(fishka){
        let nodeList;
        const whoPlays = document.querySelector(".display-who-plays");
        endGame();
        switch(fishka){
            case 'x':
                nodeList = document.querySelectorAll(".x")
                markWinner(nodeList);
                whoPlays.textContent = 'x is the winner!!!'
                break;

            case 'o':
                nodeList = document.querySelectorAll(".o")
                markWinner(nodeList);
                whoPlays.textContent = 'O is the winner!!!'
                
                break;
            }
    }

    function endGame(){
        for (let i = 0; i < gameboard.gameboard.length; i++){
            let square = document.querySelector(`[title="${i}"]`);
            if (square) {
                square.removeEventListener('click',gameboard.markSquare)
            }
        }
    }

    return {
        playRound,
        drawCheck,
        declareWinner
    }
})();


//buttons

const buttons = (function(){

function createButtons(buttonsContainer){
    const resetButton = document.createElement('button');
    const restartButton = document.createElement('button');

    buttonsContainer.appendChild(resetButton);
    buttonsContainer.appendChild(restartButton);

    resetButton.textContent = "Reset"
    restartButton.textContent = "Restart"

    resetButton.setAttribute("class", "game-control")
    restartButton.setAttribute("class", "game-control")

    resetButton.setAttribute('id', "reset");
    restartButton.setAttribute("id", "restart");

    resetButton.addEventListener("click", reset);
    restartButton.addEventListener("click", restart);
}

function reset() {
    removeSquares();
    removeButtons();

    gameboard.rounds = [];
    domManager.createBoard();
    scoreboardControl.clearRoundTracking();
    scoreboardControl.displayRound(0);
}

function restart() {
    removeSquares();
    removeButtons();
    gameboard.fishkas = [];
    gameboard.rounds = [];
    gameboard.players = [];
    domManager.openModal();
    scoreboardControl.clearScoreboard();
}

function removeSquares() {
    for (let i = 0; i < gameboard.gameboard.length; i++){
        let square = document.querySelector(`[title="${i}"]`);
        square.remove();
    }
}

function removeButtons(){
    let resetButton = document.querySelector("#reset")
    let restartButton = document.querySelector("#restart")

    resetButton.remove();
    restartButton.remove();
}

return {
    createButtons,
}
})();


//scoreboard control
//noticed an issue whenever user doesn't enter the values, the board still gets created

const scoreboardControl = (function(){
    function handleDom(){
        const player1Name = document.querySelector(".player1-name");
        player1Name.textContent = `Player 1: ${gameboard.players[0].getPlayerName()}`;

        const player2Name = document.querySelector(".player2-name");
        player2Name.textContent = `Player 2: ${gameboard.players[1].getPlayerName()}`;

        const player1Score = document.querySelector(".player1-score");
        player1Score.textContent = `${gameboard.players[0].getPlayerName()}, your score is: ${gameboard.players[0].getScore()}`;

        const player2Score = document.querySelector(".player2-score");
        player2Score.textContent = `${gameboard.players[1].getPlayerName()}, your score is: ${gameboard.players[1].getScore()}`;

        const player1Fishka = document.querySelector(".player1-fishka");
        player1Fishka.textContent = `Player 1's character: ${gameboard.players[0].getFishka()}`;

        const player2Fishka = document.querySelector(".player2-fishka");
        player2Fishka.textContent = `Player 2's character: ${gameboard.players[1].getFishka()}`;
    };

    function displayWhoPlays(){
        const whoPlays = document.querySelector(".display-who-plays");
        let fishka;
        //everything works perfectly, including the score system but this for some reason, have to do the opposite for it to display correctly
        if (gameboard.currentFishka == 'x'){
            fishka = 'o'
            whoPlays.textContent = `It's ${fishka}'s turn`
        } else {
            fishka = 'x'
            whoPlays.textContent = `It's ${fishka}'s turn`
        }
    };

    function clearScoreboard(){
        const player1Name = document.querySelector(".player1-name");
        player1Name.textContent = '';

        const player2Name = document.querySelector(".player2-name");
        player2Name.textContent = '';

        const player1Score = document.querySelector(".player1-score");
        player1Score.textContent = '';

        const player2Score = document.querySelector(".player2-score");
        player2Score.textContent = '';

        const player1Fishka = document.querySelector(".player1-fishka");
        player1Fishka.textContent = '';

        const player2Fishka = document.querySelector(".player2-fishka");
        player2Fishka.textContent = '';

        const gamesPlayed = document.querySelector(".rounds-played");
        gamesPlayed.textContent = '';
    }

    function clearRoundTracking(){
        const whoPlays = document.querySelector(".display-who-plays");
        whoPlays.textContent = '';

    }
    function displayRound(round){
        const gamesPlayed = document.querySelector(".rounds-played");
        gamesPlayed.textContent = `Round ${round}.`;
    }

    return {
        handleDom,
        displayWhoPlays,
        displayRound,
        clearScoreboard,
        clearRoundTracking
    }
})();