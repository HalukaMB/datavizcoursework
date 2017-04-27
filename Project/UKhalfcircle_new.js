//https://en.wikipedia.org/wiki/Wikipedia:Index_of_United_Kingdom_political_parties_meta_attributes
//http://stackoverflow.com/questions/42937527/d3-placing-labels-and-lines-on-a-half-pie-half-donut-chart

var margin = {
    top: 10,
    right: 40,
    bottom: 10,
    left: 40
};

var width = document.getElementById('UKhalfcircle').clientWidth
var height = document.getElementById('UKhalfcircle').clientHeight


var radius = 250;
var UKhalfcircle = d3.select('#UKhalfcircle')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height*0.8 + ')');

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
        .innerRadius(radius * 0.8)
        .outerRadius(radius * 0.9);

        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }


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
            .attr('class', 'label')


        new_labels
            .merge(labels)
            .attr('id', function(d, i) {
                return 'l-' + i;
            })

            .style("text-anchor", function(d) {
                return midAngle(d) < -0.13 ? "end" : "start";
            })
            .text(function(d) {
                return d.data.Partycode;
            })


            .attr("dy", ".75em")
            .attr("dx", ".75em")
            .attr("fill", "#111")
            .attr("transform", function(d) {
                var pos = labelArc.centroid(d);
                //If midAngle is smaller than Math.Pi the pos[0] is radius*1, otherwise it is radius*-1
                pos[0] = radius * (midAngle(d) < -0.13 ? -1 : 1);
                return "translate(" + pos + ")";
            })
            .call(wrap, 70)

            arrangeLabels(UKhalfcircle, ".label");

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
            .attr("dy", ".75em")
            .attr("dx", ".75em")
            .attr('stroke-width', '2px')
            .attr('stroke', 'black')
            .attr('opacity', '0.4')
            .attr("points", function(d, j) {
              //if midAngle bigger as Pi Offset is set to 10
                var offset = midAngle(d) < -0.13 ? 10 : 15;
                //picks up the indexed text from earlier
                var label = d3.select('#l-' + j);
                //Complicated function from the other script that should help to order the text
                var transform = getTransformation(label.attr("transform"));
                //Position of the polyline should be the centroid
                var pos = labelArc.centroid(d);
                //This is also from the other function
                pos[0] = transform.translateX + offset;
                pos[1] = transform.translateY;
                var mid = labelArc.centroid(d);
                mid[1] = transform.translateY;
                return [arc.centroid(d), mid, pos];
              });
    });
  }
  var start = "Seat"
  d3trigger(start)
