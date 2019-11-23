# MazeRunner

This project focuses on creating a maze for user to play with using keyboard arrow keys, the maze is generated using algorithms, the physics will be generated using Matter.js, the end goal is to generate the maze pattern and move the round shape to the destination.

Challenges are:

Generating maze -----------------> Algorithms, data structure and recursion.

Drawing on the screen -----------> Matter.js to draw maze onto a canvas element

Keyboard control ----------------> Matter.js has the ability to map key presses

Detection of the destination ----> Matter.js has the ability to detect collision between two objects.


Matter JS:

World Object - Object containing all the shapes and physics involve. This is essentially the container of our shape.

Engine - This is the brain of the application, this retrieves the input and values of the shape and calculate the changes in position etc.

Runner - links the engine and world together, this determines the rate at which world and engine works with each other.

Render - used to draw out all the changes

Body - shapes and walls.


----------------------------------------------------------------
Version 0.11

     setup boilerplate
----------------------------------------------------------------
Matter.js demo

     working to make a demo