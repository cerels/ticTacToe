// data

// function

function ticTacToe() {
  //  The element can be empty "", contain an 'X', or contain an 'O'.
  let gameboard = [
    ["x", " ", " "],
    ["0", " ", " "],
    [" ", " ", " "],
  ];

  //  playerTurn  represents what player turn is. is either 1 for "x" or for "o". x goes firts
  let playerTurn = 1;

  while (!checkWinner(gameboard)) {
    if (playerTurn === 1) {
      turnConsole(gameboard, "x");
      playerTurn = 2;
    } else if (playerTurn === 2) {
      turnConsole(gameboard, "0");
      playerTurn = 1;
    }
    renderGame(gameboard)
  }
}

// array -> String
// display gameboard in terminal
function Gameboard(gameboard) {
  let display = "";
  gameboard.forEach((element) => {
    display += `|${element}|\n`;
  });
  return display;
}

// array String -> array
// input the gameboard and the player string ("x" or "o") and updates the gameboard with the player choice

function turnConsole(gameboard, symbol) {
  let num = prompt("pick th cell you want to put your mark in from 1 to 9 : ");

  if (num < 1 || num > 9) {
    throw new Error("Invalid number. Must be between 1 and 9.");
  }

  // Calculate row and column based on the given number
  let row = Math.floor((num - 1) / 3);
  let col = (num - 1) % 3;

  gameboard[row][col] = symbol;

  console.log(Gameboard(gameboard));
}
// Array -> Boolean
// checks if there is a win in the gameboard
function checkWinner(gameboard) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      gameboard[i][0] !== " " &&
      gameboard[i][0] === gameboard[i][1] &&
      gameboard[i][1] === gameboard[i][2]
    ) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      gameboard[0][i] !== " " &&
      gameboard[0][i] === gameboard[1][i] &&
      gameboard[1][i] === gameboard[2][i]
    ) {
      return true;
    }
  }

  // Check first diagonal (from top-left to bottom-right)
  if (
    gameboard[0][0] !== " " &&
    gameboard[0][0] === gameboard[1][1] &&
    gameboard[1][1] === gameboard[2][2]
  ) {
    return true;
  }

  // Check second diagonal (from top-right to bottom-left)
  if (
    gameboard[0][2] !== " " &&
    gameboard[0][2] === gameboard[1][1] &&
    gameboard[1][1] === gameboard[2][0]
  ) {
    return true;
  }

  // If no winner is found
  return false;
}

// array -> div
// function that inputs an array and renders the gameboard
function renderGame(gameboard) {
  let boardArea = document.getElementById("gameboard");
  // Clear the gameboard before rendering
  boardArea.innerHTML = "";
  let i = 1;
  for (const row of gameboard) {
    for (const cell of row) {
      // Create a new div for each cell
      let newDiv = document.createElement("div");
      const cellNum = `cell${i}`;
      newDiv.classList.add("cell", cellNum);
      newDiv.textContent = cell;
      // Append the new div to the gameboard
      boardArea.appendChild(newDiv);
      i += 1;
    }
  }
}

// ticTacToe()