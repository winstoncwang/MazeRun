const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter; //deconstruct the Matter object

//create engine

const engine = Engine.create();
const { world } = engine;

//create render property

const render = Render.create({
	element : document.body,
	engine  : engine,
	options : {
		width  : 800,
		height : 600
	}
});

//run the rendering
Render.run(render);
Runner.run(Runner.create(), engine); //alias for Matter.Runner.start

//Matter.Bodies.rectangle(x, y, width, height)
//Bodies object creates the shape while Body object applys the physical properties

//adding Walls
const walls = [
	Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
	Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
	Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
	Bodies.rectangle(800, 300, 40, 600, { isStatic: true })
];

//create mouseConstraints
World.add(world, MouseConstraint.create(engine, Mouse.create(render.canvas)));

//adding shape and world together
World.add(world, walls);
World.add(world, Bodies.rectangle(200, 200, 50, 50));
