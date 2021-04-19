var margin = {top: 10, right: 10,  bottom: 100, left:100};

var width = 600;
var height = 400;

// with SELECT, the program find the id from the DOM
var g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom + 1)
        .append("g")
            .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");


d3.json("data/buildings.json").then( (data) => {
    var max = 0;
    data.forEach( (d) => {
        d.height = +d.height;
        if (d.height > max){
            max = d.height;
        }
    });

    var names = data.map( (d) => {
        return d.name;
    });

    var heights = data.map( (d) => {
        d.height;
    });

    console.log(data);
    // after formatting the data, send it to the rectangles
    var rects = g.selectAll('rect')
    .data(data);

    var y = d3.scaleLinear().domain([max, 0]).range([0, height / 1.47]);

    var leftAxis = d3.axisLeft(y).ticks(5).tickFormat((d) => { return d + "m"; });
    g.append("g")
    .attr("class", "left axis")
    .call(leftAxis);

    var x = d3.scaleBand()
    .domain(names)
    .range([0, width])
	.paddingInner(0.3)
	.paddingOuter(0.2);

    var bottomAxis = d3.axisBottom(x);

    g.append("g")
	.attr("class", "bottom axis")
	.attr("transform", "translate(0, " + (height / 1.465) + ")")
	.call(bottomAxis)
    .selectAll("text")
    .attr("x", -50)
    .attr("y", 30)
    .attr("transform", "rotate(-40)");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height / 3 ))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .style("fill","black").
        text("Height (m)");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", width / 2)
        .attr("y", height)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill","black").
        text("The word's tallest buildings");

    var size = names.length;
    rects.enter()
        .append('rect')
            .attr('x', (h, i) => {return (width / size) * i + 15;})
            .attr('y', (h) => {return (max-h.height) / 3 - 3 ;})
            .attr('width', 40 )
            .attr('height', (h) => {return h.height / 3;})
            .attr('fill', 'blue');
});