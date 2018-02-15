$('document').ready(function(){
	var counter = 0;

	$("button").click(function() {
    	$("h2").append("<p>node " + (++counter) + "</p>");
	});
});