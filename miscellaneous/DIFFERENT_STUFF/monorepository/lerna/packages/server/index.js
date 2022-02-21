const common = require('@workspaces/common');
const getMessage = (message) => message;

console.dir({ common: getMessage(common().message) });
