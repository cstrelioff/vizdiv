$(document).ready(function() {
  // create some interesting data to plot
  var data = [];
  for (var i=0; i<100; i++) {
    data[i] = Math.min(i, 50) * Math.sin(2*3.14*i/25);
  }

  // setup dimensions
  var div_width = $("#vizdiv")[0].clientWidth,
      div_height = Math.max(200, 5/9 * div_width),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = div_width - margin.left - margin.right,
      height = div_height - margin.top - margin.bottom;

  // select vizdiv and append svg
  var svg = d3.select("#vizdiv").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("svg:g")
              .attr("transform",
                    "translate(" + margin.left + "," + margin.top + ")");

  // create scales
  x = d3.scale.linear()
              .domain([0, data.length-1])
              .range([0 + margin.left, width - margin.right]);
  y = d3.scale.linear()
              .domain([d3.max(data), d3.min(data)])
              .range([0 + margin.bottom, height - margin.top]);

  // create axes
  var xAxis = d3.svg.axis()
                .scale(x)
                .ticks(4)
                .orient("bottom");
  
  svg.append("g")
     .attr("class", "x-axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis);

  var yAxis = d3.svg.axis()
                .scale(y)
                .ticks(4)
                .orient("left");

  svg.append("g")
     .attr("class", "y-axis")
     .attr("transform", "translate(0, 0)")
     .call(yAxis);
 
  // add line 
  var line = d3.svg.line()
               .x(function(d,i) {return x(i);})
               .y(function(d) {return y(d);});

  svg.append("path")
     .attr("d", line(data)); 

});
