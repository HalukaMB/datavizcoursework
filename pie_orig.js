

function pieChart() {

    var width = 400;
    var height = 300;

    var margin = {
        top: 80,
        bottom: 80,
        left: 120,
        right: 120,
    };

    var columns = [];

    var svg;
//Only first decimal after the dot is shown
    var pformat = d3.format('.1%');

    var colourScale = d3.scaleOrdinal()
        .domain(['N/A', 'Disagree', 'Neither Agree nor Disagree', 'Agree'])
        .range(["#222", "hsla(0, 60%, 50%, 1)", "hsla(45, 70%, 60%, 1)", "hsla(90, 50%, 50%, 1)"]);

//converts data into start angle etc.
    var pie = d3.pie()
    //surpresses the automatic sorting by size
        .sort(null)
        .value(function(d) {
            return d.value;
        });

    //sending in d and getting the key out
    var key = function(d) {
        return d.data.key;
    }
//finds the middle between two angles
    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }

//setting everything in the chart function to make it reusable
    function chart(selection) {
        selection.each(function(data) {

            //draw the pie chart
            svg = d3.select(this)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            width = width - margin.left - margin.right;
            height = height - margin.top - margin.bottom;

            svg = svg
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            svg.append("g")
                .attr("class", "slices");
            //already creating a group with the class labels
            svg.append("g")
                .attr("class", "labels");

            svg.append("g")
                .attr("class", "lines");

            pie_data = [];
            columns.forEach(function(c) {
              //if data[c] (converted to int by using plus) is bigger then 0 push key and value to pie_data as an array of objects
                if (+data[c] > 0) {
                    pie_data.push({
                        key: c,
                        value: +data[c]
                    });
                }
            });

//radius of the pie is half of the smaller dimension
            var radius = Math.min(width, height) / 2;

//This arc generators produce path data from angle and radius values. An arc generator is created using:
            var arc = d3.arc()
//It can then be passed an object containing startAngle, endAngle, innerRadius and outerRadius properties to produce the path data:

                .outerRadius(radius * 0.5)
                .innerRadius(radius * 0.1)
                //how much "explosion", padAngle*padRadius=distance between adjacent segments
                .padAngle(.1)
                .padRadius(50)
                //rounds corners
                .cornerRadius(2);

                //This is the radius for the labels, it does not matter which is outter and which is inner radius.
            var labelArc = d3.arc()
                .outerRadius(radius * 1)
                .innerRadius(radius*0.4);

            //Here is where the definition of slices starts

            var slice = svg.select(".slices")
            //gets all elements with the class path.slice
                .selectAll("path.slice")
            //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties PLUS key)
                .data(pie(pie_data), key);
//The basic difference between select and selectAll is that select squashes the hierarchy of the existing selections, while selectAll preserves it.
            slice
                .enter()
            //Now path is inserted to draw the path of the slice
                .insert("path")
                .attr("d", arc)
                .attr("class", "slice")
                .style("stroke", "black")
                .style("stroke-width", "0.5px")
                .style("fill", function(d) {
            //uses the earlier defined colour scale
                    return colourScale(d.data.key);
                });

//selects the earlier defined svg element with the class labels and sets it equal to the var text
            var text = svg.select(".labels")
            //now get all text and append them into labels/var text
                .selectAll("text")
                //adds data to it
                .data(pie(pie_data), key);

            //classic d3 enter elements, append text, give them the class "label"
            text
                .enter()
                .append("text")
                .attr('class', 'label')
                //and give them and id which is l-0, l-1
                .attr('id', function(d, i) {
                    return 'l-' + i;
                })
                //Positions text according to path
                .attr("transform", function(d) {
                    var pos = labelArc.centroid(d);
                    //If midAngle is smaller than Math.Pi the pos[0] is radius*1, otherwise it is radius*-1
                    pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                })
                //similar here. If the midAngle is smaller than Math.Pi the text Anchor is set to "start" else it is  "end"
                .style("text-anchor", function(d) {
                    return midAngle(d) < Math.PI ? "start" : "end";
                })
                .attr("dy", ".35em")
                .attr("dx", ".35em")
                .attr("fill", "#111")
                //returns something like Disagree(10.8%), pformat ensured it only shows the first decimal

                .text(function(d) {
                    return d.data.key + " (" + pformat(d.data.value) + ")";
                })
                //wraps long texts
                .call(wrap, margin.right - 20);

            //Calls the arrangeLabels function on all elements of the class label to arrange them
            arrangeLabels(svg, ".label");
            //var polyline is set equal to the earlier defined svg element with theclass of lines
            var polyline = svg.select(".lines")
            //Now all polyline are selected and attached to it
                .selectAll("polyline")
                //and now the data comes in
                .data(pie(pie_data), key);

            polyline.enter()
            //Appends polyline to newly created polyline
                .append("polyline")
                //
                .attr("points", function(d, j) {
                  //if midAngle bigger as Pi Offset is set to 10
                    var offset = midAngle(d) < Math.PI ? 0 : 10;
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
        })
    }

    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    }

    chart.columns = function(_) {
        if (!arguments.length) return columns;
        columns = _;
        return chart;
    };

    return chart;
}
