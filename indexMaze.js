const canvas = document.querySelector('canvas');
const body = document.querySelector('body');
const win = document.querySelector('.win');
const resetButton = document.querySelector('.restart');

const mazeOne = new mazeRunner(canvas, body, win, resetButton);
mazeOne.generateMaze();
