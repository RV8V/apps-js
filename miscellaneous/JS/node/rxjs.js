;var {interval, of, from, Observable} = require('rxjs'),
     {filter, map, take, scan} = require('rxjs/operators');

var button = window.document.getElementById('interval'),
    rxjsButton = window.document.getElementById('rxjs'),
    display = window.document.getElementsByClassName('result');

var people = new Array(
  {name: 'jake', age: 34});

button.addEventListener('click', function() {
  button.disabled = true;

  var i;
  var result = new Array();
  var _interval = global.setInterval(function() {
    if (people[i]) {
      if (people[i].fullName) {
        result.push(people[i].fullName);
      }
      display.textContent = result.join(' ');
      i++;
    } else {
      global.clearInterval(_interval);
      button.disabled = false;
    }
  }, 1000);
});

rxjsButton.addEventListener('click', function() {
  rxjsButton.disabled = true;

  interval(1000)
    .pipe(
      take(people.length),
      filter(function(value) {
        return !!people[value].fullName;
      }),
      map(function(value) {
        return people[value].fullName;
      }),
      scan(function(acc, value) {
        return acc.concat(value)
      }, []);
    )
    .subscribe(function(result) {
      display.textContent = result.join();
    }, void 2, function() {
      rxjsButton.disabled = false;
    });
});

var stream = of(1, 3, 4, 'test', 'string');

stream.subscribe(function(value) {
  process.stdout.write('value: ' + value);
});

var arr = from([1, 3, 4, 5]).pipe(
  scan(function(acc, value) {
    return acc.concat(value)
  }, []);
);

arr.subscribe(function(value) {
  process.stdout.write(value);
}, function(err) {
  process.stderr.write(err.message);
}, function() {
  process.stdout.write('stream ended its work');
});

stream = new Observable(function(observer) {
  observer.next('first value');
  global.setTimeout(function() {
    return observer.next('in timer function, value');
  }, 100);

  observer.error('something went wrong');
  observer.complete(void 9);
});

stream.subscribe(new Object({
  next: function() {
  },
  error: function() {
  },
  complete: function() {
  }
}));
