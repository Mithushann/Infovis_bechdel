
var margin = {top: 35, right: 10, bottom: 30, left: 125},
    width1 =screen.width -  (margin.left + margin.right)-100
    height1 = 350
var svg_one_movie = d3.select("#one_movie_id")
    .append("svg")
    .attr("width", width1 + margin.left + margin.right)
    .attr("height", height1 + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
d3.csv("one_movie_info.csv", function(d) {
  data0=new Array(d);
  
  svg_one_movie
  .append("text")
  .attr("x", 0)
  .attr("y", 0)
  .text("Hover over the boxes in year graph to get more information about one movie");

})
  
function display_one_movie(name, year, key) {

  if(key=='Display')
        oneMovie(name, year)

  else if(key=='Delete'){
    svg_one_movie.selectAll('*').remove()
  }
}
  
  function get_one_movi_info(d, name, year){
    for(let i = 0; i < d[0].length; ++i) {
      if(d[0][i].Title==name &&
         d[0][i].Release_Year.replace('(', '').substr(0,4)==year){ return i }
    }
    return null
  }

  //8ffbcbc1
  //OMDB api regust

oneMovie = async function(title, year){
  await axios.get('http://www.omdbapi.com/?apikey=8ffbcbc1&t='+title+'&y='+year)
  .then((response) => {
    console.log(response.data)
    if(response.data.Response=='True'){
     let one_movi=response.data
     
      svg_one_movie.append('image')
       .attr('xlink:href', one_movi.Poster)
       .attr('x',0)
       .attr('y',0)
       .attr('width', 200)
       .attr('height', 400)
     
       svg_one_movie.append("foreignObject")
       .attr("x", 225)
       .attr("y", 60)
       .attr("width", 960)
      .attr("height", 900)
      .append("xhtml:div")
      .style("font", "25px 'Helvetica Neue'")
         .html("<p><strong>Title: </strong> "+one_movi.Title+ "</p>");
      
       svg_one_movie.append("foreignObject")
       .attr("x", 225)
       .attr("y",90)
       .attr("width", 960)
      .attr("height", 900)
      .append("xhtml:div")
      .style("font", "25px 'Helvetica Neue'")
         .html("<p><strong>Year: </strong> "+one_movi.Year+ "</p>");

       svg_one_movie.append("foreignObject")
       .attr("x", 225)
       .attr("y", 120)
       .attr("width", 960)
      .attr("height", 900)
      .append("xhtml:div")
      .style("font", "25px 'Helvetica Neue'")
         .html("<p><strong>Director: </strong> "+one_movi.Director+ "</p>");

       svg_one_movie.append("foreignObject")
       .attr("x", 225)
       .attr("y", 150)
       .attr("width", 960)
      .attr("height", 900)
      .append("xhtml:div")
      .style("font", "25px 'Helvetica Neue'")
         .html("<p><strong>Genre: </strong> "+one_movi.Genre+ "</p>");

       svg_one_movie.append("foreignObject")
      .attr("x", 225)
      .attr("y", 180)
      .attr("width", 2500)
      .attr("height", 900)
      .append("xhtml:div")
      .style("font", "25px 'Helvetica Neue'")
         .html("<p><strong>Actors: </strong> "+one_movi.Actors+ "</p>");

      svg_one_movie.append("foreignObject")
      .attr("x", 225)
      .attr("y", 210)
      .attr("width", 960)
      .attr("height", 900)
      .append("xhtml:div")
      .style("font", "25px 'Helvetica Neue'")
         .html("<p><strong> Awards: </strong> "+one_movi.Awards+ "</p>");

      svg_one_movie.append("foreignObject")
      .attr("x", 225)
      .attr("y", 240)
      .attr("width", 960)
      .attr("height", 900)
      .append("xhtml:div")
      .style("font", "25px 'Helvetica Neue'")
         .html("<p><strong>Box Office:</strong> "+one_movi.BoxOffice+ "</p>");
     

      svg_one_movie.append("foreignObject")
       .attr("x", 225)
       .attr("y", 270)
       .attr("width", 1500)
       .attr("height", 900)
       .append("xhtml:div")
       .style("font", "25px 'Helvetica Neue'")
         .html("<p><strong>Plot:</strong> "+one_movi.Plot+ "</p>");


    }
    else if(response.data.Response=='False'){
      svg_one_movie.append("text")
       .attr("x", 225)
       .attr("y", 170)
       .text(response.data.Error);
    }
     
     })
  .catch(error => {console.error(error)
  });
};

