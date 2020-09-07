
let squares = document.getElementsByClassName("square");

const ticTacToeBoard = document.getElementsByClassName("container")[0];

const newGameButton = document.getElementById("new-game");

// add click event to each tic-tac-toe square
for (let i = 0; i < squares.length; i++) {
	squares[i].addEventListener("click", function () {
		if (squares[i].innerHTML === "") {
			squares[i].innerHTML = "&times;";
			squares[i].classList.remove("hover");
			checkForWinner ();
			computerPlayerMoves ();
			checkForWinner ();
		}
	});
}

// check for a winner
function checkForWinner () {

	// check rows for a winner
	for (let i = 0; i < 9; i += 3) {
		if (squares[i].innerHTML !== "" && squares[i].innerHTML === 
			squares[i + 1].innerHTML && squares[i + 1].innerHTML === squares[i + 2].innerHTML) {
			
			// style winning blocks
			squares[i].classList.add("style-winning-blocks");
			squares[i + 1].classList.add("style-winning-blocks");
			squares[i + 2].classList.add("style-winning-blocks");
			ifYouLose ();
			ticTacToeBoard.classList.add("disable-clicking");
			return;
		}
	}

	// check columns for a winner
	for (let i = 0; i < 3; i++) {
		if (squares[i].innerHTML !== "" && squares[i].innerHTML === 
			squares[i + 3].innerHTML && squares[i + 3].innerHTML === squares[i + 6].innerHTML) {
			
			// style winning blocks
			squares[i].classList.add("style-winning-blocks");
			squares[i + 3].classList.add("style-winning-blocks");
			squares[i + 6].classList.add("style-winning-blocks");
			ifYouLose ();
			ticTacToeBoard.classList.add("disable-clicking");
			return;
		}
	}

	// check diagonals for a winner
	if (squares[0].innerHTML !== "" && squares[0].innerHTML === squares[4].innerHTML && 
		squares[4].innerHTML === squares[8].innerHTML) {
		
		// style winning blocks
		squares[0].classList.add("style-winning-blocks");
		squares[4].classList.add("style-winning-blocks");
		squares[8].classList.add("style-winning-blocks");
		ifYouLose ();
		ticTacToeBoard.classList.add("disable-clicking");
		return;
	} 
	if (squares[2].innerHTML !== "" && squares[2].innerHTML === squares[4].innerHTML && 
		squares[4].innerHTML === squares[6].innerHTML) {
		
		// style winning blocks
		squares[2].classList.add("style-winning-blocks");
		squares[4].classList.add("style-winning-blocks");
		squares[6].classList.add("style-winning-blocks");
		ifYouLose ();
		ticTacToeBoard.classList.add("disable-clicking");
		return;
	}
}

// computer player takes turn
function computerPlayerMoves () {
	let winningBlock = document.getElementsByClassName("style-winning-blocks")[0];
	// if winner hasn't been declared
	if (winningBlock == null) {
		let computerChoice = Math.floor(Math.random() * 9) + 0;

		if (squares[computerChoice].innerHTML === "") {
			squares[computerChoice].innerHTML = "&#9675;";
			squares[computerChoice].classList.remove("hover");
		} else {
			computerPlayerMoves();
		}
	}
}

// if you lost the game
function ifYouLose () {
	let winningBlocks = document.getElementsByClassName("style-winning-blocks");
		for (let i = 0; i < winningBlocks.length; i++) {
			// if winning row is for the 'O' team make it red 
			if (winningBlocks[i].innerHTML === decodeHTMLEntities("&#9675;")) {
				winningBlocks[i].classList.add("red");
			}
		}
	ticTacToeBoard.classList.add("disable-clicking");
	return;
}

// decode circle HTML entity used in 'ifYouLose()' function
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
			squares[i].classList.remove("style-winning-blocks");
			squares[i].classList.remove("red");
			squares[i].classList.add("hover");
		}

		ticTacToeBoard.classList.remove("disable-clicking");
	});
}

newGame();
