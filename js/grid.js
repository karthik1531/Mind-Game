dbRef = firebase.database().ref();

var multiArray = new Array(4);

function creatingMultiDimensionalArray(multiArray){
		for (var i = 0; i < 4; i++) {
		multiArray[i]=new Array(4);
	}
	}

let populatingColorsArray = function(snapshot){ 
	return new Promise(function(resolve,reject){
		
		for(var i =0 ; i<4; i++ ){
			//console.log(i+'='+snapshot.child('0').child('0').val());
			for(var j=0; j<4; j++){
				multiArray[i][j] = snapshot.child(i).child(j).val();
			}
		}
		if(multiArray != null){
			resolve();
		}
		else{
			reject(Error("broke"));
		}
		//console.log(multiArray);
	});
}

let populatingGrid =function(Rcount, Ccount, multiArray){
	return new Promise(function(resolve,reject) {
		var mainGridContainer = $(".main-grid-container");
	
		for (var i = 0; i < Rcount; i++) { // Row

			var newRow = $("<div class=\"single-row row-"+i+"\"></div>");

				for (var j = 0; j < Ccount; j++) {// col
					var newCol = $("<div class=\"single-col col-"+j+"\"></div>");
					newCol.attr('id',j);
				//console.log(i+'*'+ j +' =' +multiArray[i][j]);
				//console.log(multiArray[0][0]);
					newCol.css('background-color', multiArray[i][j]);
					newRow.append(newCol);
				}
			newRow.attr('id',i);
			mainGridContainer.append(newRow);
		}
		resolve();
	});
}

let attachingCol = function(e){
	return new Promise(function(resolve,reject){

	var colors = ['blue','black','red','green','yellow','orange','pink','grey','voilet','white','purple'];
	
		$('.single-col').on('click', function(e){
			console.log();
			var colId = $(e.target).attr('id');
			var rowId = $(this).parent().attr('id');

			if(($(this).css("background-color")) == "rgb(255, 255, 0)"){      //checking the background color of targetd grid is yellow or not
				var updateColor = colors[(colId%10)];
				$(e.target).css('background-color', updateColor);
				//console.log(row);
				dbRef.child(rowId).child(colId).set(updateColor);
			}
			else{
				var updateColor = 'yellow';
				$(e.target).css('background-color', updateColor);
				dbRef.child(rowId).child(colId).set(updateColor);
			}
		});
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

	dbRef.once('value', function(snapshot) {			//To check in firebase if grid already exists or not
	  if (snapshot.val() === null) {
	    intializingArray(multiArray);
	    dbRef.set(multiArray);
	  }
	});


	$(".btn-submit").on('click', function(){
		const Rcount=$('#row').val();
		const Ccount=$('#columnn').val();
		var gridSize = (Rcount * 50)-10;              						//calculting grid size based on input value
		$('.main-grid-container').css('width', gridSize);
		if((Rcount <= 0 && (Ccount <= 0)) && ($.isNumeric(Rcount)) && ($.isNumeric(Ccount))){      //To Manage Zero value input
			alert("Please enter a valid input");
		}
		else{
			dbRef.once('value', function(snapshot) {
				populatingColorsArray(snapshot).then(function(){
				 populatingGrid(Rcount,Ccount,multiArray).then(function(){
				 	attachingCol();
			});
			});

						//setUpGrid(Rcount, Ccount,multiArray);
			
		
			});
		}
	$(".btn-cancel").on('click', function(){
		location.reload(true);
		});
	});
});