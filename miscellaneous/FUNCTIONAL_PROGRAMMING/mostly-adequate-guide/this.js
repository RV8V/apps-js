const fs = require('fs');

// страшновато
fs.readFile('freaky_friday.txt', Db.save);

// не так страшно
fs.readFile('freaky_friday.txt', Db.save.bind(Db));
