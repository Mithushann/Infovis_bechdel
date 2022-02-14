// set the dimensions of the graph
var margin = {top: 35, right: 100, bottom: 30, left: 250},
    width1 =screen.width-500
    height1 = 150
    
//Year wise graph
let data1 = new Map();
d3.csv("new_oil.csv", function(d) {

    for(let i = 0; i < d.length; ++i) {
        data1[d[i].year] = new Array();
    }
  

    for(let i = 0; i < d.length; ++i) {
        data1[d[i].year].push(d[i])
       
    }
   
    given_year = data1[2020]

   passed_movies=new Array()
   failed_movies=new Array()

    for(let movie in given_year) {
        if(given_year[movie].rating == 3){
           // console.log(given_year[movie].title )
            passed_movies.push(given_year[movie])
        }
        else{
           // console.log(given_year[movie].rating)
            failed_movies.push(given_year[movie])
        }
        
    }
    //console.log(passed_movies)


    
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
      .domain([0,100])
      .range([ 0, width1 ]);
  svg_year.append("g")
      .attr("transform", "translate(0," + height1 + ")")
      .call(d3.axisBottom(x1).ticks(20));


    // Add Y axis
    var y1 = d3.scaleOrdinal()
      .domain(["Passed", "Failed"])
      .range([ height1-40, 40]);
    svg_year.append("g")
      .call(d3.axisLeft(y1));
   
 
    // Add the path using this helper function
    for(let index in passed_movies){
    svg_year.append('rect')
      .attr('x', index*(width1/100))
      .attr('y', 100)
      .attr('width', width1/100)
      .attr('height', width1/100)
      .attr('stroke', 'black')
      .attr('fill', '#69a3b2');
    }

    for(let index in failed_movies){
        svg_year.append('rect')
          .attr('x', index*(width1/100))
          .attr('y', 30)
          .attr('width', width1/100)
          .attr('height', width1/100)
          .attr('stroke', 'black')
          .attr('fill', '#69a3b2');
        }
  })

// // create svg element:
// var svg = d3.select("#rect").append("svg").attr("width", 800).attr("height", 200)

// // Add the path using this helper function
// svg.append('rect')
//   .attr('x', 10)
//   .attr('y', 120)
//   .attr('width', 600)
//   .attr('height', 40)
//   .attr('stroke', 'black')
//   .attr('fill', '#69a3b2');