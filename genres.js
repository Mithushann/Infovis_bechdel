
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


    display_list(sorted2);
}

// for the button "all genres"
function all_list() {
    display_list(data);
}

//cler display onClick
function clear_display(){
    bool 
    var svg = d3.select("path");
    svg.selectAll("g").remove();
}



//display the list on button click
function display_list(list) {
    
    let passed_movies = new Map();
    //console.log(list)

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

    //Setting scale parameters
    let parseDate = d3.timeParse("%Y");

    // Add X axis
    var x = d3.scaleTime()
        .domain([parseDate(1970), parseDate(2021)])
        .range([ 0, width ]);

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0]);

    // Add the line
    svg.append("path")
        .datum(graph_data)
        .attr("fill", "none")
        .attr("stroke", "green")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(function(d) { return x(parseDate(d.years))})
            .y(function(d) { return y(d.percentage) }));

    //add the dots
    svg.append('g')
    .selectAll("dot")
    .data(graph_data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(parseDate(d.years))} )
      .attr("cy", function (d) { return y(d.percentage)} )
      .attr("r", 3)
      .style("fill", "#69b3a2")
    
}