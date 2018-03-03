var dbRef = firebase.database().ref();
var countRef = firebase.database().ref('count');

function mostRecentCountSnapshot(snapshot){
		
	var data = snapshot.val();
	var count = data;
	$('#current-count').text(''+count);
	
};

function listenForChanges(){
	countRef.on('value', mostRecentCountSnapshot);
}

function updateValue(newValue){
	//var uid= usRef.push().key;
	var newData = {
		count:newValue
	};
	dbRef.update(newData);
}

function addData(count){
	count=count+1;
	updateValue(count);
};

function subData(count){
	count=count-1;
	updateValue(count);
};

$(document).ready(function(){
	
	listenForChanges();


	$('#add-btn').on('click', function(){
		
		countRef.once('value').then(function oneTimeData(snapshot){
			var presentValue = snapshot.val();
			addData(presentValue);
		});
		
	});

	$('#sub-btn').on('click', function(){
		
		countRef.once('value').then(function oneTimeData(snapshot){
			var presentValue = snapshot.val();
			subData(presentValue);
		});
		
});
	
});