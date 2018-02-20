$(document).ready(function(){
    var colors = ['blue','black','red','green','yellow','orange','pink','grey','voilet','white','purple'];
    //var count = 0;
    $("button").on('click', function(){
        alert(colors[3]);
        const Rcount=$('#row').val();
        const Ccount=$('#columnn').val();
        var $container = $("<div></div>").css("float","left");
        if((Rcount == 0 && Ccount==0)){                           //To Manage Zero value input
            alert("Please enter a valid input");
        }
        else{
            for (var i = 0; i < Rcount; i++) {
                for (var j = 0; j < Ccount; j++) {
                    $("<div></div>").addClass("grid").appendTo($container);
                    }
                 $("<div></div>").css("clear", "both").appendTo($container);
            }
            $container.appendTo($("p"));
        }
    });
  $('.box').on('click', function(){
     alert('hi');
     $(this).css('background-color', 'black');
    
  });
});

