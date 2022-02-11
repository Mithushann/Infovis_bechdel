
let data = new Map();
let raw_data;

d3.csv("new_oil.csv", function(k){

    raw_data = k;
    for(let i = 0; i < k.length; ++i) {
        data[k[i].year] = new Array();
    }

    for(let i = 0; i < k.length; ++i) {
        data[k[i].year].push(k[i])
    }
})

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

function all_list() {
    display_list(data);
}

function display_list(list) {
    
    let passed_movies = new Map();
    console.log(list)

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
        .domain([parseDate(1900), parseDate(2021)])
        .range([ 0, width ]);

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0]);

    // Add the line
    svg.append("path")
        .datum(graph_data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", d3.line()
            .x(function(d) { return x(parseDate(d.years))})
            .y(function(d) { return y(d.percentage) }));
}