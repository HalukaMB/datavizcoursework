var radios = document.forms["radiobuttonA"].elements["radiochoice"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
        var choice = this.value
d3trigger(choice)
    }
}
//http://stackoverflow.com/questions/35213943/d3-js-transition-bar-chart-when-switching-between-data-sources
var radiosB = document.forms["radiobuttonB"].elements["radiochoiceB"];
for(var i = 0, max = radiosB.length; i < max; i++) {
    radiosB[i].onclick = function() {
        var choiceB = this.value
        console.log(choiceB)
d3UKboxplot(choiceB)
    }
}
