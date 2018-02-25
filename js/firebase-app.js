// var databaseRef=firebase.database().ref('users/');
var userRef = firebase.database().ref('users');
var count = 0;
var count;
userRef.on('value', gotData);
function gotData(data){
	var  key = Object.keys('users');
	console.log(key);
	console.log(data);
	//console.log(data.count);
	//var count=data.count;
}

$('#add-btn').on('click', function(){

	count=count+1;
	alert(count);
	var uid= userRef.push().key;
	var data = {
		userId: uid,
		count: count
	};

	var updates = {};
	//console.log(uid);

	updates['/users/' + uid] = data;

	//firebase.database().ref().update(updates);

	userRef.update(data);

});

// $('#sub').click(function(){
// 	count=count-1;
// 	alert(count);
// });