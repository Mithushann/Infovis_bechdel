// set the dimensions of the graph
  var margin = {top: 25, right: 50, bottom: 30, left: 50},
      width = screen.width-500
      height = 350

  // append the svg object to the body of the page
  var svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  //Read the data
  d3.csv("percentage_passed.csv", function(data) {

  //Setting scale parameters
  let parseDate = d3.timeParse("%Y");

// Add X axis
  var x = d3.scaleTime()
    .domain([parseDate(1970), parseDate(2021)])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));
  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width + 60)
    .attr("y", height + 7)
    .text("years");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y).ticks(10));
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 30)
    .attr("y", -15)
    .text("percentage");


  // Add the line
  svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 2)
  .attr("d", d3.line()
    .x(function(d) { return x(parseDate(d.years))})
    .y(function(d) { return y(d.percentage) })
    )
  
  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("id", "circ")
      .attr("cx", function (d) { return x(parseDate(d.years))} )
      .attr("cy", function (d) { return y(d.percentage)} )
      .attr("r", 6)
      .style("fill", "#69b3a2")
      .style("opacity", 1) 
    
 //.on("mousemove",function(d)  {yearGraph(d.years)})  
 .on('mouseover', function (d) { 
  yearGraph(d.years)
   d3.select(this).style('opacity', .5).attr('r',10)
  svg.append("text")
      .attr("id", "circleText")
      .attr("x", x(parseDate(d.years)) - 15)
      .attr("y", y(d.percentage)  - 30)
      .text(d.years)})  

.on('mouseout', function (d, i) { 
       d3.select(this)
         .style('opacity', 1)
         .attr('r',6)
    
    svg.select("#circleText").remove()})
  
})

