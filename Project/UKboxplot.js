//https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var pformat = d3.format('.2');

  // set the ranges
  var xscale = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var yscale = d3.scaleLinear()
            .range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var UKboxplot = d3.select("#UKboxplot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript/11086014
var xaxis = d3.axisBottom(xscale);

var yaxis = d3.axisLeft(yscale);

UKboxplot.append('g')
    .attr('transform', 'translate(0, ' + (height) + ')')
    .attr('class', 'x_axis');

UKboxplot.append('g')
    .attr('class', 'y_axis');



//d3UKbar(choice)


// get the data
function d3UKboxplot(choice){
  console.log(choice)
d3.csv("UKboxplotDATA/"+choice+".csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
    d.Mean = (+d.Mean);
    d.Lowb = (+d.Lowb)
    d.Uppb = (+d.Uppb)
    d.Interval = (+d.Interval)
  });
  console.log(data)



  // Scale the range of the data in the domains
  xscale.domain(data.map(function(d) { return d.Party; }));
  yscale.domain([d3.min(data, function(d) { return +(d.Lowb); }), d3.max(data, function(d) { return +(d.Uppb); })]);

  // append the rectangles for the bar chart
      var bars = UKboxplot.selectAll(".bar")
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
          .attr("height", function(d) { return yscale(d.Lowb) - yscale(d.Uppb); })
          .attr("y", function(d) { return yscale(d.Uppb); })
          .attr("x", function(d) { return xscale(d.Party); })
          .attr("fill", function(d) { return (d.Color); })

          var sliceDots = UKboxplot.selectAll('.dot')
              .data((data));

          sliceDots
              .exit()
              .transition()
              .attr('cx', function(d) { return  xscale(d.Party)+(xscale.bandwidth())*0.5; })
              .attr('cy', height)
              .remove();

          var new_sliceDots = sliceDots
              .enter()
              .append('circle')
              .attr('class', 'dot')
              .attr('cy', height)

            new_sliceDots
              .merge(sliceDots)
              .transition()
              .attr('cx', function(d) { return xscale(d.Party)+(xscale.bandwidth())*0.5 ;})
              .attr('cy', function(d) { return yscale(d.Mean);
              })
              .attr('r', 3)
              .attr('fill', 'black');

              var text = UKboxplot.selectAll('.text')
                  .data((data));

              text
                  .exit()
                  .transition()
                  .attr('x', function(d) { return  xscale(d.Party)+(xscale.bandwidth())*0.5; })
                  .attr('y', height)
                  .remove();

              var new_text = text
                  .enter()
                  .append('text')
                  .attr('class', 'text')
                  .attr('cy', height)

                new_text
                  .merge(text)
                  .transition()
                  .attr('x', function(d) { return xscale(d.Party)+(xscale.bandwidth())*0.5 ;})
                  .attr('dx', '.35em')
                  .attr('y', function(d) { return yscale(d.Mean);})
                  .text(function(d) {
                      return pformat(d.Mean);
                  })
                  .attr('fill', 'black');



          UKboxplot.select('.x_axis')
              .transition()
              .duration(1000)
              .call(xaxis);

          UKboxplot.select('.y_axis')
              .transition()
              .duration(1000)
              .call(yaxis);



});
}
var choice = "Mistake"
d3UKboxplot(choice)
