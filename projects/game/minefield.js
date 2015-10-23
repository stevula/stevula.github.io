 // MINEFIELD

 // TODO:
 // convert to canvas
 // color digits differently based on number/mine
 // prevent first click from being a mine
 // show mines remaining
 // reset button
 // allow user to configure board
 // mark bombs with flags
 // hide 0's
 // uncover adjacent 0's
 // add image instead of "X"
 // better game over / victory message

// ============================================================================
// Initial Code
// ============================================================================

// initialize board
var board = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
  ];

function newBoard() {
  // randomize mine placement
  for (var rowIndex in board) {
    for (var cellIndex in board[rowIndex]) {
      var rand = Math.floor((Math.random() * 3));
      if (rand === 0) {
        board[rowIndex][cellIndex] = "X";
      }
    }
  }

  // detect adjacent mine quantities
  for (rowIndex in board) {
    for (cellIndex in board[rowIndex]) {
      cellIndex = Number(cellIndex);
      rowIndex = Number(rowIndex);

      // if current cellIndex is safe (not a mine)
      if (board[rowIndex][cellIndex] !== "X") {

        // check neighboring cells for mines
        var leftCell = board[rowIndex][cellIndex - 1];
        var rightCell = board[rowIndex][cellIndex + 1];

        if (leftCell === "X") {
          board[rowIndex][cellIndex] += 1;
        }
        if (rightCell === "X") {
          board[rowIndex][cellIndex] += 1;
        }

        // if not top row
        if (rowIndex > 0) {

          // check cells above for mines
          var topCell = board[rowIndex - 1][cellIndex];
          var topLeftCell = board[rowIndex - 1][cellIndex - 1];
          var topRightCell = board[rowIndex - 1][cellIndex + 1];

          if (topCell === "X") {
            board[rowIndex][cellIndex] += 1;
          }
          if (topLeftCell === "X") {
            board[rowIndex][cellIndex] += 1;
          }
          if (topRightCell === "X") {
            board[rowIndex][cellIndex] += 1;
          }
        }

        // if not bottom row
        if (rowIndex < 4) {

          // check cells below
          var bottomCell = board[rowIndex + 1][cellIndex];
          var bottomLeftCell = board[rowIndex + 1][cellIndex - 1];
          var bottomRightCell = board[rowIndex + 1][cellIndex + 1];

          if (bottomCell === "X") {
            board[rowIndex][cellIndex] += 1;
          }
          if (bottomLeftCell === "X") {
            board[rowIndex][cellIndex] += 1;
          }
          if (bottomRightCell === "X") {
            board[rowIndex][cellIndex] += 1;
          }
        }
      }
    }
  }
  console.log(board);
}

newBoard();

// wait until page loads
window.onload = function() {
  var table = document.getElementById("table");

  // loop through HTML table rows
  for (var tRow = 0; tRow <= 4; tRow++) {

    // loop through HTML cells/columns
    for (var tCell = 0; tCell <= 4; tCell++) {

      // assign values from JS board to corresponding HTML table cells
      var boardValueAtIndex = board[tRow][tCell];
      table.rows[tRow].cells[tCell].firstChild.innerHTML = boardValueAtIndex;
    }
  }

  // get list of buttons
  var buttons = document.getElementsByTagName("button");

  // loop through buttons and assign onclick property
  for (var i = 0; i < buttons.length; i++) {
    // reveal tile on click
    buttons[i].onclick = function() {
      this.className = "revealed";

      // game over if mine
      if (this.innerHTML === "X") {
        alert("Game over!");
      }

      // victory if all safe tiles revealed
      else {
        if (checkSolved()) {
          alert("Victory!");
        }
      }
    };
  }

  // returns true if solved, else false
  function checkSolved() {
    var solvedStatus = true;
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].className !== "revealed" && buttons[i].innerHTML !== "X") {
        solvedStatus = false;
      }
    }
    return solvedStatus;
  }
};
