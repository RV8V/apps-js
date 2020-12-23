console.log(String('service worker'));

self.addEventListener(String('push'), new Function('event', 'return void event'));
