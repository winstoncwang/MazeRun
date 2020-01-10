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

---

Version 0.11

     setup boilerplate

---

Matter.js demo

     working to make a demo

---

Version 0.12

     reuse demo as boilerplate code for maze layout

---

Version 0.13

     grid array which tracks the cells which we've visited

---

Version 0.14

     vertical/horizontal array to track the wall between cells
---

Version 0.141

     extracting cell variable for future variation
---

Version 0.15

     picking starting cell location
---

Version 0.16

     establish stepping algorithm to form the maze
---

Version 0.17

     define neighouring cell location
---

Version 0.171

     shuffle neighbouring cells order
---

Version 0.172

     check if cell is visited and out-of-bound cell has been reached
---

Bug fix

     fixed a bug for when deconstructing the neighbour array was not working
---

Version 0.173

     change value of vertical array when making horizontal movement to the left/right
---

Version 0.174

     change value of horizontal array when making vertical movements to the top/bottom
---

Version 0.175

     boundary wall thickness update and adding new wall thickness for horizontal and vertical walls
---

Version 0.18

     drawing horizontal and vertical walls
---

Bug fix

     horizontal and vertical wall length not referred to cell number
---

Version 0.21

     adding the goal place for user
---

Version 0.22

     creating interactive ball at the starting point
---

Version 0.23

     add eventlistener for button press
---

Version 0.24

     movement update and velocity changes
---

Version 0.241

     remove gravity
---

Version 0.25

     add event win condition
---

Version 0.251

     improved win condition with nonstatic walls
---

Version 0.26

     responsive display of the canvas
---

Version 0.27

     maze with different vertical and horizontal cells
---

Version 0.271

     maze colouring