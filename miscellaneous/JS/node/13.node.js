var url = 'http://jsonplaceholder.typicode.com/users';

var sendRequest = function(method, url, body = null) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json';

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
      if (xhr.status >= 400) {
        reject(xhr.response);
      } else {
        resolve(JSON.parse(xhr.response));
      }
    }

    xhr.onerror = function(err) {
      reject(xhr.response);
    }

    xhr.send(JSON.stringify(body));
  })
}

sendRequest('GET', url, {
  name: 'jake'
})
  .then(function(data) {
    console.log({ data });
  }, function(err) {
    console.error(err.message);
  })

sendRequest = function(method, url, body) {
  return fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {'Content-Type', 'application/json'}
  }).then(function(response) {
    if (response.status <= 400) {
      return response.json();
    } else {
      return response.json().then(function(err) {
        var e = new Error('something wrong');
        e.data = err;
        throw e;
      });
    }
  });
}

sendRequest('BODY', url, {
  name: 'jake'
})
  .then(function(data) {
    console.log({ data });
  }, function(err) {
    console.error(err.message);
  })
