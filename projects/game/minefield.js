 // Design Basic Game Solo Challenge

// This is a solo challenge

// Your mission description:
// Overall mission: uncover all the tiles without hitting a mine.
// Goals: identify safe tiles to click.
// Characters: the player.
// Objects: tiles (mine tiles and safe tiles). Possibly flags after MVP.
// Functions:
//    newBoard => randomize tiles
//    clickCell => uncovers the tile
//    mine => game over
//    safe => display number of mines touching
//    solved => check if board solved (victory)
//    settings (optional function) => configure size of board and # of mines
//    flag (optional function) => mark tile with flag (suspected mine)

// Pseudocode
//  CREATE HTML/CSS table with 5 rows and 5 columns, invisible text.

//  DECLARE function newBoard
//    FOR EACH cell in table
//      ASSIGN variable isMine to undefined
//      GENERATE random number between 0 - 4.
//      IF 0
//        SET isMine to true
//      ELSE
//        SET isMine to false
//        ASSIGN variable minesTouching equal to 0
//    FOR EACH cell in table
//      IF isMine is equal to true
//        FOR EACH cell touching (adjacent or diagonal)
//          INCREMENT minesTouching by 1


//  DECLARE function clickCell
//    FOR cell
//      SET text to visible
//      IF isMine is true
//        PRINT "You died. Game over."


//  DECLARE function solved
//    SET variable solved equal to true
//    FOR EACH cell in table
//      IF text is invisible AND isMine is false
//         SET solved equal to false
//    RETURN solved

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

// Refactored Code





// ============================================================================
// Reflection
// ============================================================================
// What was the most difficult part of this challenge?
//    There were a lot of difficult problems that I had to tackle, but the most
//    difficult was figuring out how to connect my JS array to the table in the
//    DOM. It was very difficult to refer to specific elements in the HTML
//    without giving them each an ID, which I didn't want to do since there
//    are 25 cells by default and I wanted to make it easy to resize.

// What did you learn about creating objects and functions that interact with one another?
//    Everything, including HTML elements and the page and the window, are JS
//    objects.

// Did you learn about any new built-in methods you could use in your refactored solution? If so, what were they and how do they work?
//

// How can you access and manipulate properties of objects?
//    With dot notation or bracket notation.