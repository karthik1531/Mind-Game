dbRef = firebase.database().ref();

var multiArray = new Array(4);
var clickCount;
var matchScore;
var colors = new Array(10);
var matchColor =new Array(2);
var matchIndex=0;
var thisObjArray= new Array(2);
var objIndex=0;
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
					//console.log('hi');
				}
			newRow.attr('id',i);
			mainGridContainer.append(newRow);
		}
		resolve();
	});
}

function matched(rowId,colId){
	$("#colId").off('click')
};

function matchingColors(matchColor,thisObjArray){
	if (matchColor[0]==matchColor[1]) {
		alert('matched');
		for (var i = 0; i < 2; i++) {
			$(thisObjArray[i]).css('pointer-events', 'none');
		}
	}
	else{
		for (var i = 0; i < 2; i++) {
			console.log("false");
			$(thisObjArray[i]).css('background-color',"yellow");
			var  colId=$(thisObjArray[i]).attr('id');
			var rowId=$(thisObjArray[i]).parent().attr('id');
			console.log('rowID-');
			console.log(rowId);
			console.log('colid-');
			console.log(colId);
			dbRef.child(rowId).child(colId).set('yellow');
		}
	}
}

function revealingColors(rowId,colId,thisObj){
		var updateColor;
		console.log(colId);
		console.log(rowId);
		dbRef.once('value', function(snapshot) {
			//console.log('hello');
				updateColor=snapshot.child("colors").child(colId%10).val();
				console.log(updateColor);
				$(thisObj).css('background-color',updateColor);
				thisObjArray[objIndex]=thisObj;
				//console.log(matchIndex);
				matchColor[matchIndex]=updateColor
				console.log(thisObjArray);
				dbRef.child(rowId).child(colId).set(updateColor);
				setTimeout(function(){
					if(matchIndex==1){
						matchingColors(matchColor,thisObjArray);
						matchIndex=0;
						console.log('match');
						objIndex=0;
					}
					matchIndex++;
					objIndex++;
				},3000);
	});
		
}

let attachingCol = function(e){
	return new Promise(function(resolve,reject){
	//var matchColor = new Array(3);
	var prevRowID;
	var prevColID;
	$('.single-col').hover(function(){ 					//Mouse hover will increaase the block size and decreases if moved away
		$('.main-grid-container').css('width', 200); 
		$(this).css({ width: '50px', height: '50px' });
	} , function(){
			$('.main-grid-container').css('width', 190);
			$(this).css({ width: '40px', height: '40px' });
		});

	$('.single-col').on('click', function(e){
			console.log();
			var colId = $(e.target).attr('id');
			var rowId = $(this).parent().attr('id');
			$(this).addClass('borderClass');
			thisObj=$(this);
			revealingColors(rowId,colId,thisObj);
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
		const Rcount=4;
		const Ccount=4;
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
				clickCount = snapshot.child("clickCount").val();
				matchScore = snapshot.child("matchScore").val();
				//console.log(snapshot.child("colors").child(2).val());
				var i=0;
				while(i<10){
					//console.log("hi");
					colors[i]=snapshot.child("colors").child(i).val();  //Fetching colors from firebase
					i++;
				}
				//console.log(colors);
			});

		}
	$(".btn-cancel").on('click', function(){
		location.reload(true);
		});
	});
});