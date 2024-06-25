/* Logic for the game: all possible ways to win on an array with 9 values:
n + 2 => n is a factor of 105 (3, 5, 7) && !1 - covers the right side slash /
n + 3 => all downwards squares
n + 4 => (squares 9, 5, 1 (9-4)), right to left side slash \
n + 1 =>  split array in 3 parts, 123, 456, 789, and look if all 3 match.
*/

const gameboard = {
    gameboard: [],
    gameflow: (function(){

        function Player(player, fishka, score){
            this.player = player;
            this.fishka = fishka;
            this.score = score;
        }

        function getName(name) {
            player1Name = document.querySelector("#player1-name")
            player2Name = document.querySelector("#player2-name")
        }

    })(),
}