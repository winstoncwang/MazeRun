const body = document.querySelector('body');
const win = document.querySelector('.win');
const option = document.querySelector('.options');
const backMenu = document.querySelector('.backmenu');

const resetButton = document.querySelector('.restart');
const startButton = document.querySelector('.start');
const beginnerButton = document.querySelector('.beginner');
const basicButton = document.querySelector('.basic');
const intermediateButton = document.querySelector('.intermediate');
const advancedButton = document.querySelector('.advanced');
const expertButton = document.querySelector('.expert');
const backButton = document.querySelector('.back');

const mazeOne = new mazeRunner(
	body,
	win,
	option,
	resetButton,
	startButton,
	beginnerButton,
	basicButton,
	intermediateButton,
	advancedButton,
	expertButton,
	backButton,
	backMenu
);
