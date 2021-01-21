/*
 *    main.js
 *   in this file, I do my first
 *   steps in d3 learning
 */

/* 
    # --> does a reference to an id
    from the DOM
*/

var svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", 480)
  .attr("height", 400);

var circleL = svg.append("circle")
    .attr("cx", 45)
    .attr("cy", 90)
    .attr("r", 30)
    .attr("fill", "blue");

var circleR = svg.append("circle")
    .attr("cx", 145)
    .attr("cy", 90)
    .attr("r", 30)
    .attr("fill", "blue");

var rectL = svg.append("rect")
    .attr("x", 20)
    .attr("y", 30)
    .attr("width", 50)
    .attr("height", 20)
    .attr("fill", "red");

var rectR = svg.append("rect")
    .attr("x", 120)
    .attr("y", 30)
    .attr("width", 50)
    .attr("height", 20)
    .attr("fill", "red");

var elipse = svg.append("ellipse")
    .attr("cx", 95)
    .attr("cy", 150)
    .attr("rx", 45)
    .attr("ry", 25);

var fullRect = svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 190)
    .attr("height", 200)
    .attr("stroke", "blue")
    .attr("stroke-width", 4)
    .attr("fill", "none");