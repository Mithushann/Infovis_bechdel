
// // ------------------------------------------ FUNCTIONS ------------------------------------------- // 

let data = new Map();
let raw_data;

//read in the csv file and filter to the wanted years
d3.csv("new_oil.csv", function(k){

    raw_data = k.filter(line => line.year > 1970);
    for(let i = 0; i < raw_data.length; ++i) {
        data[raw_data[i].year] = new Array();
    }

    for(let i = 0; i < raw_data.length; ++i) {
        data[raw_data[i].year].push(raw_data[i])
    }

    all_list();
})

//change between genres
function change_genre(genre) {

    let sorted = raw_data.filter(line => {return line.genres.includes(genre)});
    
    let sorted2 = new Map()
    for(let i = 0; i < sorted.length; ++i) {
        sorted2[sorted[i].year] = new Array();
    }

    for(let i = 0; i < sorted.length; ++i) {
        sorted2[sorted[i].year].push(sorted[i])
    }
    
    display_list(sorted2, genre)
    
}
// for the button "all genres"
function all_list() {
    display_list(data, 'all_genres');
}
//display the list on button click
function display_list(list, genre) {

    let color;
    
    let l = svg.select("#" + genre);
    let d = svg.select("#" + genre + "_dots");
    if(l._groups[0][0]) {
        l.remove();
        d.remove();
        return;
    }
    switch(genre) {
        case 'Comedy': color = "#fee001"; break;
        case 'Action':
            color = "#e90003"; break;
        case 'Romance':
            color = "#e372ba"; break;
        case 'Drama':
            color = "#2050bc"; break;
        case 'Horror':
            color = "#16140c"; break;
        case 'Thriller':
            color = "#646665"; break;
        case 'Sci-Fi':
            color = "#e86c03"; break;
        case 'Family':
            color = "#42a701"; break;
        default:
            color = "#6eddaa";
      }   
     
    let passed_movies = new Map();

    for(let prop in list) {
        passed_movies[prop] = 0;
    }

    for(let prop in list) {

        for(let i = 0; i < list[prop].length; ++i) {

            if(list[prop][i].rating == 3)
            passed_movies[prop]++;
        }
    }

    let graph_data = [];
    for(let prop in passed_movies) {
        graph_data.push({years: prop, percentage: passed_movies[prop] * 100/list[prop].length});
    } 

    // Add the line
    svg.append("path")
    .datum(graph_data)
    .attr("id", genre)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", 2)
    .attr("d", d3.line()
        .x(function(d) { return x(parseDate(d.years))})
        .y(function(d) { return y(d.percentage) }));

    // Toggle variable for onclick
    var toggleSelected = true;

    //add the dots
    svg.append('g')
    .attr("id", genre + "_dots")
    .selectAll("dot")
    .data(graph_data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(parseDate(d.years))} )
    .attr("cy", function (d) { return y(d.percentage)} )
    .attr("r", 6)
    .style("fill", color)

    //Hover function
    .on('mouseover', function (d) {

        d3.select(this)
            .attr('opacity', '.5')

        div.transition()				
            .style("opacity", .9);		
        div	.html("Year: " + d.years + "<br/>"  + "Num. of movies: " + list[d.years].length)	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 28) + "px");

    ;})
    .on('mouseout', function () {
          d3.select(this).transition()
               .attr('opacity', '1')
  
            div.transition()				
               .style("opacity", 0);	
  
    ;})
    
    //on-click function
    .on('click', function (d) {

        if(toggleSelected == true) {
            d3.select(this).classed("selected", true);
            
            yearGraph(d.years)

            d3.select("#year_graph1").style("background-color", "#f1f1f1")

            svg_year.append("text")
            .attr('id', 'chosen_year')
            .attr("x", 10)
            .attr("y", 0)
            .attr("class", 'year-text')
            .style("font-size", "30px")
            .style("font-family", "Georgia")
            .text(d.years)

            svg_year.append("text")
            .attr('id', 'undertext')
            .attr("x", 10)
            .attr("y", 25)
            .attr("class", 'year-text')
            .style("font-size", "17px")
            .style("font-family", "Georgia")
            .text("a total of " + list[d.years].length + " movies was made")


            toggleSelected = false;
        } 
        else {
            d3.select(this).classed("deselected", true);

            svg_year.selectAll("*").remove()
            d3.select("#year_graph1").style("background-color", "white")

            toggleSelected = true;
        } 
        
        
    ;})
}

// ----------------------------------------------------------------------------------------------------

// set the dimensions of the graph
var margin = {top: 35, right: 70, bottom: 30, left:70 },
    width = screen.width -  (margin.left + margin.right)-350
    height = 350

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  //Setting scale parameters
  let parseDate = d3.timeParse("%Y");

// Define the div for the tooltip
var div = d3.select("body").append("div")	
.attr("class", "tooltip")				
.style("opacity", 0);

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
    .attr("x", width + 70)
    .attr("y", height + 7)
    .style("font-size", "20px")
    .style("font-family", "Georgia")
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
    .attr("x", 50)
    .attr("y", -15)
    .style("font-size", "20px")
    .style("font-family", "Georgia")
    .text("percentage");