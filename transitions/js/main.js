var margin = {top: 10, right: 10,  bottom: 100, left:100};
var flag = true;
var width = 600;
var height = 400;

// with SELECT, the program find the id from the DOM
var g = d3.select('#chart-area')
    .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom + 1)
        .attr('fill', 'black')
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var t = d3.transition().duration(1500);

d3.json("data/revenues.json").then( (data) => {
    
    console.log(data);
    var max = 0;

    data.forEach( (d) => {
        d.revenue = +d.revenue;
        d.profit= +d.profit;
        if (d.revenue > max){
            max = d.revenue;
        }
    });

    var months = data.map (  (d) => {
        return d.month;
    });

    var revenues = data.map ( (d) => {
        return d.revenue;
    });

    

    var y = d3.scaleLinear().range([0, height]);

    var leftAxis = d3.axisLeft(y).ticks(5).tickFormat((d) => { return d/1000 + "k"; });
    
    var yAxisGroup = g.append("g")
    .attr("class", "left axis");

    var x = d3.scaleBand()
    .range([0, width])
	.paddingInner(0.3)
	.paddingOuter(0.2);

    var bottomAxis = d3.axisBottom(x);

    var xAxisGroup =  g.append("g")
	.attr("class", "bottom axis")
	.attr("transform", "translate(0, " + (height) + ")");

    var yLabel = g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height / 2 ))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .style("fill","black");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", width / 2)
        .attr("y", height + margin.top)
        .attr("transform", "translate(0, " + (40) + ")")
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill","black")
        .text("Month");

        var rects = g.selectAll('rect')
        .data(data);

    updateData(data);

    d3.interval( ( ) => {
        var newData = flag ? data : data.slice(1);
        flag = !flag;
        updateData(newData);
        
    }, 3000);
    
    function updateData(data){
        var value = flag ? "revenue" : "profit";
        x.domain(data.map( (d) => {return d.month}));
        y.domain([d3.max(data, (d) => {return d[value];}), 0]);
        xAxisGroup.transition(t).call(bottomAxis);
        yAxisGroup.transition(t).call(leftAxis);

        var bars = g.selectAll('rect') // join the new data
        .data(data, (d) => { return d.month; });

        bars.exit()
        .transition(t)
            .attr("y", y(0))
            .attr("height", 0)
        .remove(); // remove old element

        bars.enter().append("rect")
        .attr("fill", "yellow")
        .merge(bars)
            .transition(t)
            .attr("x", (d) => { return x(d.month); })
            .attr("y", (d) => { return y(d[value]); })
            .attr("height", (d) => { return height - y(d[value]); })
            .attr("width", x.bandwidth)

        var label  = flag ? "Revenue" : "Profit";
        yLabel.text(label + " (dlls.)")
    }

})
