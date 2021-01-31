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
    .attr('width', 900)
    .attr('height', 900);



d3.json("data/buildings.json").then( (data) => {
    data.forEach( (d) => {
        d.height = +d.height;
    
    });
    console.log(data);
    // after formatting the data, send it to the rectangles
    var rects = svg.selectAll('rect')
    .data(data);

    
    rects.enter()
        .append('rect')
            .attr('x', (h, i) => {return i*80 + 50;})
            .attr('y', (h) => {return 900-h.height;})
            .attr('width', 40 )
            .attr('height', (h) => {return h.height;})
            .attr('fill', 'blue');
});

