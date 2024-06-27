/* Logic for the game: all possible ways to win on an array with 9 values:
n + 2 => n is a factor of 105 (3, 5, 7) && !1 - covers the right side slash /
n + 3 => all downwards squares
n + 4 => (squares 9, 5, 1 (9-4)), right to left side slash \
n + 1 =>  split array in 3 parts, 123, 456, 789, and look if all 3 match. */

// modular javascript - will fix when I get home and have time
const gameboard = {
    gameboard: [],
    
    //logic checks - easier to fix when something doesnt work
    n1: function(player1Fishka, player2Fishka){

    },
    n2: function(player1Fishka, player2Fishka){

    },
    n3: function(player1Fishka, player2Fishka){

    },
    n4: function(player1Fishka, player2Fishka){

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

        if (player1Fishka === "O") {
            player2Fishka = "X";
        } else {
            player2Fishka = "O";
        }
      
        const player1 = new Player(player1Name, player1Fishka, 0);
        const player2 = new Player(player2Name, player2Fishka, 0);

        closeModal();

        return {
            player1,
            player2
            }
        //Anything run after getPlayerValues is A-Okay to access player1 and 2's scores and methods
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
        gameboard.n1(player1.fishka, player2.fishka);
        gameboard.n2(player1.fishka, player2.fishka);
        gameboard.n3(player1.fishka, player2.fishka);
        gameboard.n4(player1.fishka, player2.fishka);
    }

})()