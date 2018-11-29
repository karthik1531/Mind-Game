dbRef = firebase.database().ref();

var multiArray = new Array(4);
var clickCount;
var matchScore=0;
var colors = new Array(10);
var matchColor =new Array(2);
var matchIndex=0;
var thisObjArray= new Array(2);
var objIndex=0;
var openedCards=[];
var updateColor;
var t1;
var t2;


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
		console.log("in grid");
		var table = document.getElementById("myTable");
		console.log("after table");
		for (var i = 0; i < Rcount; i++) { // Row
			console.log("in loop",i);
			var newRow = table.insertRow(i);
			newRow.setAttribute("id",i);
				for (var j = 0; j < Ccount; j++) {// 
					console.log("in second loop",j);
					var newCol = newRow.insertCell(j);
					newCol.setAttribute("id",j);
					newCol.setAttribute("class",'Col_'+j+i);
					Attrb=newCol.getAttribute('class');
					console.log('attrib',Attrb);
					//console.log("after attrib");
				//console.log(i+'*'+ j +' =' +multiArray[i][j]);
				console.log(multiArray[i][j]);
				//console.log(addUpValuei,addUpValuej);
				$("."+Attrb).css('background-color', multiArray[i][j]);
					//newRow.append(newCol);
					//console.log('hi');
				}
			
			//table.append(newRow);
		}
		resolve();
	});
}

function rePopulatingGrid(multiArray){
	var table=document.getElementById('myTable');
	console.log("inrepopulate");
	for (var i = 0, row; row = table.rows[i]; i++) {
		console.log("in row");
		for(var j = 0, col; col = row.cells[j]; j++){
			console.log(multiArray);
			//var temp=table[i].cells;
			//console.log(temp);
			col.style.backgroundColor=multiArray[i][j];
		}
		
	}
}

function revertColors(openedCards){
	
setTimeout(function() {

	for (var i = 0; i < 2; i++) {
			//console.log("false");
			$(openedCards[i]).css('background-color',"yellow");
	}
	openedCards.length=0;
}, 2000);	
}

function matched(openedCards){
		alert('matched');
		matchScore ++;
		for (var i = 0; i < 2; i++) {
			$(openedCards[i]).css('pointer-events', 'none');
		}
	openedCards.length=0;
	console.log(matchScore);
}
function unmatched(openedCards){
		revertColors(openedCards);
		for (var i = 0; i < 2; i++) {
			//console.log("false");
			//$(openedCards[i]).css('background-color',"yellow");
			var  colId=$(openedCards[i]).attr('id');
			var rowId=$(openedCards[i]).parent().attr('id');
			console.log('rowID-');
			console.log(rowId);
			console.log('colid-');
			console.log(colId);
			$(openedCards[i]).removeClass('borderClass');
			dbRef.child(rowId).child(colId).set('yellow');
		}
	
}

let gettingColors= function(colId){ 
		return new Promise(function(resolve,reject) {
	//var updateColor;
		console.log(colId);
			//console.log(rowId);
		dbRef.once('value', function(snapshot) {
				//console.log('hello');
			updateColor=snapshot.child("colors").child(colId%10).val();
			t2=performance.now();
			console.log("ping = ",(t2-t1)+"MilliSeconds");
			resolve();
					
		});
		
	});
}




function checkForMatching(openedCards){
	var color=$(openedCards[0]).css("background-color");
	//console.log(openedCards[1].style.backgroundColor);
	console.log(color);
	//matchColor.push(color);
	if(openedCards.length >=2){
		if($(openedCards[0]).css("background-color") === $(openedCards[1]).css("background-color")){
			matched(openedCards);
		}
		else{
			unmatched(openedCards);
		}
	}
}

/*function backgroundUpdate(updateColor,thisObj){
	console.log("in background-color");
	dbRef.on(value,function(snapshot){
		console.log("in running color");
		$(thisObj).css('background-color',updateColor);
		console.log("after");
	});
}
*/
function attachingColor(updateColor,thisObj,rowId,colId){
	console.log("inattachcolor",updateColor);
	$(thisObj).css('background-color',updateColor);
	dbRef.child(rowId).child(colId).set(updateColor);
	var  classref=$(thisObj).attr('id');
	//backgroundUpdate(updateColor,thisObj);
	openedCards.push(thisObj);
	setTimeout(function() {
		checkForMatching(openedCards);
	}, 50);
	
}



let attachingCol = function(e){
	return new Promise(function(resolve,reject){
	//var matchColor = new Array(3);
	
	$('td').hover(function(){ 					//Mouse hover will increaase the block size and decreases if moved away
		$('#myTable').css('width', 210); 
		$(this).css({ width: '50px', height: '50px' });
	} , function(){
			$('.myTable').css('width', 203);
			$(this).css({ width: '40px', height: '40px' });
		});

	$('td').on('click', function(e){
			//console.log();
			//click=click+1;
			var colId = $(e.target).attr('id');
			var rowId = $(this).parent().attr('id');
			$(this).addClass('borderClass');
			thisObj=$(this);
			t1=performance.now();
			gettingColors(colId).then(function(){
				attachingColor(updateColor,thisObj,rowId,colId);
			});

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
		var gridSize = (Rcount * 55)-17;              						//calculting grid size based on input value
		$('#myTable').css('width', gridSize);
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
				dbRef.on('value', function(snapshot){
					console.log("IN new func");

					populatingColorsArray(snapshot).then(function(){
						rePopulatingGrid(multiArray);
					});
					//console.log(multiArray);

				});
		});

		}
		
	});
	$(".btn-cancel").on('click', function(){
		location.reload(true);
		});
	
});