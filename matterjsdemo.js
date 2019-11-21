const { Engine, Render, Runner, World, Bodies } = Matter; //deconstruct the Matter object

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

const shape = Bodies.rectangle(200, 200, 50, 50, {
	isStatic : true
});

//adding shape and world together
World.add(world, shape);
