
//https://en.wikipedia.org/wiki/Wikipedia:Index_of_United_Kingdom_political_parties_meta_attributes
//http://stackoverflow.com/questions/42937527/d3-placing-labels-and-lines-on-a-half-pie-half-donut-chart


d3.csv("CleanedReac.csv", function(error, data) {
  if (error) throw error;
   // [{"Hello": "world"}, …]
  data.forEach(function(d) {
      d.Mean = +d.Mean;
      d.Seats = +d.Seats;
  });
  console.log(data);



var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};

var width = 800 - margin.right - margin.left;
var height = 400 - margin.top - margin.bottom;
var radius = 300;

var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height + ')');

svg.append('g')
    .attr('class', 'slices');
svg.append('g')
    .attr('class', 'labels');
svg.append('g')
    .attr('class', 'lines');


var pie = d3.pie()
    .sort(null)
    .value(function (d) {
        return d.Mean;
        console.log(d.Mean)
    })
    .startAngle(-90 * (Math.PI / 180))
    .endAngle(90 * (Math.PI / 180));

// donut chart arc
var arc = d3.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 50);

var slice = svg.select('.slices')
    .selectAll('path.slice')
    .data(pie(data));

slice.enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function (d) {
      console.log(d.data.Color)
        return (d.data.Color);
    })
    .attr('class', 'slice');

var sliceDots = svg.select('.slices')
    .selectAll('circle')
    .data(pie(data));

sliceDots.enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('cx', function (d) {
        return arc.centroid(d)[0];
    })
    .attr('cy', function (d) {
        return arc.centroid(d)[1];
    })
    .attr('r', 2)
    .attr('fill', 'black');

// label arc
var labelArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

var labels = svg.select('.labels')
    .selectAll('text')
    .data(pie(data));

labels
    .enter()
    .append('text')
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .attr('class', 'labels')
    .text(function (d) {
        return d.data.Partycode;
    })
    .attr('transform', function (d) {
        return 'translate(' + labelArc.centroid(d)[0] + ',' + labelArc.centroid(d)[1] + ')';
    });

    // Transform from Martin
    //.attr("transform", function(d) {
      //  var pos = labelArc.centroid(d);
        //pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
        //return "translate(" + pos + ")";
    //})

// lines
var polyline = svg.select('.lines')
    .selectAll('polyline')
    .data(pie(data));

polyline.enter()
    .append('polyline')
    .attr('stroke-width', '2px')
    .attr('stroke', 'black')
    .attr('opacity', '0.4')
    .attr('points', function (d) {
        return [arc.centroid(d), labelArc.centroid(d)];
    });
    });
