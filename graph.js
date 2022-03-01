
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
        yearGraph(d.years)
        d3.select(this)
            .attr('opacity', '.5')
        
        svg.append("text")
            .attr("id", "circleText")
            .attr("x", x(parseDate(d.years)) - 15)
            .attr("y", y(d.percentage)  - 30)
            .text(d.years)
  
    ;})
    .on('mouseout', function () {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1')
  
          svg.select("#circleText").remove()
  
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
    .attr("x", 80)
    .attr("y", -15)
    .text("percentage");