dbRef = firebase.database().ref();

function setUpGrid(Rcount, Ccount) {

	var mainGridContainer = $(".main-grid-container");
	
	for (var i = 0; i < Rcount; i++) { // Row

		var newRow = $("<div class=\"single-row row-"+i+"\"></div>");

		for (var j = 0; j < Ccount; j++) { // col
			
			var newCol = $("<div class=\"single-col "+j+"\"></div>");
			newCol.attr('id',j);
			newRow.append(newCol);
		}
		newRow.attr('id',i);
		mainGridContainer.append(newRow);
	}
}


function attachColFunctions(e) {

	var colors = ['blue','black','red','green','yellow','orange','pink','grey','voilet','white','purple'];
	var click = 0;
	$('.single-col').on('click', function(e){
		var colId = $(e.target).attr('id');
		var rowId = $(this).parent().attr('id');
		//console.log(id);
		if((click%2)==0){
			var updateColor = colors[(rowId%10)];
			$(e.target).css('background-color', updateColor);
			//console.log(row);
			click = click+1;
			dbRef.child(rowId).child(colId).set(updateColor);
		}
		else{
			var updateColor = 'yellow';
			$(e.target).css('background-color', updateColor);
			click = click+1;
			dbRef.child(rowId).child(colId).set(updateColor);
		}
	});
}
function creatingMultiDimensionalArray(multiArray){
	for (var i = 0; i < 4; i++) {
		multiArray[i]=new Array(4);
	}
}
function intializingArray(multiArray){
	for(var i=0; i<4; i++){
		for(j=0; j<4; j++){
			multiArray[i][j] = 'yellow';
		}
	}
}

$(document).ready(function(){
	
	var multiArray = new Array(3);
	creatingMultiDimensionalArray(multiArray);
	intializingArray(multiArray);
	console.log(multiArray);
	dbRef.set(multiArray);
	
	$(".btn-submit").on('click', function(){
		const Rcount=$('#row').val();
		const Ccount=$('#columnn').val();
		var gridSize = (Rcount * 50)-10;
		$('.main-grid-container').css('width', gridSize);
		if((Rcount <= 0 && (Ccount <= 0)) && ($.isNumeric(Rcount)) && ($.isNumeric(Ccount))){                           //To Manage Zero value input
			alert("Please enter a valid input");
		}
		else{
			setUpGrid(Rcount, Ccount);
			attachColFunctions();
			//alert("else");
		}
	});

	$(".btn-cancel").on('click', function(){
		location.reload(true);
	});
});