function func1() {
  var checkbox = document.getElementById('checkbox id');

  if (checkbox.checked) {
    alert('checkbox choosed')
  } else {
    alert('checkbox not choosed')
  }
}

function func2() {
  var elements = document.getElementsByName('r1');
  for (i = 0, { length: l } = elements; i < l; ++i) {
    var i;
    if (elements[i].checked === true) {
      console.log('element was checked');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var checkbox = document.querySelector('.my-checkbox');
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      console.log('element was checked');
    } else {
      console.log('element was not checked');
    }
  });
});
