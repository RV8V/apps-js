document.getElementById('nav').onmouseover = function(event) {
  var target = event.target;
  console.log({ name: target })
  if (target.className == 'menu-item') {
    var elements = document.getElementsByClassName('submenu');
    var nav = document.getElementById('nav');
    for (var i = 0; i < elements.length; ++i) {
      elements[i].style.display = 'none';
    }
  }
}
