// var databaseRef=firebase.database().ref('users/');
// var userRef = firebase.database().ref('users/');

var count=0;

$('#add').on('click', function(){

	count=count+1;
	alert(count);

	var data = {
		count: count
	};

	var updates = {};

	updates['/users/'] = data;

	firebase.database().ref().update(updates);

	// userRef.update(data);

});

// $('#sub').click(function(){
// 	count=count-1;
// 	alert(count);
// });