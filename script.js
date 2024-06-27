/* Logic for the game: all possible ways to win on an array with 9 values:
n + 2 => (3, 5, 7) - covers the right side slash /
n + 3 => all downwards squares (i loop + 3)
n + 4 => (squares 9, 5, 1 (9-4)), right to left side slash (i loop + 4) \
n + 1 =>  split array in 3 parts, 123, 456, 789, and look if all 3 match. */

// modular javascript - will fix when I get home and have time
const gameboard = {
    gameboard: [],
    
    //logic checks - easier to fix when something doesnt work
    n1: function(){
        var firstColumn = this.gameboard.slice(0, 2);
        var secondColumn = this.gameboard.slice(3, 5);
        var thirdColumn = this.gameboard.slice(6, 8);

        this.victoryCondition(firstColumn);
        this.victoryCondition(secondColumn);
        this.victoryCondition(thirdColumn);
    },
    n2: function(){
        var column = [];
        let boardPart;

        for (let i = 2; i < 9; i + 2 ) {
            boardPart = this.gameboard.slice(i);
            column.push(boardPart);
        }

        this.victoryCondition(column)
    },
    n3: function(){
        var column = [];
        let boardPart;

        for (let i = 0; i < 9; i + 3) {
            boardPart = this.gameboard.slice(i);
            column.push(boardPart);
        }

        this.victoryCondition(column)
    },
    n4: function(){
        var column = [];
        let boardPart;

        for (let i = 0; i < 9; i + 4) {
            boardPart = this.gameboard.slice(i);
            column.push(boardPart);
        }

        this.victoryCondition(column)
    },
    victoryCondition: function(column){

    }
};


(function(){
    function renderListeners(){
        document.addEventListener("DOMContentLoaded", openModal);
        const submit = document.querySelector("#submit-choices");
        submit.addEventListener("click", getPlayerValues);

        submit.addEventListener("click", runGame);
    }

    renderListeners();

    function createBoard() {
        let square;
        gameboard.gameboard.splice(0,9,null,null,null,null,null,null,null,null,null);
        for (let i = 0; i < 9; i++){
        square = document.createElement("div")
        square.setAttribute("id", `${i}`);
        square.setAttribute("class", "game-square");
        square.addEventListener("click", markSquare);

        const keyDOM = document.querySelector(".tic-tac-toe-container");
        keyDOM.appendChild(square);
        }
    }

    function runGame(keyDOM){
        //separate function so I can re-use just the board
        createBoard(keyDOM);
        const turns = [];
        //Append max amount of turns, measure for the limit - if reached, GG.
        //Every once in a while call handleLogic()
        handleLogic();
    }

    function markSquare(e){
        const targetElement = e.target;
        //issue: need to know what player and fishka
    }

    function Player(player, fishka, score){
        this.player = player;
        this.fishka = fishka;
        this.score = score;
    }

    Player.prototype.increaseScore = function() {
        this.score += 1;
    }

    Player.prototype.resetScore = function() {
        this.score *= 0;
    }

    function getPlayerValues() {
        player1Name = document.querySelector("#player1-name").textContent;
        player2Name = document.querySelector("#player2-name").textContent;
        player1Fishka = document.querySelector("#player1-fishka").value;
        let player2Fishka;

        if (player1Name === '' || player2Name === '') {
            var warning = document.querySelector("#warning-text");
            warning.textContent = "Please fill in all the necessary details before proceeding";
        } else {
            warning.textContent = '';
            closeModal();
            
        if (player1Fishka === "O") {
            player2Fishka = "X";
        } else {
            player2Fishka = "O";
        }
      
        const player1 = new Player(player1Name, player1Fishka, 0);
        const player2 = new Player(player2Name, player2Fishka, 0);

            return {
                player1,
                player2
                }
            //Anything run after getPlayerValues is A-Okay to access player1 and 2's scores and methods
            }
    }
    
    function closeModal(){
        const modal = document.querySelector("dialog")
        modal.close();
    };

    function openModal(){
        const modal = document.querySelector("dialog")
        modal.showModal();
    }

    function handleLogic(){
        gameboard.n1();
        gameboard.n2();
        gameboard.n3();
        gameboard.n4();
    }

    return {
        handleLogic,
        player1,
        player2,
    }
})()