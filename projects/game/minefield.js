// ============================================================================
// Minefield - by Steven Broderick
// ============================================================================

// board settings
var boardHeight = 5; var boardWidth = 5;
var mineChance = 5; // probability of mine is 1 / (mineChance - 1)

// mine-counter
var mineCount = 0;

// initialize board
var board = [];

// generate new board
function newBoard() {
  // loop to create rows
  for (var rowNo = 0; rowNo < boardHeight; rowNo++) {
    var rowOfCells = [];

    // loop to fill each column (index) of rows with Cell objects
    for (var colNo = 0; colNo < boardWidth; colNo++) {

      // assign cell mineStatus randomly based on mineChance setting
      newCell = {
        mineStatus: (((Math.floor(Math.random() * mineChance)) === 0) ? true : false),
      };

      if (newCell.mineStatus === false) {
        newCell.touching = 0;
      }
      else {
        mineCount += 1;
      }
      rowOfCells.push(newCell);
    }

    // push filled row to board
    board.push(rowOfCells);
  }

  // loop through rows and columns to determine neighboring mines touching safe cells
  for (rowNo = 0; rowNo < boardHeight; rowNo++) {
    for (colNo = 0; colNo < boardWidth; colNo++) {

      // if current cell is safe (not a mine)
      if (board[rowNo][colNo].mineStatus === false) {

        // if left cell is a mine, increment counter
        var lefcolNo = board[rowNo][colNo - 1];
        if (lefcolNo && lefcolNo.mineStatus === true) {
          board[rowNo][colNo].touching += 1;
        }

        // if right cell is a mine, increment counter
        var righcolNo = board[rowNo][colNo + 1];
        if (righcolNo && righcolNo.mineStatus === true) {
          board[rowNo][colNo].touching += 1;
        }

        // if not top row
        if (rowNo > 0) {

          // check cells above for mines
          var topCell = board[rowNo - 1][colNo];
          var topLefcolNo = board[rowNo - 1][colNo - 1];
          var topRighcolNo = board[rowNo - 1][colNo + 1];

          // increment cell value for each mine touching above
          if (topCell && topCell.mineStatus === true) {
            board[rowNo][colNo].touching += 1;
          }
          if (topLefcolNo && topLefcolNo.mineStatus === true) {
            board[rowNo][colNo].touching += 1;
          }
          if (topRighcolNo && topRighcolNo.mineStatus === true) {
            board[rowNo][colNo].touching += 1;
          }
        }

        // if not bottom row
        if (rowNo < boardHeight - 1) {

          // check cells below
          var bottomCell = board[rowNo + 1][colNo];
          var bottomLefcolNo = board[rowNo + 1][colNo - 1];
          var bottomRighcolNo = board[rowNo + 1][colNo + 1];

          // increment cell value for each mine touching below
          if (bottomCell && bottomCell.mineStatus === true) {
            board[rowNo][colNo].touching += 1;
          }
          if (bottomLefcolNo && bottomLefcolNo.mineStatus === true) {
            board[rowNo][colNo].touching += 1;
          }
          if (bottomRighcolNo && bottomRighcolNo.mineStatus === true) {
            board[rowNo][colNo].touching += 1;
          }
        }
      }
    }
  }

  return board;
}

// map JS board values to corresponding HTML table cells
function applyValues() {
  var table = document.getElementById("board");

  // loop through HTML table rows and columns
  for (var rowNo = 0; rowNo < boardHeight; rowNo++) {
    for (var colNo = 0; colNo < boardWidth; colNo++) {

      // reset any class changes from previous games
      table.rows[rowNo].cells[colNo].firstChild.className = "cell";

      // assign values from JS board to corresponding HTML table cells
      var currentBoardCell = board[rowNo][colNo];
      if (currentBoardCell.mineStatus === true) {
        table.rows[rowNo].cells[colNo].firstChild.innerHTML = "X";
      }
      else {
        table.rows[rowNo].cells[colNo].firstChild.innerHTML = currentBoardCell.touching;
      }
    }
  }
}

// applies onclick function to all button elements without explicit ID
function applyButtonBehavior() {

  // return true if solved, else false
  function checkSolved() {
    var solvedStatus = true;
    for (i = 0; i < buttons.length; i++) {
      if (buttons[i].className.indexOf("revealed") < 0 && buttons[i].innerHTML !== "X") {
        solvedStatus = false;
      }
    }
    return solvedStatus;
  }

  // show unfound tiles with special formatting
  function revealBoard() {
    for (i = 0; i < buttons.length; i++) {
      if (buttons[i].className.indexOf("revealed") < 0) {
        buttons[i].className += " unfound";
      }
    }
  }

  // get list of buttons
  var buttons = document.getElementsByClassName("cell");

  // loop through buttons and assign onclick function
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {

      // reveal tile on click via CSS class change
      this.className += " revealed";

      // victory if all safe tiles revealed
      if (this.innerHTML !== "X" && checkSolved()) alert("A WINNER IS YOU!");

      // game over if mine
      if (this.innerHTML === "X") {
        this.className += " mine";
        revealBoard();
        alert("You've met with a terrible fate :(");
      }

      // apply CSS color to safe tiles, depending on number revealed
      else {
        switch(this.innerHTML) {
          case "0":
            this.className += " zero";
            break;
          case "1":
            this.className += " one";
            break;
          case "2":
            this.className += " two";
            break;
          case "3":
            this.className += " three";
            break;
          case "4":
            this.className += " four";
            break;
          case "5":
            this.className += " five";
            break;
          case "6":
            this.className += " six";
            break;
          case "7":
            this.className += " seven";
            break;
          case "8":
            this.className += " eight";
            break;
        }
      }
    };

    // right-click mine-marking functionality
    buttons[i].oncontextmenu = function() {
      this.className += " marked";
      return false;
    };
  }
}

function setMineCounter() {
  var counter = document.getElementById("counter");
  counter.innerHTML = mineCount;
}

function resetBoard() {
  mineChance = getDifficulty();
  mineCount = 0;
  board = [];
  newBoard();
  setMineCounter();
  applyValues();
  applyButtonBehavior();
}

// check radio button inputs and return corresponding mine chance
function getDifficulty() {
  var radioButtons = document.getElementsByName("mine-chance");

  for (i = 0; i < 3; i++) {
    if (radioButtons[i].checked) {
      switch(i) {
        case 0:
          difficulty = 5;
          break;
        case 1:
          difficulty = 4;
          break;
        case 2:
          difficulty = 3;
          break;
      }
    }
  }

  return difficulty;
}

// reset button
function resetButtonBehavior() {
  document.getElementById("reset").onclick = function() {
    resetBoard();
  };
}

// assign board values to HTML table and click behavior to buttons on page load
window.onload = function() {
  newBoard();
  setMineCounter();
  applyValues();
  applyButtonBehavior();
  resetButtonBehavior();
};