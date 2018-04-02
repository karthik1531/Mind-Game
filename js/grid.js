dbRef = firebase.database().ref();


var multiArray = new Array(4);

function creatingMultiDimensionalArray(multiArray){
	for (var i = 0; i < 4; i++) {
		multiArray[i]=new Array(4);
	}
	/*multiArray[2][1]= 'yellow';
	console.log(multiArray[2][1]);*/
	
}

function mostRecentColorsArray(snapshot){

	for(var i =0 ; i<4; i++ ){
		//console.log(i+'='+snapshot.child('0').child('0').val());
		for(var j=0; j<4; j++){
			multiArray[i][j] = snapshot.child(i).child(j).val();
		}
	}
	//console.log(multiArray);
}

function setUpGrid(Rcount, Ccount, multiArray) {

	var mainGridContainer = $(".main-grid-container");
	var temp = 0;
	var temp1 = 0;
	//console.log(multiArray);
	for (var i = 0; i < Rcount; i++) { // Row

		var newRow = $("<div class=\"single-row row-"+i+"\"></div>");

		//temp = i;

		for (var j = 0; j < Ccount; j++) {
		 // col
			var newCol = $("<div class=\"single-col "+j+"\"></div>");
			newCol.attr('id',j);
			console.log(i+'*'+ j +' =' +multiArray[i][j]);
			//console.log(multiArray[0][0]);
			newCol.css('background-color', multiArray[i][j]);
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

function intializingArray(multiArray){
	for(var i=0; i<4; i++){
		for(j=0; j<4; j++){
			multiArray[i][j] = 'yellow';
		}
	}
}

$(document).ready(function(){
	
	creatingMultiDimensionalArray(multiArray);

	dbRef.once('value', function(snapshot) {
  	if (snapshot.val() === null) {
    	//alert('exists');
    	intializingArray(multiArray);
    	dbRef.set(multiArray);
  	}
	});

	dbRef.on('value',mostRecentColorsArray);
	
	//console.log(multiArray);
	
	//dbRef.on('value',mostRecentColor);
	$(".btn-submit").on('click', function(){
		const Rcount=$('#row').val();
		const Ccount=$('#columnn').val();
		var gridSize = (Rcount * 50)-10;
		$('.main-grid-container').css('width', gridSize);
		if((Rcount <= 0 && (Ccount <= 0)) && ($.isNumeric(Rcount)) && ($.isNumeric(Ccount))){                           //To Manage Zero value input
			alert("Please enter a valid input");
		}
		else{
			setUpGrid(Rcount, Ccount,multiArray);
			attachColFunctions();
			//alert("else");
		}
	});

	$(".btn-cancel").on('click', function(){
		location.reload(true);
	});
});