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

  if(key=='Display'){
        let index=get_one_movi_info(data0, name, year)

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
    
  }
}
  
  function get_one_movi_info(d, name, year){
    for(let i = 0; i < d[0].length; ++i) {
      if(d[0][i].Title.toLowerCase()==name.toLowerCase() &&
         d[0][i].Release_Year.replace('(', '').substr(0,4)==year){ return i
      
      }
    }
   
    return null
  }
