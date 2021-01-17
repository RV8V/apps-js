function func1() {
  var range_left_up = document.getElementById('range id 1 up-left').value;
  var range_right_up = document.getElementById('range id 2 up-rigth').value;
  var range_right_down = document.getElementById('range id 3 down-rigth').value;
  var range_left_dowm = document.getElementById('range id 4 down-left').value;

  var text_left_up = document.getElementById('text 1 up-left');
  var text_right_up = document.getElementById('text 2 up-rigth');
  var text_right_down = document.getElementById('text 3 down-rigth');
  var text_left_down = document.getElementById('text 4 down-left');

  var block = document.getElementById('block');

  text_left_up.value = range_left_up;
  text_right_up.value = range_right_up;
  text_right_down.value = range_right_down;
  text_left_down.value = range_left_dowm;

  block.style.borderRadius = range_left_up + 'px ' + range_right_up + 'px ' + range_right_down + 'px ' + range_left_dowm + 'px';
}

function fun2() {

}

document.addEventListener('DOMContentLoaded', function() {
  var get = new Object({
    range: document.getElementsByClassName('range'),
    text: document.getElementsByClassName('text'),
    block: document.getElementById('block')
  });

  for (var i = 0; i < get.range.length; ++i) {
    get.range[i].addEventListener('change', function() {
      var number = get.range[i].value;
      get.text[i].value = number;
      switch (i) {
        case 0: get.block.style.borderTopLeftRadius = number + 'px'; break;
        case 1: get.block.style.borderTopRightRadius = number + 'px'; break;
        case 2: get.block.style.borderBottomRightRadius = number + 'px'; break;
        case 3: get.block.style.borderBottomLeftRadius = number + 'px'; break;
      }
    });
  }
});
