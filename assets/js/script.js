"use strict";

let TURN = "x";
let END = false;

const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];

document.addEventListener("DOMContentLoaded", init);

function init(){
	document.addEventListener("click", checkSign);
	document.addEventListener("click", restartGame);
}

function checkSign(e){
	if (e.target.innerHTML != "" || END) return;
	if (TURN === "x") {
		checkWinnerDisplaySign(e);
		TURN = "o";
	} else {
		checkWinnerDisplaySign(e);
		TURN = "x";
	}
	showTurn();
}

function showTurn(){
	const p = document.querySelector("p");
	p.innerHTML = "";
	if (END) return;
	p.insertAdjacentHTML("beforeend", `${TURN}'s turn`);
}

function checkWinnerDisplaySign(e){
	e.target.closest(".cell").innerHTML = TURN;
	checkDraw();
	if (!thereIsAWinner()) return;
	displayOutcome(`${TURN} Wins`);
}

function thereIsAWinner(){
	const cells = document.querySelectorAll(".cell");

	return WINNING_COMBINATIONS.some(combination => {
		return combination.every(index => {
			return cells[index].innerHTML === TURN;
		});
	});
}

function restartGame(e){
	if (!e.target.closest("#restartBtn")) return;
	location.reload();
}

function checkDraw(){
	const cells = document.querySelectorAll(".cell");
	let amount = 0;

	cells.forEach(cell => {
		if (cell.innerHTML !== "") amount++;
	});

	if (amount !== 9) return;
	displayOutcome("It is a draw");
}

function displayOutcome(text){
	const outcome = document.querySelector("#outcome");
	outcome.innerHTML = "";
	let html = `<div>${text}</div>
				<button id="restartBtn"> Restart </button>`;
	outcome.insertAdjacentHTML("beforeend", html);
	END = true;
}
