/*
 *    main.js
 *   in this file, I do my first
 *   steps in d3 learning
 */

/* 
    # --> does a reference to an id
    from the DOM
*/

var values = [20, 30, 50, 90, 30];


var svg = d3.select("#chart-area").append("svg")
            .attr("width", 400)
            .attr("height", 400);

var rects = svg.selectAll("rect")
            .data(values);

rects.enter()
    .append("rect")
        .attr("x", (h, i) => {return i*50+50})
        .attr("y", (h) => {return 150 - h})
        .attr("width", 40)
        .attr("height", (h) => {return h;})
        .attr("fill", "blue");
        