var databaseRef=firebase.database().ref('users/');
var count=0;
$('#add').on('click', function(){
	alert('hi');
	count=count+1;
  alert(count);
  var data = {
  	count : count
  }
  var updates = {};
  updates['/users/']= data;
  firebase.database().ref.update(updates);
});
$('#sub').click(function(){
	count=count-1;
  alert(count);
});
