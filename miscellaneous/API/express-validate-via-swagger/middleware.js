const Ajv = require('ajv');
const pathToRegexp = require('path-to-regexp');
const jsrp = require('@apidevtools/json-schema-ref-parser');

module.exports = async (app, jsonOpenapiFile) => {
  const dereferencedOpenapiFile = await jsrp.dereference(jsonOpenapiFile);
  const paths = dereferencedOpenapiFile.paths;

  const pathsMatchFunctions = Object.keys(paths).map((path) => [
    path,
    pathToRegexp.match(path),
  ]);

  app.use((req, res, next) => {
    const pair = pathsMatchFunctions.find(([, match]) => match(req.path));

    if (!pair) throw new Error('Validation error: no such path');

    const [path, matchFn] = pair;
    const validMethods = [
      'get',
      'head',
      'post',
      'put',
      'delete',
      'connect',
      'options',
      'trace',
      'patch',
    ];
    const method = req.method.toLowerCase();

    if (!validMethods.includes(method))
      throw new Error(
        `Validation error: method is not valid, happened while calling for: ${path}`
      );

    const { parameters, requestBody } = paths[path][method];
    const ajv = new Ajv({ coerceTypes: true });
    const validator = new Validator(ajv);

    if (parameters) {
      const queryParameters = parameters.filter((p) => p.in === 'query');
      const pathParameters = parameters.filter((p) => p.in === 'path');

      if (pathParameters.length) {
        const { params } = matchFn(req.originalUrl);
        for (const parameterDescriptor of pathParameters) {
          const parameter = params[parameterDescriptor.name];
          if (!parameter)
            throw new Error(
              `Validation error: path parameter named ${parameterDescriptor.name} was not passed, path parameters always required, happened while calling for: ${path}`
            );
          validator.validate(parameterDescriptor.schema, parameter);
        }
      }

      if (queryParameters.length) {
        for (const parameterDescriptor of queryParameters) {
          const parameter = req.query[parameterDescriptor.name];

          if (parameterDescriptor.required && parameter === undefined) {
            throw new Error(
              `Validation error: query parameter named: ${parameterDescriptor.name} was not passed while being required, happened while calling for: ${path}`
            );
          } else if (!parameterDescriptor.required && parameter === undefined) {
            console.warn(
              FgYellow,
              `Validation warning: query parameter named: ${parameterDescriptor.name} was not passed but it is not required, happened while calling for: ${path}`
            );
          }

          if (parameter)
            validator.validate(parameterDescriptor.schema, parameter);
        }
      }
    }

    if (requestBody) {
      if (requestBody.required && req.body === undefined)
        throw new Error(
          `Validation error: request body was not provided but it is required, happened while calling for: ${path}`
        );

      const contentType = req.headers['content-type'];

      if (!contentType)
        throw new Error(
          `Validation error: content-type header was not specified, happened while calling for: ${path}`
        );

      const schemaForContentType = requestBody.content[contentType];
      if (!schemaForContentType)
        throw new Error(
          `Validation error: content-type ${contentType} can not be accepted, happened while calling for: ${path}`
        );

      validator.validate(schemaForContentType.schema, req.body);
    }

    next();

    // if (responses) {
    //   const [status, value]: any[] = Object
    //     .entries(responses)
    //     .flat()
    //   if (value.content) {
    //     const [header, schema] = Object
    //       .entries(value.content)
    //       .flat()
    //     if (header !== req.headers["Content-Type"]) {
    //       // throw new Error("Validation error: no application/json description is provided")
    //     }
    //     validator.validate(schema, req.body)
    //   }
    // }
  });
};

class Validator {
  constructor(ajv) {}

  validate(schema, data) {
    const valid = this.ajv.validate(schema, data);
    if (!valid) {
      let msg = '';

      if (!this.ajv.errors) throw new Error('ajv behave unexpectedly');
      for (const err of this.ajv.errors)
        msg += `${err.dataPath}  ${err.message}\n`;
      throw new Error(`Validation Error: ${msg}`);
    }
  }
}
