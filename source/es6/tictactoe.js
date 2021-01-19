console.log("Gamecode loaded...");

const GB = document.querySelector('#GameBoard');
GB.addEventListener("click", updateGB);

const PLAYERS = ["X", "O"];

let currentPlayer = 0;

function updateGB(e) {
	let field = e.target;
	field.setAttribute('label', PLAYERS[currentPlayer]);
	field.innerText = PLAYERS[currentPlayer];
	field.setAttribute('disabled', 'disabled');
	currentPlayer = 1 - currentPlayer;
	checkForCompletion();
	checkForWinner();
}

function checkForCompletion() {
	let fields = GB.querySelectorAll('#GameBoard button');
	let complete = true;

	for (let f of fields) {
		if (!f.hasAttribute('disabled')) {
			complete = false;
		}
	}
	if (complete) {
		alert("Cats game!");
		location.reload();
	}
}

function checkForWinner() {
	let fields = GB.querySelectorAll('#GameBoard button');
	let winner = "";

	// check diagonal A1->C3
	if ( fields[0].innerText != "" &&
		 fields[0].innerText === fields[4].innerText &&
		 fields[0].innerText === fields[8].innerText ) {
		winner = fields[0].innerText;
	} 

	// check diagonal A3->C1
	if ( fields[2].innerText != "" &&
		 fields[2].innerText === fields[4].innerText &&
		 fields[2].innerText === fields[6].innerText ) {
		winner = fields[2].innerText;
	} 

	// check for horizontal
	for (let i = 0; i<3; i++) {
		if ( fields[3*i].innerText != "" &&
			 fields[3*i].innerText === fields[3*i + 1].innerText &&
			 fields[3*i].innerText === fields[3*i + 2].innerText ) 
		{
			winner = fields[3*i].innerText;
		} 
	} 

	// check for vertical
	for (let i = 0; i<3; i++) {
		if ( fields[i].innerText != "" &&
			 fields[i].innerText === fields[3 + i].innerText &&
			 fields[i].innerText === fields[6 + i].innerText ) 
		{
			winner = fields[i].innerText;
			console.log(winner);
		} 
	}

	if (winner != "" ) {
		alert(winner + " has won!");
		location.reload();
	}
}