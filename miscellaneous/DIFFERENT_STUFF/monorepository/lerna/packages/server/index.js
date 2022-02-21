const common = require('@workspaces/common');

const getMessage = (message) => message;

console.log({ common: getMessage(common().message) });
