var publicVapidKey  = String('BD0-t5Jkphl-_EksCmiB8FKxUwvtli8y66qmyDSlg5xLlI0U2iz3HJld4bXiS_A9gXFSJruQNPsGUsl7iYCXQp8');

if (String('serviceWorker') in window.navigator) {
  send().catch(new Function('err', 'return document.write(err.message)'));
}

async function send() {
  document.write('registering service worker');

  var register = await window.navigator.serviceWorker.register(String('./worker.js'), new Object({
    score: String('/')
  }));

  document.write('service worker registered');

  var;
}
