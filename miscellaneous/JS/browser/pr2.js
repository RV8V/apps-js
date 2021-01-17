function change() {
  var sel = document.getElementById('my-select').selectedIndex;
  var options = document.getElementById('my-select').options;

  console.log({ options, sel })

  alert('choosed option: ' + options[sel].text);
}

document.getElementById('my-select')?.addEventListener('change', function(event) {
  // var sel = document.getElementById('my-select').selectedIndex;
  // var options = document.getElementById('my-select').options;

  var sel = event.target.selectedIndex;
  var options = event.target.options;

  console.log({ options, sel, event: event.target })

  alert('choosed option: (from addEventListener) ' + options[sel].text);
});

function func1(range) {
  document.getElementById('one').innerHTML = range.value;
}

document.getElementById('r1')?.addEventListener('input', function(event) {
  document.getElementById('i1').value = event.target.value;
  document.getElementById('test').style.width = event.target.value + 'px';
});
