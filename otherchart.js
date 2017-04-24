d3.csv("CleanedReac.csv", function(error, data) {
  if (error) throw error;
   // [{"Hello": "world"}, …]
  data.forEach(function(d) {
      d.Reactions = +d.Reactions;
			d.Comments = +d.Comments;
			d.Angry = +d.Angry;
      d.Seats = +d.Seats;

  });
  console.log(data)


var pformat = d3.format('.1%');

var svg = d3.select("body")
	.append("svg")
	.append("g")

svg.append("g")
	.attr("class", "slices");
svg.append("g")
	.attr("class", "labels");
svg.append("g")
	.attr("class", "lines");

var width = 960,
    height = 600,
	radius = Math.min(width, height) / 2;

var margin = {
		top: 20,
		bottom: 20,
		left: 40,
		right: 120,
};

var pie = d3.layout.pie()
	.sort(null)
  .startAngle(0.5 * Math.PI)
  .endAngle(-0.5 * Math.PI)
	.value(function(d) {
		return d.Reactions;
		console.log(d.Reactions)
	});

var arc = d3.svg.arc()
	.outerRadius(radius * 0.8)
	.innerRadius(radius * 0.4);

var outerArc = d3.svg.arc()
	.innerRadius(radius * 0.9)
	.outerRadius(radius * 0.9);

svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var key = function(d){ return d.data.Partycode; };

change(data)



d3.select(".randomize")
	.on("click", function(){
		change(randomData());
	});

	d3.select(".align")
		.on("click", function(){
			arrangeLabels(svg, ".label");
		});



function change(data) {

	/* ------- PIE SLICES -------*/
	var slice = svg.select(".slices").selectAll("path.slice")
		.data(pie(data), key);

	slice.enter()
		.insert("path")
		.style("fill", function(d) { return (d.data.Color); })
		.attr("class", "slice");

	slice
		.transition().duration(1000)
		.attrTween("d", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				return arc(interpolate(t));
			};
		})

	slice.exit()
		.remove();

	/* ------- TEXT LABELS -------*/

	var text = svg.select(".labels").selectAll("text")
		.data(pie(data), key);

	text.enter()
		.append("text")
		.attr('class', 'label')
		//and give them and id which is l-0, l-1
		.attr('id', function(d, i) {
				return 'l-' + i;
		})
		.attr("dy", ".35em")
		.attr("dx", ".35em")
		.text(function(d) {
			return d.data.Partycode
		})
		//wraps long texts
		.call(wrap, margin.right - 20)

		//Positions text according to path
		.attr("transform", function(d) {
				var pos = outerArc.centroid(d);
				//If midAngle is smaller than Math.Pi the pos[0] is radius*1, otherwise it is radius*-1
				pos[0] = radius * (midAngle(d) < 0 ? -1 : 1);
				return "translate(" + pos + ")";
		})
		//similar here. If the midAngle is smaller than Math.Pi the text Anchor is set to "start" else it is  "end"
		.style("text-anchor", function(d) {
				return midAngle(d) < 0 ? "end" : "start";
		})

	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < 0 ? -1 : 1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < 0 ? "end":"start";
			};
		});

	text.exit()
		.remove();

		//Calls the arrangeLabels function on all elements of the class label to arrange them
		arrangeLabels(svg, ".label");

	/* ------- SLICE TO TEXT POLYLINES -------*/

	var polyline = svg.select(".lines")
		.selectAll("polyline")
		.data(pie(data), key);

	polyline.enter()
		.append("polyline");

	polyline.transition().duration(1000)
	.attr("points", function(d, j) {
	//if midAngle bigger as Pi Offset is set to 10
		var offset = midAngle(d) < 0 ? +10 : 0;
		//picks up the indexed text from earlier
		var label = d3.select('#l-' + j);
		//Complicated function from the other script that should help to order the text
		var transform = getTransformation(label.attr("transform"));
		//Position of the polyline should be the centroid
		var pos = outerArc.centroid(d);
		//This is also from the other function
		pos[0] = transform.translateX + offset;
		pos[1] = transform.translateY;
		var mid = outerArc.centroid(d);
		mid[1] = transform.translateY;
		return [arc.centroid(d), mid, pos];
});

	polyline.exit()
		.remove();
};
});
