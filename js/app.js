// wait for DOM to load before running JS
$(function() {
  // Make positions absolute
  old_positions = []
  $( "li" ).each(function(index, element) {
    old_positions.push({
      el: $(this),
      top: $(this).offset().top - $(this).parent().offset().top - parseInt($(this).parent().css('border-top-width')),
      left: $(this).offset().left - $(this).parent().offset().left - parseInt($(this).parent().css('border-left-width'))
    })
  });
  $.each(old_positions, function(index, old_position) {
    old_position.el.css({
      position: 'absolute',
      top: old_position.top,
      left: old_position.left,
    });
  });

  var grid = [];
  var i = 1;

  // the actual grid-making

  for (x of [0, 1, 2]){
    for (y of [0, 1, 2]){
      grid.push({
        row: x,
        column: y,
        value: i
      })
      // console.log("yo, at " + x + " and " + y + " is a " + i);
      i++;
      i = i % 9;
    }
  }

  var clicked = {};
  var empty = {};

  const animate = {
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
  }

  let swap = animate.TOP;

  function findEmpty() {
    emptyTile = grid.find(o => o.value == 0);
    return emptyTile;
  }

  function nearEmpty() {
    if (clicked.column == empty.column) {
      return (checkTop() || checkBottom());
    }
    else if (clicked.row == empty.row) {
      return (checkLeft() || checkRight());
    }
    return false;
  }

  function checkTop() {
    return ((clicked.row - 1) == empty.row);
  }

  function checkBottom() {
    return ((clicked.row + 1) == empty.row);
  }

  function checkLeft() {
    return ((clicked.column - 1) == empty.column);
  }

  function checkRight() {
    return ((clicked.column + 1) == empty.column);
  }

  function whichWay() {
    if (checkTop()){
      return animate.TOP;
    } else if (checkBottom()) {
      return animate.BOTTOM;
    } else if (checkRight()) {
      return animate.RIGHT;
    } else {
      return animate.LEFT;
    }
  }

  function updateGrid() {
    var swapValue = clicked.value;
    grid.find((o, i) => {
      if (o.row === clicked.row && o.column === clicked.column) {
        grid[i].value = empty.value;
        // console.log(grid[i]);
      }
    });
    grid.find((o, i) => {
      if (o.row === empty.row && o.column === empty.column) {
        grid[i].value = swapValue;
        // console.log(grid[i]);
      }
    });
  }

  $("li").click(function(){
    // $(this).css({
    //   position: 'absolute',
    //   top: $(this).position().top,
    //   left: $(this).position().left
    // });

    clicked = grid.find(o => o.value == parseInt($(this).text()));
    empty = findEmpty();
    if (nearEmpty()) {
        swap = whichWay();
        updateGrid();
        switch (swap) {
          case animate.TOP:
            $(this).animate({ "top": "-=67px" }, "slow" );
            break;
          case animate.BOTTOM:
            $(this).animate({ "top": "+=67px" }, "slow" );
            break;
          case animate.LEFT:
            $(this).animate({ "left": "-=67px" }, "slow" );
            break;
          case animate.RIGHT:
            $(this).animate({ "left": "+=67px" }, "slow" );
        }
    }
  });
});