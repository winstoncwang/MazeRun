class mazeRunner {
	constructor (canvas, body, win, resetbutton) {
		//the Matter object
		this.Engine = Matter.Engine;
		this.Render = Matter.Render;
		this.Runner = Matter.Runner;
		this.World = Matter.World;
		this.Bodies = Matter.Bodies;
		this.Body = Matter.Body;
		this.Events = Matter.Events;
		//create engine
		this.engine = this.Engine.create();
		this.world = this.engine.world;
		//create runner
		this.runner = this.Runner.create();
		this.canvas = canvas;
		this.body = body;
		this.win = win;

		//listener
		resetbutton.addEventListener('click', this.resetMaze);
	}

	generateMaze = () => {
		this.world.gravity.y = 0;

		this.cellsHorizontal = 3;
		this.cellsVertical = 3;

		this.boundaryWallThickness = 3;
		this.wallThickness = 3;
		this.width = window.innerWidth - 3.5; //window size
		this.height = window.innerHeight - 3.5;

		this.horizontalWallLength = this.width / this.cellsHorizontal;
		this.verticalWallLength = this.height / this.cellsVertical;

		//create render property
		this.render = this.Render.create({
			element : this.body,
			engine  : this.engine,
			options : {
				wireframes : false,
				width      : this.width,
				height     : this.height
			}
		});

		//run the rendering
		this.Render.run(this.render);
		//run the runner
		this.Runner.run(this.runner, this.engine); //alias for Matter.Runner.start

		//Matter.Bodies.rectangle(x, y, width, height)
		//Bodies object creates the shape while Body object applys the physical properties

		//adding Walls
		this.walls = [
			this.Bodies.rectangle(
				this.width / 2,
				0,
				this.width,
				this.boundaryWallThickness,
				{
					isStatic : true
				}
			), //top
			this.Bodies.rectangle(
				this.width / 2,
				this.height,
				this.width,
				this.boundaryWallThickness,
				{
					isStatic : true
				}
			), //bottom
			this.Bodies.rectangle(
				0,
				this.height / 2,
				this.boundaryWallThickness,
				this.height,
				{
					isStatic : true
				}
			), //left
			this.Bodies.rectangle(
				this.width,
				this.height / 2,
				this.boundaryWallThickness,
				this.height,
				{
					isStatic : true
				}
			) //right
		];

		//adding shape and world together
		this.World.add(this.world, this.walls);

		//maze generation

		this.grid = Array(this.cellsVertical)
			.fill(null)
			.map(() => Array(this.cellsHorizontal).fill(false));

		this.vertical = Array(this.cellsVertical)
			.fill(null)
			.map(() => Array(this.cellsHorizontal - 1).fill(false));
		this.horizontal = Array(this.cellsHorizontal - 1)
			.fill(null)
			.map(() => Array(this.cellsHorizontal).fill(false));

		//generate starting point
		this.startRow = Math.floor(Math.random() * this.cellsVertical);
		this.startCol = Math.floor(Math.random() * this.cellsHorizontal);

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
			if (this.grid[row][col]) {
				return;
			}
			//if cell is visited, mark grid[row,col] value true
			this.grid[row][col] = true;
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
					nextRow >= this.cellsVertical ||
					nextCol < 0 ||
					nextCol >= this.cellsHorizontal
				) {
					continue;
				}

				//check if we have visited neighbour, if yes, check another neighbour
				if (this.grid[nextRow][nextCol]) {
					continue;
				}

				//remove horizontal/vertical wall
				//moving horizontal, changing vertical wall
				if (direction === 'left') {
					this.vertical[row][col - 1] = true;
				} else if (direction === 'right') {
					this.vertical[row][col] = true;
				} else if (direction === 'up') {
					this.horizontal[row - 1][col] = true;
				} else if (direction === 'down') {
					this.horizontal[row][col] = true;
				}

				//visit the next cell
				//console.log(nextRow, nextCol);
				stepRecursion(nextRow, nextCol);
			}
		};
		//console.log(startRow, startCol);
		stepRecursion(this.startRow, this.startCol);

		//drawing the walls
		//horizontal
		this.horizontal.forEach((row, rowIndex) => {
			row.forEach((wall, columnIndex) => {
				if (wall) {
					return;
				}

				this.horizontalWalls = this.Bodies.rectangle(
					columnIndex * this.horizontalWallLength +
						this.horizontalWallLength / 2,
					rowIndex * this.verticalWallLength +
						this.verticalWallLength,
					this.horizontalWallLength,
					this.wallThickness,
					{
						isStatic : true,
						label    : 'wall',
						render   : {
							fillStyle : 'lightblue'
						}
					}
				);

				this.World.add(this.world, this.horizontalWalls);
			});
		});
		//vertical
		this.vertical.forEach((row, rowIndex) => {
			row.forEach((wall, columnIndex) => {
				if (wall) {
					return;
				}

				this.verticalWalls = this.Bodies.rectangle(
					columnIndex * this.horizontalWallLength +
						this.horizontalWallLength,
					rowIndex * this.verticalWallLength +
						this.verticalWallLength / 2,
					this.wallThickness,
					this.verticalWallLength,
					{
						isStatic : true,
						label    : 'wall',
						render   : {
							fillStyle : 'lightblue'
						}
					}
				);

				this.World.add(this.world, this.verticalWalls);
			});
		});

		//creating goal zone
		this.goal = this.Bodies.rectangle(
			this.width - this.horizontalWallLength / 2,
			this.height - this.verticalWallLength / 2,
			this.horizontalWallLength * 0.65,
			this.verticalWallLength * 0.65,
			{
				isStatic : true,
				label    : 'goal',
				render   : {
					fillStyle : 'green'
				}
			}
		);

		this.World.add(this.world, this.goal);

		//creating ball
		if (this.horizontalWallLength > this.verticalWallLength) {
			this.radius = this.verticalWallLength / 3;
		} else {
			this.radius = this.horizontalWallLength / 3;
		}

		this.ball = this.Bodies.circle(
			this.horizontalWallLength / 2,
			this.verticalWallLength / 2,
			this.radius,
			{
				label  : 'ball',
				render : {
					fillStyle : 'gold'
				}
			}
		);

		this.World.add(this.world, this.ball);

		//Function that checks velocity
		const checkVelocity = (velX, velY) => {
			//console.log(velX, velY); //check speed does not exceed +/-20
			if (velX > 20 || velX < -20 || velY > 20 || velY < -20) {
				return false;
			}
			return true;
		};

		//tracking key press and move ball

		document.addEventListener('keydown', (event) => {
			const { x, y } = this.ball.velocity;
			//move up
			if (event.keyCode === 38 || event.keyCode === 87) {
				if (checkVelocity(x, y)) {
					this.Body.setVelocity(this.ball, { x, y: y - 4 });
				}
			}
			//move down
			if (event.keyCode === 40 || event.keyCode === 83) {
				if (checkVelocity(x, y)) {
					this.Body.setVelocity(this.ball, { x, y: y + 4 });
				}
			}
			//move left
			if (event.keyCode === 37 || event.keyCode === 65) {
				if (checkVelocity(x, y)) {
					this.Body.setVelocity(this.ball, { x: x - 4, y });
				}
			}
			//move right
			if (event.keyCode === 39 || event.keyCode === 68) {
				if (checkVelocity(x, y)) {
					this.Body.setVelocity(this.ball, { x: x + 4, y });
				}
			}
		});

		//win condition

		this.Events.on(this.engine, 'collisionStart', (events) => {
			const collisionObjectArr = [ 'ball', 'goal' ];
			events.pairs.forEach((collision) => {
				//console.log(collision);
				if (
					collisionObjectArr.includes(collision.bodyA.label) &&
					collisionObjectArr.includes(collision.bodyB.label)
				) {
					document.querySelector('.win').classList.remove('hidden');
					this.world.gravity.y = 1;
					console.log(this.render.canvas);
					this.world.bodies.forEach((ele) => {
						if (ele.label === 'wall') {
							this.Body.setStatic(ele, false);
						}
					});
				}
			});
		});
	};
}