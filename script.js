/* Logic for the game: all possible ways to win on an array with 9 values:
n + 2 => n is a factor of 105 (3, 5, 7) && !1 - covers the right side slash /
n + 3 => all downwards squares
n + 4 => (squares 9, 5, 1 (9-4)), right to left side slash \
n + 1 =>  split array in 3 parts, 123, 456, 789, and look if all 3 match.
*/


// modular javascript - will fix when I get home and have time

(function(){
    const gameboard = [];

    function renderListeners(){
        window.addEventListener("DOMContentLoaded", () => {
            const modal = document.querySelector("dialog")
            modal.showModal;
        })

        const submit = document.querySelector("#submit-choices");
        submit.addEventListener("click", getPlayerValues);

        const newGame = document.querySelector("#new-game");
        const keyDOM = document.querySelector(".tic-tac-toe-container");
        newGame.addEventListener("click", runGame(keyDOM));
    }

    renderListeners();

    function createBoard(keyDOM) {
        let square;
        for (let i = 0; i < 10; i++){
        square = document.createElement("div").setAttribute("id", `${i}`);
        square.setAttribute("class", "game-square");
        square.addEventListener("click", markSquare);
        keyDOM.appendChild("square");
        }
    }

    function runGame(keyDOM){
        //separate function so I can re-use just the board
        createBoard(keyDOM);
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
        submit.preventDefault //no access to anything that can run this (( I hope submit is within the scope
        player1Name = document.querySelector("#player1-name").textContent;
        player2Name = document.querySelector("#player2-name").textContent;
        player1Fishka = document.querySelector("#player1-fishka").value;
        player2Fishka;

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
    }

})()