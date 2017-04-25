//https://en.wikipedia.org/wiki/Wikipedia:Index_of_United_Kingdom_political_parties_meta_attributes
//http://stackoverflow.com/questions/42937527/d3-placing-labels-and-lines-on-a-half-pie-half-donut-chart

var margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};
var width = 800 - margin.right - margin.left;
var height = 400 - margin.top - margin.bottom;
var radius = 300;
var UKhalfcircle = d3.select('#UKhalfcircle')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height + ')');
UKhalfcircle.append('g')
    .attr('class', 'slices');
UKhalfcircle.append('g')
    .attr('class', 'labels');
UKhalfcircle.append('g')
    .attr('class', 'lines');

    var arc = d3.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 50);


    // label arc
    var labelArc = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

function d3trigger(choice) {
    console.log(choice)
    d3.csv("UKhalfcircleDATA/" + choice + ".csv", function(error, data) {
        if (error) throw error;
        // [{"Hello": "world"}, …]
        data.forEach(function(d) {
            d.Mean = +d.Mean;
            d.Percentage = +d.Percentage;
        });
        console.log(data)



        var pie = d3.pie()
            .sort(null)
            .value(function(d) {
                return d.Mean;
                console.log(d.Mean)
            })
            .startAngle(-90 * (Math.PI / 180))
            .endAngle(90 * (Math.PI / 180));
        // donut chart arc

      var slice = UKhalfcircle.selectAll('.slice')
                .data(pie(data));

        slice
              .exit()
              .transition(4000)
              .remove()

        var new_slice=slice
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d) {
                console.log(d.data.Color)
                return (d.data.Color);
            })
            .attr('class', 'slice');

        new_slice
            .merge(slice)
            .transition(4000)
            .attr('d', arc)
            .attr('fill', function(d) {
                console.log(d.data.Color)
                return (d.data.Color);
            })



        var sliceDots = UKhalfcircle.selectAll('.dot')
            .data(pie(data));

        sliceDots
            .exit()
            .transition(4000)
            .remove()

        new_sliceDots=sliceDots
            .enter()
            .append('circle')
            .attr('class', 'dot')

        new_sliceDots
            .merge(sliceDots)
            .transition(4000)
            .attr('cx', function(d) {
                return arc.centroid(d)[0];
            })
            .attr('cy', function(d) {
                return arc.centroid(d)[1];
            })
            .attr('r', 2)
            .attr('fill', 'black');


        var labels = UKhalfcircle.selectAll('.label')
            .data(pie(data));

        labels
              .exit()
              .transition(4000)
              .remove()

        new_labels= labels
            .enter()
            .append('text')
            .attr('dy', '.35em')
            .attr('class', 'label')

        new_labels
            .merge(labels)
            .transition(4000)
            .attr('text-anchor', 'middle')
            .text(function(d) {
                return d.data.Partycode;
            })
            .attr('transform', function(d) {
                return 'translate(' + labelArc.centroid(d)[0] + ',' + labelArc.centroid(d)[1] + ')';
            });

        // lines
        var polyline = UKhalfcircle.selectAll('.polyline')
            .data(pie(data));

        polyline.exit()
                .transition(4000)
                .remove()

        var new_polyline=polyline
            .enter()
            .append('polyline')
            .attr("class","polyline")


        new_polyline
            .merge(polyline)
            .transition(4000)
            .attr('stroke-width', '2px')
            .attr('stroke', 'black')
            .attr('opacity', '0.4')
            .attr('points', function(d) {
                return [arc.centroid(d), labelArc.centroid(d)];
            });
    });
  }
  var start = "Seats"
  d3trigger(start)
