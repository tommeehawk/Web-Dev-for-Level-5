var selected;
var parent;
var pid;
var options = [];
var whiteMove = true;
var whitePieces = 12;
var blackPieces = 12;
$(document).ready(function() {
  function getOptions(color, row, col, isKing) {
    var option;
    if (color === "rgb(255, 255,255)" || isKing) {
      option = $('#' + (row + 1) + '_' + (col - 1));
      if (option.is(':parent')) {
        if (option.children().first().css('background - color') !== color &&
          !$('#' + (row + 2) + '_' + (col - 2)).is(':parent')) {
          option = $('#' + (row + 2) + '_' + (col - 2));
          options.push(option);
        }
      } else {
        options.push(option);
      }
      option =
        $('#' + (row + 1) + '_' + (col + 1));
      if (option.is(':parent')) {
        if (option.children().first().css('background - color') !== color &&
          !$('#' + (row + 2) + '_' + (col + 2)).is(':parent')){
option = $('#' + (row + 2) + '_' + (col + 2));
        options.push(option);
      }
    } else {
      options.push(option);
    }
  }
  if (color === "rgb(0, 0, 0)"
    || isKing) {
    option = $('#' + (row - 1) + '_' + (col - 1));
    if (option.is(':parent')) {
      if (option.children().first().css('background - color') !== color &&
!$('#' + (row - 2) + '_' + (col - 2)).is(':parent')){
option = $('#' + (row - 2) + '_' + (col - 2));
      options.push(option);
    }
  } else {
    options.push(option);
  }
  option = $('#' + (row - 1) + '_' + (col + 1));
  if (option.is(':parent')) {
    if (option.children().first().css('background - color') !== color &&!$('#'+(row-2)+'_'+(col+2)).is(': parent')){
option = $('#' + (row - 2) + '_' + (col + 2));
    options.push(option);
  }
}else {
  options.push(option);
}
}
for (var i = 0;
  i < options.length; i++) {
  options[i].css("background-color", "yellow");
}
}
function
  optionHelper(clickedPiece) {
  selected = clickedPiece;
  var isKing = false;
  clearOptions()
  parent = selected.parent();
  pid = parent.attr("id").split('_');
  if (selected.is(':parent')) {
    isKing = true;
  }
  getOptions(selected.css("backgroundcolor"),
    parseInt(pid[0]), parseInt(pid[1]), isKing);
}
function clearOptions() {
  for (var i =
    options.length - 1; i >= 0; i--) {
    options[i].css("background-color", "red");
options.splice(i, 1)
}
}
function checkSkip(oldRow,
  oldCol, newRow, newCol) {
  if (oldRow - newRow == 2) {
    if (oldCol - newCol == -2) {
      $('#' + (oldRow - 1) + '_' + (oldCol + 1)).emp
      ty();
    } else {
      $('#' + (oldRow - 1) + '_' + (oldCol - 1)).emp
      ty();
    }
    return true;
  } else if (oldRow - newRow ==
    -2) {
    if (oldCol - newCol == -2) {
      $('#' + (oldRow + 1) + '_' + (oldCol + 1)).emp
      ty();
    } else {
      $('#' + (oldRow + 1) + '_' + (oldCol - 1)).emp
      ty();
    }
    return true;
  }
}
function changeText() {
  if (blackPieces == 0) {
    $('#turn').html("White Wins!");
  } else if (whitePieces == 0) {
    $('#turn').html("Black Wins!");
  } else {
    if (whiteMove) {
      $('#turn').html("White Move");
    } else {
      $('#turn').html("Black Move");
    }
  }
}
$("#start").click(function() {
  $(this).hide();
  $('#turn').html("White Move");
  var id;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8;
      j++) {
      if ((i + j) % 2 == 0) {
        $("#squares").append($("<div>", {
          class: "white square"
        }));
      } else {
        id = i + '_' + j;
        $("#squares").append($("<div>", {
          class: "red square", id: id
        }));
        if (i <= 2) {
          $("#" + id).append($("<div>", {
            class: "white piece"
          }));
        } else if (i >=
          5) {
          $("#" + id).append($("<div>", {
            class: "black piece"
          }));
        }
      }
    }
  }
  $(".white.piece").click(function() {
    if (whiteMove) {
      optionHelper($(this));
    }
  });
  $(".black.piece").click(function() {
    if (!whiteMove) {
      optionHelper($(this));
    }
  });
  $(".red.square").click(function() {
    if
      ($(this).css('background-color') ==
      "rgb(255, 255, 0)") {
      $(this).append(selected);
      var id =
        $(this).attr("id").split('_');
      if (checkSkip(parseInt(pid[0]), parseInt(pid[1]), parseInt(id[0]), parseInt(
        id[1]))) {
        if (whiteMove) {
          blackPieces--;
        } else {
          whitePieces--;
        }
      }
      if (parseInt(id[0])
        == 0 || parseInt(id[0]) == 7 &&
        !selected.is(':parent')) {
        selected.append("<p class= 'king' > K</p > ");
      }
      clearOptions();
      whiteMove =
        !whiteMove;
      changeText();
    }
  });
});
});