import {readFileSync} from 'mz/fs';
import yaml from 'js-yaml';
import {join} from 'path';

export default yaml.safeLoad(readFileSync(join(__dirname, './swagger.yaml')));
