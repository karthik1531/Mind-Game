function setUpGrid(Rcount, Ccount) {

	var mainGridContainer = $(".main-grid-container");
	

	for (var i = 0; i < Rcount; i++) { // Row

		var newRow = $("<div class=\"single-row row-"+i+"\"></div>");

		for (var j = 0; j < Ccount; j++) { // col
			
			var newCol = $("<div class=\"single-col "+j+"\"></div>");
		
			newCol.attr('id',j);
			newRow.append(newCol);

		}

		mainGridContainer.append(newRow);
	}
}


function attachColFunctions(e) {

	var colors = ['blue','black','red','green','yellow','orange','pink','grey','voilet','white','purple'];
	var click = 0;
	$('.single-col').on('click', function(e){
		var id = $(e.target).attr('id');

		if((click%2)==0){
			$(e.target).css('background-color', colors[(id%10)]);
			click = click+1;
		}
		else{
			$(e.target).css('background-color', 'yellow');
			click = click+1;
		}
	});
}


$(document).ready(function(){
	
	$(".btn-submit").on('click', function(){
		const Rcount=$('#row').val();
		const Ccount=$('#columnn').val();
		var gridSize = Rcount * 50;
		$('.main-grid-container').css('width', gridSize);
		if((Rcount <= 0 && (Ccount <= 0)) && ($.isNumeric(Rcount)) && ($.isNumeric(Ccount))){                           //To Manage Zero value input
			alert("Please enter a valid input");
		}
		else{
			setUpGrid(Rcount, Ccount);
			attachColFunctions();
			alert("else");
		}
	});

	$(".btn-cancel").on('click', function(){
		location.reload(true);
	});
});