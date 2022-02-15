d3.csv("one_movie_info.csv", function(d) {

  let index=get_one_movi_info(d, "Hamilton")
  
  if(index!=null){

   one_movi=d[index]
   var svg_one_movie = d3.select("#one_movie_id")

   .append("svg")
   .attr("width", 2000)
   .attr("height", 400)

   svg_one_movie.append('image')
    .attr('xlink:href', one_movi.image_url)
    .attr('width', 200)
    .attr('height', 400)

    svg_one_movie.append("text")
    .attr("x", 225)
    .attr("y", 80)
    .text(one_movi.Title);
    
    svg_one_movie.append("text")
    .attr("x", 225)
    .attr("y",110)
    .text(one_movi.Release_Year);
    
    svg_one_movie.append("text")
    .attr("x", 225)
    .attr("y", 140)
    .text(one_movi.Genre);

    svg_one_movie.append("text")
    .attr("x", 225)
    .attr("y", 170)
    .text(one_movi.Synopsis);

  }
  else{
    var svg_one_movie = d3.select("#one_movie_id")

   .append("svg")
   .attr("width", 2000)
   .attr("height", 400)

    svg_one_movie.append("text")
    .attr("x", 225)
    .attr("y", 170)
    .text("Sorry, cant find this movie");
  }

  })

  function get_one_movi_info(d, name){
    
    for(let movie in d){
      if(d[movie].Title==name) return movie
    }
    
    return null
  }
 