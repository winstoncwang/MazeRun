const { Engine, Render, Runner, World, Bodies } = Matter; //deconstruct the Matter object

//create engine

const engine = Engine.create();
const { world } = engine;

const cells = 3;
const wallThickness = 20;
const width = 600;
const height = 600;

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
	Bodies.rectangle(width / 2, 0, width, wallThickness, {
		isStatic : true
	}), //top
	Bodies.rectangle(width / 2, height, width, wallThickness, {
		isStatic : true
	}), //bottom
	Bodies.rectangle(0, height / 2, wallThickness, height, {
		isStatic : true
	}), //left
	Bodies.rectangle(width, height / 2, wallThickness, height, {
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
		//[ row - 1, col, 'up' ],
		[ row, col + 1, 'right' ],
		//[ row + 1, col, 'down' ],
		[ row, col - 1, 'left' ]
	]);

	//console.log(neighbours);

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
	}

	//visit the next cell
};

//stepRecursion(startRow, startCol);
stepRecursion(1, 1);
