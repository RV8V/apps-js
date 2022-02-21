const express = require('express');
// const YAML = require('yamljs');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
// const fs = require('fs');
const yaml = require('js-yaml');

const path = require('path');

var resolve = require('json-refs').resolveRefs;
var YAML = require('js-yaml');
var fs = require('fs');

// var root = YAML.load(fs.readFileSync(path.join(__dirname, './apidocs/index.yaml')).toString());
// var options = {
//   processContent: function (content) {
//     return YAML.load(content);
//   }
// };
//
// resolve(root, options).then(function (results) {
//   console.log(YAML.dump(results.resolved));
// });

// yaml.safeLoad(fs.readFileSync(path.join(__dirname, './apidocs/swagger.yaml')));

const validation = require('./middleware');

// const yamlOpenapiPath = process.cwd() + '/openapi/openapi.yml';
const yamlOpenapiPath = process.cwd() + '/apidocs/swagger.yaml';

console.log({ yamlOpenapiPath })

const jsonOpenapiFile = yaml.load(
  fs.readFileSync(yamlOpenapiPath, { encoding: 'utf-8' })
);

const openapi = YAML.load(yamlOpenapiPath);
const port = 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', swaggerUi.serve, swaggerUi.setup(openapi));

console.log({
  serve: swaggerUi.serve,
  openapiSetup: swaggerUi.setup(openapi),
  openapi,
});

app.post('/auth/register', async (req, res) => {
  console.log({ body: req.body });
  return res.json({ register: 'ok' });
});

app.post('/auth/login', async (req, res) => {
  return res.status(200).json({ login: 'ok' });
});

const start = async () => {
  await validation(app, jsonOpenapiFile);

  const server = app.listen(
    port,
    () => console.log`CORS-enabled web server listening on port ${port} \n`
  );
};

start();
