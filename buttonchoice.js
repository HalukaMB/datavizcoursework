var radios = document.forms["radiobuttonA"].elements["radiochoice"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
        var choice = this.value
        console.log(choice);

    }
}
