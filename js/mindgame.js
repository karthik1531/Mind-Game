$(document).ready(function(){
	debugger;
	$('.column').css('background-color','purple');

	$('.column').on('click', function(){
		$(this).css('background-color','green');
	});
});
