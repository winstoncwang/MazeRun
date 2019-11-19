const { Engine, Render, Runner, World, Bodies } = Matter; //deconstruct the Matter object

//create engine

const engine = Engine.create();
const { world } = engine;

const render = Render.create({
	element : document.body,
	engine  : engine,
	options : {
		width  : 800,
		height : 600
	}
});

Render.run(render);
Runner.Run(Runner.create(), engine);
