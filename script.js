// data
let playerTurn = 1;
let boardArea = document.getElementById("gameboard");
let gameboard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
// function

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

function turn(gameboard, symbol, num) {
  let row = Math.floor((num - 1) / 3);
  let col = (num - 1) % 3;
  gameboard[row][col] = symbol;
  renderGame(gameboard);
  if (checkWinner(gameboard)) {
    endGame()
  }
}
// Array -> Boolean
// checks if there is a win in the gameboard
function checkWinner(gameboard) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      gameboard[i][0] !== "" &&
      gameboard[i][0] === gameboard[i][1] &&
      gameboard[i][1] === gameboard[i][2]
    ) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      gameboard[0][i] !== "" &&
      gameboard[0][i] === gameboard[1][i] &&
      gameboard[1][i] === gameboard[2][i]
    ) {
      return true;
    }
  }

  // Check first diagonal (from top-left to bottom-right)
  if (
    gameboard[0][0] !== "" &&
    gameboard[0][0] === gameboard[1][1] &&
    gameboard[1][1] === gameboard[2][2]
  ) {
    return true;
  }

  // Check second diagonal (from top-right to bottom-left)
  if (
    gameboard[0][2] !== "" &&
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

  const cells = document.querySelectorAll(".cell");

  // Add click event listener to each cell
  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      // Extract the number of the corresponding cell from the class name
      const cellNumber = parseInt(cell.classList[1].substring(4)); // Assuming the class name format is 'cell cellX'
      const cellContent = cell.textContent;

      if (cellContent === "" && !checkWinner(gameboard)) {
        if (playerTurn === 1) {
          turn(gameboard, "x", cellNumber);

          playerTurn = 2;
        } else if (playerTurn === 2) {
          turn(gameboard, "0", cellNumber);
          playerTurn = 1;
        }
      }

      
      // Log the cell number and its content
      console.log(playerTurn);
      console.log("Clicked cell:", cellNumber);
      console.log("Cell content:", cellContent);
      console.log(checkWinner(gameboard));
    });
  });
}
function endGame() {
  // Get the gameboard div
  const gameboardDiv = document.querySelector('div.gameboard');

  // Create a new div for the game over message
  const newDiv = document.createElement("div");
  newDiv.classList.add("gameOver");

  // Determine the winner and set the message
  const winner = playerTurn === 1 ? 'Player 1 (X)' : 'Player 2 (O)';
  newDiv.textContent = `${winner} won! Want to play again? `;

  // Create the "Play Again" button
  const playAgainButton = document.createElement("button");
  playAgainButton.textContent = "Play Again";

  // Add an event listener to reset the game when the button is clicked
  playAgainButton.addEventListener("click", function() {
      // Reset the game variables
      playerTurn = 1;
      gameboard = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""]
      ];

      newDiv.remove();


      renderGame(gameboard);
  });

  // Append the button to the new div
  newDiv.appendChild(playAgainButton);

  // Append the new div to the gameboard
  gameboardDiv.appendChild(newDiv);
  
}

renderGame(gameboard);
console.log("end");
