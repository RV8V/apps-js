'use strict';

const data = JSON.parse("[0, 1, 2]");
const type = data.type
console.log({ data, type })

//const handler = handlers[request.type] ?? handlers.default;

const o = { value: 20, name: 'john' }
//const num = o['value'] ?? o['name']

const CLI = class {
  #cli = 30
  #cli_h = 0
}

const exp = new CLI(30)


console.dir({ exp })

console.log('\n\n=======\n\n')

const commands = {
      ['/help']: () => {},
      ['/username']: newUsername => {},
      ['/exit']: () => {},
    };

const fn = line => {
      const trimmedLine = line.trim();
      console.log({ line, trimmedLine })
      const commandNames = Object.keys(commands);
      console.log({ commandNames })
      if (commandNames.some(c => trimmedLine.startsWith(c))) {
        const [command, ...args] = trimmedLine.split(' ');
        console.log({ command, args })
        commands[command](...args);
        return ;
      }

    }

fn('/help skdsd jsdj')
