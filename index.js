const { Engine, Render, Runner, World, Bodies } = Matter; //deconstruct the Matter object

//create engine

const engine = Engine.create();
const { world } = engine;

const cells = 3;
const boundaryWallThickness = 3;
const wallThickness = 1;
const width = 600;
const height = 600;

const horizontalWallLength = width / cells;
const verticalWallLength = height / cells;

//create render property

const render = Render.create({
	element : document.body,
	engine  : engine,
	options : {
		wireframes : true,
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

const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));

const vertical = Array(cells)
	.fill(null)
	.map(() => Array(cells - 1).fill(false));
const horizontal = Array(cells - 1)
	.fill(null)
	.map(() => Array(cells).fill(false));

//generate starting point
const startRow = Math.floor(Math.random() * cells);
const startCol = Math.floor(Math.random() * cells);

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

	console.log('neighbours: ' + neighbours);

	for (let neighbour of neighbours) {
		const [ nextRow, nextCol, direction ] = neighbour;
		//see if neighbour picked is out-of-bound

		if (
			nextRow < 0 ||
			nextRow >= cells ||
			nextCol < 0 ||
			nextCol >= cells
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
		console.log(nextRow, nextCol);
		stepRecursion(nextRow, nextCol);
	}
};
console.log(startRow, startCol);
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
			{ isStatic: true }
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
			{ isStatic: true }
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
		isStatic : true
	}
);

World.add(world, goal);
