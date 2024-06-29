const gameboard = {
    gameboard: [],
    rounds: [],
    fishkas: [],
    players: [],
    currentFishka: 'X',

    outsourceLogic: function(){
        gameRules.n1();
        gameRules.n2();
        gameRules.n3();
        gameRules.n4();
    },
    markSquare: function(e){
        const targetElement = e.target;
        gameFlow.playRound();
        targetElement.setAttribute("class", gameboard.currentFishka);

        let index = targetElement.getAttribute("id");
        gameboard.gameboard[index] = gameboard.currentFishka;

        //check if the player won
        gameboard.outsourceLogic();
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
                if (gameboard.players[0].getFishka === 'X'){
                    gameboard.players[0].awardPlayer;
                } else {
                    gameboard.players[1].awardPlayer;
                }
                break;

            case 'OOO':
                if (gameboard.players[0].getFishka === 'O'){
                    gameboard.players[0].awardPlayer;
                } else {
                    gameboard.players[1].awardPlayer;
                }
                break;

            default:
                gameFlow.drawCheck();
        }
        },
};

(function(){
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
        square.setAttribute("id", `${i}`);
        square.setAttribute("class", "game-square");
        square.addEventListener("click", gameboard.markSquare);

        const keyDOM = document.querySelector(".tic-tac-toe-container");
        keyDOM.appendChild(square);
        }
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
            if (player1Fishka === "O") {
                player2Fishka = "X";
            } else {
                player2Fishka = "O";
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
        if (gameboard.rounds.length === 9) {
            //return draw, pop-up to start over
        } else {
            //find out what turn it is
            const currentRound = gameboard.rounds.reduce((accumulator, item) => accumulator + item, 0);
            //find out who's turn it is
            if (currentRound % 2 === 0) {
                gameboard.currentFishka = gameboard.players[0].getFishka()
            } else {
                gameboard.currentFishka = gameboard.players[1].getFishka();
            }
            gameboard.rounds.push(1);
        }
    }

    function awardPlayer(){
        //might be useless, if I can just use closures to add points
    }

    function drawCheck(){
        //check for draw
    }

    return {
        playRound,
        awardPlayer,
        drawCheck
    }
})();
