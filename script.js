/* Logic for the game: all possible ways to win on an array with 9 values: 
n + 2 => n is a factor of 105 (3, 5, 7) && !1 - covers the right side slash /
n + 3 => all downwards squares 
n + 4 => (9-4-4), left to left side slash \
n + 1 =>  no good logic yet, (n % 3 === '0' && arr[i] === "o" || n % 3 === '0' && arr[i] === "x") - doesn't work reliably

const gameboard = {
    gameboard: [],
}