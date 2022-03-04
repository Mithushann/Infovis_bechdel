// ----------------------------------------------- FUNCTIONS ---------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

// Function that displays or deletes one movie 
function display_one_movie(name, year, key) {

   if(key=='Display')
         oneMovie(name, year)
 
   else if(key=='Delete'){
     svg_one_movie.selectAll('*').remove()
   }
 }
 
 // Function that gets the information form OMBD-api and displays it 
 oneMovie = async function(title, year){
  await axios.get('http://www.omdbapi.com/?apikey=8ffbcbc1&t='+title+'&y='+year)
   .then((response) => {
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
         .style("font", "20px 'Georgia'")
         .html("<p> <strong> Title: </strong> "+one_movi.Title+ "</p>");
         
         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y",90)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Year: </strong> "+one_movi.Year+ "</p>");

         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 120)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Director: </strong> "+one_movi.Director+ "</p>");

         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 150)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Genre: </strong> "+one_movi.Genre+ "</p>");

         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 180)
         .attr("width", 2500)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Actors: </strong> "+one_movi.Actors+ "</p>");

         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 210)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong> Awards: </strong> "+one_movi.Awards+ "</p>");

         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 240)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Box Office:</strong> "+one_movi.BoxOffice+ "</p>");
      

         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 270)
         .attr("width", 1500)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Plot:</strong> "+one_movi.Plot+ "</p>");
 
 
     }
     else if(response.data.Response=='False'){
 
         svg_one_movie.append('image')
         .attr('xlink:href','https://ih1.redbubble.net/image.1027712254.9762/fposter,small,wall_texture,product,750x1000.u2.jpg')
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
         .style("font", "20px 'Georgia'")
         .html("<p> <strong> Title: </strong> "+title+ "</p>");
       
         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y",90)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Year: </strong> "+year+ "</p>");
 
         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 120)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Director: </strong> "+'N/A'+ "</p>");
 
         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 150)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Genre: </strong> "+'N/A'+ "</p>");
 
         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 180)
         .attr("width", 2500)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Actors: </strong> "+'N/A'+ "</p>");
 
         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 210)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong> Awards: </strong> "+'N/A'+ "</p>");
 
         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 240)
         .attr("width", 960)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Box Office:</strong> "+'N/A'+ "</p>");
      
 
         svg_one_movie.append("foreignObject")
         .attr("x", 225)
         .attr("y", 270)
         .attr("width", 1500)
         .attr("height", 900)
         .append("xhtml:div")
         .style("font", "20px 'Georgia'")
         .html("<p><strong>Plot:</strong> "+'N/A'+ "</p>");
     }
      
   })
   .catch(error => {console.error(error)});
 };

// ----------------------------------------------- MAIN -------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //

// Set margins of the info of one movie 
var margin = {top: 35, right: 10, bottom: 30, left: 125},
    width1 =screen.width -  (margin.left + margin.right)-100
    height1 = 350

// Append it to the svg of one movie
var svg_one_movie = d3.select("#one_movie_id")
    .append("svg")
    .attr("width", width1 + margin.left + margin.right)
    .attr("height", height1 + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

