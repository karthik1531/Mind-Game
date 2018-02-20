function setUpGrid(Rcount, Ccount) {

	var mainGridContainer = $(".main-grid-container");

	for (var i = 0; i < Rcount; i++) { // Row

		var newRow = $("<div class=\"single-row row-"+i+"\"></div>");

		for (var j = 0; j < Ccount; j++) { // col
			var newCol = $("<div class=\"single-col col-"+j+"\"></div>");
		

			newRow.append(newCol);

		}

		mainGridContainer.append(newRow);
	}
}


function attachColFunctions() {

	$('.single-col').on('click', function(){
		$(this).css('background-color', 'red');
	});

}


$(document).ready(function(){
	
	var colors = ['blue','black','red','green','yellow','orange','pink','grey','voilet','white','purple'];



	$(".btn-submit").on('click', function(){
		const Rcount=$('#row').val();
		const Ccount=$('#columnn').val();
		
		if((Rcount == 0 && Ccount==0)){                           //To Manage Zero value input
			alert("Please enter a valid input");
		}
		else{
			setUpGrid(Rcount, Ccount);
			attachColFunctions();
		}
	});

});