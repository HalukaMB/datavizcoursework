//https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var pformat = d3.format('.2%');

  // set the ranges
  var xscale = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var yscale = d3.scaleLinear()
            .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var UKbarchart = d3.select("#UKbarchart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript/11086014
var xaxis = d3.axisBottom(xscale);

var yaxis = d3.axisLeft(yscale);

UKbarchart.append('g')
    .attr('transform', 'translate(0, ' + height + ')')
    .attr('class', 'x_axis');

UKbarchart.append('g')
    .attr('class', 'y_axis')
    ;

    var answer=document.getElementById("dropdownA");
    answer.onchange = function(){
    var choicedropA = answer.options[answer.selectedIndex].value;
    console.log(choicedropA);
    d3UKbar(choicedropA)
}

//d3UKbar(choice)


// get the data
function d3UKbar(choice){
d3.csv("UKbarchartDATA/"+choice+".csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.measure = (+d.measure*100);
  });



  // Scale the range of the data in the domains
  xscale.domain(data.map(function(d) { return d.label; }));
  yscale.domain([0, d3.max(data, function(d) { return +d.measure; })]);

  // append the rectangles for the bar chart
      var bars = UKbarchart.selectAll(".bar")
      .data(data)

      bars
          .exit()
          .transition()
          .attr('y', height)
          .attr('height', 0)
          .remove();

      var new_bars =bars
          .enter()
          .append("rect")
          .attr("class", "bar")
          .attr("width", xscale.bandwidth())
          .attr('y', height);

      new_bars
          .merge(bars)
          .transition()
          .attr("height", function(d) { return height - yscale(d.measure); })
          .attr("y", function(d) { return yscale(d.measure); })
          .attr("x", function(d) { return xscale(d.label); })
          .attr("fill", function(d) { return (d.color); })

          var text = UKbarchart.selectAll('.text')
              .data((data));

          text
              .exit()
              .transition()
              .attr('x', function(d) { return  xscale(d.label)+(xscale.bandwidth())*0.5; })
              .attr('y', height)
              .remove();

          var new_text = text
              .enter()
              .append('text')
              .attr('class', 'text')
              .attr('y', height)

            new_text
              .merge(text)
              .transition()
              .style("text-anchor", "middle")
              .attr('x', function(d) { return xscale(d.label)+(xscale.bandwidth())*0.5 ;})

              .attr('y', function(d) { return (yscale(d.measure/2));})
              .text(function(d) {
                  return (pformat(d.measure)+"%");
              })
              .attr('fill', 'black');


          UKbarchart.select('.x_axis')
              .transition()
              .duration(1000)
              .call(xaxis);

          UKbarchart.select('.y_axis')
              .transition()
              .duration(1000)
              .call(yaxis);



});
}
var start= "Conservatives"
console.log(start)
d3UKbar(start)
