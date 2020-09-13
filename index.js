
let squares = document.getElementsByClassName("square");
const ticTacToeBoard = document.getElementsByClassName("container")[0];
const newGameButton = document.getElementById("new-game");
let playerScore = 0;
let computerScore = 0;


// Add an 'X' into each square when clicked by the player
for (let i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function () {
		if (squares[i].innerHTML === "") {
			squares[i].innerHTML = "&times;";
			squares[i].classList.remove("hover");
			computerPlayerMoves ();
		}
	});
}

// Check for a winner each time a square is clicked
for (let i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", checkForWinner);
}

// check for a winner
function checkForWinner () {

	// check rows for a winner
	for (let i = 0; i < 9; i += 3) {
		if (squares[i].innerHTML !== "" && squares[i].innerHTML === 
			squares[i + 1].innerHTML && squares[i + 1].innerHTML === squares[i + 2].innerHTML) {
			
			// style winning blocks
			squares[i].classList.add("winning-blocks");
			squares[i + 1].classList.add("winning-blocks");
			squares[i + 2].classList.add("winning-blocks");
			identifyWinningTeam ();
			ticTacToeBoard.classList.add("disable-clicking");
			return;
		}
	}

	// check columns for a winner
	for (let i = 0; i < 3; i++) {
		if (squares[i].innerHTML !== "" && squares[i].innerHTML === 
			squares[i + 3].innerHTML && squares[i + 3].innerHTML === squares[i + 6].innerHTML) {
			
			// style winning blocks
			squares[i].classList.add("winning-blocks");
			squares[i + 3].classList.add("winning-blocks");
			squares[i + 6].classList.add("winning-blocks");
			identifyWinningTeam ();
			ticTacToeBoard.classList.add("disable-clicking");
			return;
		}
	}

	// check diagonals for a winner
	if (squares[0].innerHTML !== "" && squares[0].innerHTML === squares[4].innerHTML && 
		squares[4].innerHTML === squares[8].innerHTML) {
		
		// style winning blocks
		squares[0].classList.add("winning-blocks");
		squares[4].classList.add("winning-blocks");
		squares[8].classList.add("winning-blocks");
		identifyWinningTeam ();
		ticTacToeBoard.classList.add("disable-clicking");
		return;
	} 
	if (squares[2].innerHTML !== "" && squares[2].innerHTML === squares[4].innerHTML && 
		squares[4].innerHTML === squares[6].innerHTML) {
		
		// style winning blocks
		squares[2].classList.add("winning-blocks");
		squares[4].classList.add("winning-blocks");
		squares[6].classList.add("winning-blocks");
		identifyWinningTeam ();
		ticTacToeBoard.classList.add("disable-clicking");
		return;
	}
}

// computer player takes turn
function computerPlayerMoves () {
	// if board is not completely filled...
	if (!document.getElementsByClassName("disable-clicking")[0]) {
		// computer selects a random space...
		let computerChoice = Math.floor(Math.random() * 9) + 0;

		// if chosen space is available...
		if (squares[computerChoice].innerHTML === "") {
			squares[computerChoice].innerHTML = "&#9675;";
			squares[computerChoice].classList.remove("hover");
		} else {
			for (let i = 0; i < squares.length; i++) {
				// if any other squares are empty, run function again...
				if (squares[i].innerHTML === "") {
					computerPlayerMoves();
					break;
				}
			}
		}
	}
}

// identify which team won ('X' or 'O') and adjust scoring and block colors accordingly
function identifyWinningTeam () {
	let winningBlocks = document.getElementsByClassName("winning-blocks");
		for (let i = 0; i < winningBlocks.length; i++) {
			// if winning row is for the 'O' team make it red 
			if (winningBlocks[i].innerHTML === decodeHTMLEntities("&#9675;")) {
				winningBlocks[i].classList.add("red");
				// if all winning blocks are 'O' (red), add one point for '0'
				if (i === winningBlocks.length - 1) {
					computerScore++;
					document.getElementById("computer-score").innerHTML = computerScore;
				}
			} else if (winningBlocks[i].innerHTML === decodeHTMLEntities("&times;")) {
				winningBlocks[i].classList.add("green");
				//  if all winning blocks are 'X' (green), add one point for 'X'
				if (i === winningBlocks.length - 1) {
					playerScore++;
					document.getElementById("player-score").innerHTML = playerScore;
				}
			}
		}
	ticTacToeBoard.classList.add("disable-clicking");
	return;
}

// decode HTML entity ('X' and 'O' symbols) used in 'identifyWinningTeam()' function
function decodeHTMLEntities(text) {
	var textArea = document.createElement('textarea');
	textArea.innerHTML = text;
	return textArea.value;
}

// new game button function
function newGame () {
	newGameButton.addEventListener("click", function () {
		for (let i = 0; i < squares.length; i++) {
			squares[i].innerHTML = "";
			squares[i].classList.remove("winning-blocks");
			squares[i].classList.remove("red");
			squares[i].classList.remove("green");
			squares[i].classList.add("hover");
		}

		ticTacToeBoard.classList.remove("disable-clicking");
	});
}

newGame();
