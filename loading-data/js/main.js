/*
 *    main.js
 *   in this file, I do my first
 *   steps in data loading files
 */

/* 
    # --> does a reference to an id
    from the DOM
*/

// with SELECT, the program find the id from the DOM
var svg = d3.select('#chart-area').append('svg')
    .attr('width', 400)
    .attr('height', 400);



d3.csv("data/ages.csv").then( (data) => {
    data.forEach( (d) => {
        d.age = +d.age;
    });
    // after formatting the data, send it to the circles
    var circles = svg.selectAll('circle')
    .data(data);

    
    circles.enter()
        .append('circle')
            .attr('cx', (h, i) => {return i*50 + 50;})
            .attr('cy', 50)
            .attr('r', (h) => {return h.age;})
            // change the color of the circle if is of value greater than 10
            .attr('fill', (h) => {if (h.age > 10) return 'red';else return 'blue'});
});

