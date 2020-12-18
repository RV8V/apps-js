
const http = require('http')
const port = 8000
const hostname = '127.0.0.1'

const server = http.createServer()
server.on('request', (req, res) => {
  console.log({ req, res })
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world\n')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})

server.on('error', err => err.code === 'EACCES' ?
 console.log(`no acess to port: ${port}`) : '')

//=====================================

const user = {
  name: 'Marcus Aurelius',
  city: 'Rome',
  profession: 'emperor'
}

const server = http.createServer()
server.on('request', (req, res) => {
  res.end(`${user.name} said... , it's from ${user.city}`)
})

server.on('error', err => console.log('closed'))

server.on('clientError', (err, socket) => {
  console.log({err, socket})
  socket.end('HTTP/1.1 400 Bad Request\n')
})

server.listen(8000)

//=====================================

const http = require('http')
const user = { name: 'John', age: 20 }

const routing = {
  '/': 'hello',
  '/user': user,
  '/user/name': () => user.name.toUpperCase(),
  '/user/age': () => user.age,
  '/number': user.age,
  '/hello': { hello: 'world', andAray: [1,2,3,4,5] },
  '/api/method1': (req, res) => {
    console.log(req.url + ' ' + res.statusCode)
    return { status: res.statusCode}
  },
  '/api/method2': req => ({
    user,
    url: req.url,
    cookies: req.headers.cookie
  }),
}

const types = {
  number: n => `NUMBER=== ${n + ''} ===NUMBER`,
  object: JSON.stringify,
  string: s => `** ${s} **`,
  undefined: () => 'not found',
  function: (fn, req, res) => JSON.stringify(fn(req, res)),
}

http.createServer((req, res) => {
  const data = routing[req.url]
  res.end(types[typeof data](data))
}).listen(8000)

setInterval(() => user.age++, 1000)

//===============================

const http = require('http');
const user = { name: 'jura', age: 22 };

const routing = {
  '/': 'welcome to homepage',
  '/user': user,
  '/user/name': () => user.name,
  '/user/age': () => user.age,
  // client is passed but never used
  '/user/*': (client, par) => 'parameter=' + par[0],
};

const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n + '',
  undefined: () => 'not found',
  function: (fn, par, client) => fn(client, par),
};

for (const key in routing) {
  if (key.includes('*')) {
    const rx = new RegExp(key.replace('*', '(.*)'));
    const route = routing[key];

    /* I did it like that because we have to make variable matching make global.
    * if it would be const [...matching] = [rx, route] it could not be seen in function route
    * i made it cause matching was two-dimential array
    */

    (function f() {return [...matching] = [rx, route]})();

    delete routing[key];
  }
}

const router = client => {
  let par;

  let route = routing[client.req.url];
  if (!route) {

    const rx = matching[0]
    par = client.req.url.match(rx);
    if (par) {
      par.shift();
      route = matching[1];
    }
  }

  /* Why do we have to check type of route
   if route is always 'function'? */

  const type = typeof route;
  const renderer = types[type];
  return renderer(route, par, client);
};
http.createServer((req, res) => {
  res.end(router({ req, res }) + '');
}).listen(8000);

//=======================

const http = require('http');

const user = { name: 'jura', age: 22 };

const routing = {
  '/': '<h1>welcome to homepage</h1><hr>',
  '/user': user,
  '/user/name': () => user.name.toUpperCase(),
  '/user/age': () => user.age,
  '/hello': { hello: 'world', andArray: [1, 2, 3, 4, 5, 6, 7] },
  '/api/method1': (req, res, callback) => {
    console.log(req.url + ' ' + res.statusCode);
    callback({ status: res.statusCode });
  },
  '/api/method2': req => ({
    user,
    url: req.url,
    cookie: req.headers.cookie,
  }),
};

const types = {
  object: ([data], callback) => callback(JSON.stringify(data)),
  undefined: (args, callback) => callback('not found'),
  function: ([fn, req, res], callback) => {
    if (fn.length === 3) fn(req, res, callback);
    else callback(JSON.stringify(fn(req, res)));
  },
};

const serve = (data, req, res) => {
  const type = typeof data;
  if (type === 'string') return res.end(data);
  const serializer = types[type];
  serializer([data, req, res], data => serve(data, req, res));
};

http.createServer((req, res) => {
  const data = routing[req.url];
  serve(data, req, res);
}).listen(8000);

setInterval(() => user.age++, 2000);

//======================

const http = require('http')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const user = { name: 'John', age: 20 }

const routing = {
  '/': 'hello',
  '/user': user,
  '/user/name': () => user.name,
}

const types = {
  object: JSON.stringify,
  string: s => s,
  function: (fn, req, res) => JSON.stringify(fn(req, res))
}

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`)
  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}`)
    cluster.fork()
  }
} else {
  console.log(`Worker process ${process.pid}`)
  http.createServer((req, res) => {
    const data = routing[req.url]
    const serialize = types[typeof data]
    //res.setHeader('Process-Id' process.pid)
    res.end(serialize(data, req, res))
  }).listen(2000)
}

//=======

/*
const net = require('net');

net.createServer(socket => {
  console.dir(socket.address());
  console.log({socket})
  socket.setNoDelay(true);
  socket.write('💗');
  socket.on('data', data => {
    console.log('📨:', data, '>>>');
  });
}).listen(2000);
*/

/*
const net = require('net');

const socket = new net.Socket();

socket.on('data', data => {
  console.log('📨:', data, '<<<');
});

socket.connect({
  port: 2000,
  host: '127.0.0.1',
}, () => {
  socket.write('💋');
});

socket.unref();
*/

/*

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  // обработаем HTTP-запрос.
});
server.listen(2000, function() { });

// создадим сервер
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket-сервер
wsServer.on('request', function(request) {
  console.log({request})
  var connection = request.accept(null, request.origin);
  console.log({connection})

  // коллбэк, где обрабатываются
  Это - самый важный для нас коллбэк, где обрабатываются
  // сообщения от клиента.
  connection.on('message', function(message) {
      // Обработаем сообщение WebSocket
  });

  connection.on('close', function(connection) {
    // Закрытие соединения
  });
});


*/

const routing = {
  '/api/user': name => users[name],
  '/api/userBorn': name => users[name].born
};
/*
http.createServer((req, res) => {
  const url = req.url.split('/');
  const par = url.pop();
  const method = routing[url.join('/')];
  const result = method ? method(par) : { error: 'not found' };
  res.end(JSON.stringify(result));
}).listen(8000);
*/
const url = '/api/user'
const urlChanged = url.split('/')
console.log(urlChanged.join('/'))






const http = require('http');

const ajax = (base, methods) => {
  const api = {};
  for (const method of methods) {
    api[method] = (...args) => new Promise((resolve, reject) => {
      const url = base + method + '/' + args.join('/');
      console.log(url);
      http.get(url, res => {
        console.log({ url })
        if (res.statusCode !== 200) {
          reject(new Error(`Status Code: ${res.statusCode}`));
        }
        const buffer = [];
        res.on('data', chunk => buffer.push(chunk));
        res.on('end', () => resolve(JSON.parse(buffer.join())));
      });
    });
  }
  return api;
};


const api = ajax(
  'http://localhost:8000/api/',
  ['user', 'userBorn']
);

api.user('marcus').then(data => console.log({ data }));

api.userBorn('mao').then(data => console.log({ data }));
