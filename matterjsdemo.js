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

Render.run(render);
Runner.Run(Runner.create(), engine); //alias for Matter.Runner.start

const shape = Bodies.rectangle(200, 200, 50, 50, {}); //Matter.Bodies.rectangle(x, y, width, height
//Bodies object creates the shape while Body object applys the physical properties
