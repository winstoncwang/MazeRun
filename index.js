const {
    Engine,
    Render,
    Runner,
    World,
    Bodies
} = Matter; //deconstruct the Matter object

//create engine

const engine = Engine.create();
const {
    world
} = engine;

const wallThickness = 20;
const width = 600;
const height = 600;

//create render property

const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: true,
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
        isStatic: true
    }), //top
    Bodies.rectangle(width / 2, height, width, wallThickness, {
        isStatic: true
    }), //bottom
    Bodies.rectangle(0, height / 2, wallThickness, height, {
        isStatic: true
    }), //left
    Bodies.rectangle(width, height / 2, wallThickness, height, {
        isStatic: true
    }) //right
];

//adding shape and world together
World.add(world, walls);

//maze generation

const grid = Array(3).fill(null).map(() => Array(3).fill(false));