// set the dimensions of the graph
var margin = {top: 35, right: 10, bottom: 30, left: 70},
    width1 =screen.width -  (margin.left + margin.right)
    height1 = 150

// append the svg object to the body of the page
var svg_year = d3.select("#year_graph1")
.append("svg")
  .attr("width", width1 + margin.left + margin.right)
  .attr("height", height1 + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Add X axis
var x1 = d3.scaleLinear()
  .domain([1,150])
  .range([ 0, width1]);

// Add Y axis
var y1 = d3.scaleOrdinal()
  .domain(["Passed", "Failed"])
  .range([ height1-40, 70]);


//Year wise graph
//--------------------------------------------------
let data1 = new Map();
d3.csv("new_oil.csv", function(d) {
 
  for(let i = 0; i < d.length; ++i) {
      data1[d[i].year] = new Array();
  }
  for(let i = 0; i < d.length; ++i) {
      data1[d[i].year].push(d[i]) 
  }
  
  })
  //--------------------------------------------------

 function yearGraph(year) {
    
  /*svg_year.append("g")
    .attr("transform", "translate(0," + height1 + ")")
    .call(d3.axisBottom(x1).ticks(30));*/

  svg_year.append("g")
    .call(d3.axisLeft(y1));

  given_year = data1[year]
  passed_movies=new Array()
  failed_movies=new Array()

  passed_data = []
  num_passed = 0

  failed_data = []
  num_failed = 0

    for(let movie in given_year) {
        if(given_year[movie].rating == 3){
            passed_movies.push(given_year[movie])
            num_passed = num_passed + 1
            passed_data.push({title: passed_movies[num_passed - 1].title, state: "Passed", number: num_passed});
        }
        else{
            failed_movies.push(given_year[movie])
            num_failed = num_failed + 1
            failed_data.push({title: failed_movies[num_failed - 1].title, state: "Failed", number: num_failed});
        }  
    }

    svg_year.append('g')
      .attr("id", "rect_passed")
      .selectAll('.rect')
      .data(passed_data)
      .enter()
      .append('rect')
      .attr('x', function (d) { return x1(d.number)} )
      .attr('y', function (d) { return y1(d.state) })
      .attr('stroke', 'black')
      .attr('width', width1/150)
      .attr('height', width1/150)
      .attr('fill', 'green')

      .on("mouseover",function(d)  {
          display_one_movie('', 1, 'Delete')

          d3.select(this)
          .attr('opacity', '.5')
          
          svg_year.append("text")
          .attr("id", "passedText")
          .attr("x", x1(d.number))
          .attr("y", y1(d.state) - 10)
          .style("font-size", "15px")
          .style("font-family", "Georgia")
          .text(d.title)  
          
          display_one_movie(d.title, year, 'Display')
        }) 
      .on('mouseout', function () { 
        d3.select(this).transition()
        .attr('opacity', '1')

        svg_year.select("#passedText").remove()
        })
      
    
      svg_year.append('g')
        .attr("id", "rect_failed")
        .selectAll('.rect')
        .data(failed_data)
        .enter()
        .append('rect')
        .attr('x', function (d) { return x1(d.number)} )
        .attr('y', function (d) { return y1(d.state) })
        .attr('stroke', 'black')
        .attr('width', width1/150)
        .attr('height', width1/150)
        .attr('fill', 'red')

        .on("mouseover",function(d)  {
          display_one_movie('', 1, 'Delete')

          d3.select(this)
          .attr('opacity', '.5')
          
          svg_year.append("text")
          .attr("id", "failedText")
          .attr("x", x1(d.number))
          .attr("y", y1(d.state) - 10)
          .style("font-size", "15px")
          .style("font-family", "Georgia")
          .text(d.title)  
          
          display_one_movie(d.title, year, 'Display')
        }) 
      .on('mouseout', function () { 
        d3.select(this).transition()
        .attr('opacity', '1')

          svg_year.select("#failedText").remove()
        })
        
  
}

 