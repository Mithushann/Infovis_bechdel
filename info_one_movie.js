var margin = {top: 35, right: 10, bottom: 30, left: 125},
    width1 =screen.width-200
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
  
  var svg_one_movie = d3.select("#one_movie_id")
  .append("svg")
    .attr("width", width1 + margin.left + margin.right)
    .attr("height", height1 + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

})
  
function display_one_movie(name, key) {

  if(key=='Display'){
        let index=get_one_movi_info(data0, name)

        if(index!=null){
         one_movi=data0[0][index]
        
         svg_one_movie.append('image')
          .attr('xlink:href', one_movi.image_url)
          .attr('x',0)
          .attr('y',0)
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
          svg_one_movie.append("text")
          .attr("x", 225)
          .attr("y", 170)
          .text("Sorry, cant find this movie");
      }
  }
  else if(key=='Delete'){
    svg_one_movie.selectAll('*').remove()
    console.log('remo')
  }
}
  
  function get_one_movi_info(d, name){
    for(let i = 0; i < d[0].length; ++i) {
      if(d[0][i].Title==name){ return i}
    }
    return null
  }
