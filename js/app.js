// wait for DOM to load before running JS
$(function() {

  var grid = {};
  var i = 1;

  // the actual grid-making

  for (x in [0, 1, 2]){
    for (y in [0, 1, 2]){
      grid[x, y] = i;
      // console.log("yo, at " + x + " and " + y + " is a " + i);
      i++;
      i = i % 9;
    }
  }

   $("li").click(function(){
      $(this).css({
        position: 'absolute',
        top: $(this).position().top,
        left: $(this).position().left
      });
      $(this).animate({ "left": "+=67px" }, "slow" );
  });

});