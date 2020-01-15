const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter; //deconstruct the Matter object

//create engine

const engine = Engine.create();
const { world } = engine;
world.gravity.y = 0;

const cellsHorizontal = 10;
const cellsVertical = 8;

const boundaryWallThickness = 3;
const wallThickness = 3;
const width = window.innerWidth - 3.5; //window size
const height = window.innerHeight - 3.5;

const horizontalWallLength = width / cellsHorizontal;
const verticalWallLength = height / cellsVertical;

//create render property

const render = Render.create({
	element : document.body,
	engine  : engine,
	options : {
		wireframes : false,
		width,
		height
	}
});

//run the rendering
Render.run(render);
Runner.run(Runner.create(), engine); //alias for Matter.Runner.start

//Matter.Bodies.rectangle(x, y, width, height)
//Bodies object creates the shape while Body object applys the physical properties

//adding Walls
const walls = [
	Bodies.rectangle(width / 2, 0, width, boundaryWallThickness, {
		isStatic : true
	}), //top
	Bodies.rectangle(width / 2, height, width, boundaryWallThickness, {
		isStatic : true
	}), //bottom
	Bodies.rectangle(0, height / 2, boundaryWallThickness, height, {
		isStatic : true
	}), //left
	Bodies.rectangle(width, height / 2, boundaryWallThickness, height, {
		isStatic : true
	}) //right
];

//adding shape and world together
World.add(world, walls);

//maze generation

const grid = Array(cellsVertical)
	.fill(null)
	.map(() => Array(cellsHorizontal).fill(false));

const vertical = Array(cellsVertical)
	.fill(null)
	.map(() => Array(cellsHorizontal - 1).fill(false));
const horizontal = Array(cellsHorizontal - 1)
	.fill(null)
	.map(() => Array(cellsHorizontal).fill(false));

//generate starting point
const startRow = Math.floor(Math.random() * cellsVertical);
const startCol = Math.floor(Math.random() * cellsHorizontal);

//shuffle function
const shuffle = (arr) => {
	let count = arr.length;

	while (count > 0) {
		count--;
		const rndIndex = Math.floor(Math.random() * arr.length);
		const temp = arr[count];
		arr[count] = arr[rndIndex];
		arr[rndIndex] = temp;
	}

	return arr;
};

const stepRecursion = (row, col) => {
	//if visited cell at [row, col], return
	if (grid[row][col]) {
		return;
	}
	//if cell is visited, mark grid[row,col] value true
	grid[row][col] = true;
	//locate the neighbouring cells top right bottom left
	// next add shuffle function
	const neighbours = shuffle([
		[ row - 1, col, 'up' ],
		[ row, col + 1, 'right' ],
		[ row + 1, col, 'down' ],
		[ row, col - 1, 'left' ]
	]);

	//console.log('neighbours: ' + neighbours);

	for (let neighbour of neighbours) {
		const [ nextRow, nextCol, direction ] = neighbour;
		//see if neighbour picked is out-of-bound

		if (
			nextRow < 0 ||
			nextRow >= cellsVertical ||
			nextCol < 0 ||
			nextCol >= cellsHorizontal
		) {
			continue;
		}

		//check if we have visited neighbour, if yes, check another neighbour
		if (grid[nextRow][nextCol]) {
			continue;
		}

		//remove horizontal/vertical wall
		//moving horizontal, changing vertical wall
		if (direction === 'left') {
			vertical[row][col - 1] = true;
		} else if (direction === 'right') {
			vertical[row][col] = true;
		} else if (direction === 'up') {
			horizontal[row - 1][col] = true;
		} else if (direction === 'down') {
			horizontal[row][col] = true;
		}

		//visit the next cell
		//console.log(nextRow, nextCol);
		stepRecursion(nextRow, nextCol);
	}
};
//console.log(startRow, startCol);
stepRecursion(startRow, startCol);

//drawing the walls
//horizontal
horizontal.forEach((row, rowIndex) => {
	row.forEach((wall, columnIndex) => {
		if (wall) {
			return;
		}

		const horizontalWalls = Bodies.rectangle(
			columnIndex * horizontalWallLength + horizontalWallLength / 2,
			rowIndex * verticalWallLength + verticalWallLength,
			horizontalWallLength,
			wallThickness,
			{
				isStatic : true,
				label    : 'wall',
				render   : {
					fillStyle : 'lightblue'
				}
			}
		);

		World.add(world, horizontalWalls);
	});
});
//vertical
vertical.forEach((row, rowIndex) => {
	row.forEach((wall, columnIndex) => {
		if (wall) {
			return;
		}

		const verticalWalls = Bodies.rectangle(
			columnIndex * horizontalWallLength + horizontalWallLength,
			rowIndex * verticalWallLength + verticalWallLength / 2,
			wallThickness,
			verticalWallLength,
			{
				isStatic : true,
				label    : 'wall',
				render   : {
					fillStyle : 'lightblue'
				}
			}
		);

		World.add(world, verticalWalls);
	});
});

//creating goal zone
const goal = Bodies.rectangle(
	width - horizontalWallLength / 2,
	height - verticalWallLength / 2,
	horizontalWallLength * 0.65,
	verticalWallLength * 0.65,
	{
		isStatic : true,
		label    : 'goal',
		render   : {
			fillStyle : 'green'
		}
	}
);

World.add(world, goal);

//creating ball
let radius;
if (horizontalWallLength > verticalWallLength) {
	radius = verticalWallLength / 3;
} else {
	radius = horizontalWallLength / 3;
}

const ball = Bodies.circle(
	horizontalWallLength / 2,
	verticalWallLength / 2,
	radius,
	{
		label  : 'ball',
		render : {
			fillStyle : 'gold'
		}
	}
);

World.add(world, ball);

//tracking key press and move ball

document.addEventListener('keydown', (event) => {
	const { x, y } = ball.velocity;
	//move up
	if (event.keyCode === 38 || event.keyCode === 87) {
		Body.setVelocity(ball, { x, y: y - 4 });
	}
	//move down
	if (event.keyCode === 40 || event.keyCode === 83) {
		Body.setVelocity(ball, { x, y: y + 4 });
	}
	//move left
	if (event.keyCode === 37 || event.keyCode === 65) {
		Body.setVelocity(ball, { x: x - 4, y });
	}
	//move right
	if (event.keyCode === 39 || event.keyCode === 68) {
		Body.setVelocity(ball, { x: x + 4, y });
	}
});

//win condition

Events.on(engine, 'collisionStart', (events) => {
	const collisionObjectArr = [ 'ball', 'goal' ];
	events.pairs.forEach((collision) => {
		if (
			collisionObjectArr.includes(collision.bodyA.label) &&
			collisionObjectArr.includes(collision.bodyB.label)
		) {
			document.querySelector('.win').classList.remove('hidden');
			world.gravity.y = 1;
			world.bodies.forEach((ele) => {
				if (ele.label === 'wall') {
					Body.setStatic(ele, false);
				}
			});
		}
	});
});
