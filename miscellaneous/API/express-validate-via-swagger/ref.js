'use strict';

const path = require('path');
const refs = require('refs');

const yamlOpenapiPath = process.cwd() + '/apidocs/index.yaml';
const swaggerOpenapiPath = process.cwd() + '/apidocs/swagger.yaml';

// const inputTemplate = path.resolve(`${templateDir}/template.yaml`);
// const outputFile = path.resolve(`${buildDir}/output-template.yaml`);

try {
  refs(yamlOpenapiPath, swaggerOpenapiPath)
    .then((results) => {
      console.log(`\n  File written: ${results.outputFile}`);
    });
} catch (e) {
  console.error(e.message);
  console.error(e.stack);
}
