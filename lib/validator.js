import Ajv from 'ajv/dist/2019.js';

import schema_cli from './schemas/schema_cli.json' assert { type: 'json' };
import schema_config from './schemas/schema_config.json' assert { type: 'json' };
import schema_selectors from './schemas/schema_selectors.json' assert { type: 'json' };
import schema_cookie from './schemas/schema_cookie.json' assert { type: 'json' };
import schema_localStorage from './schemas/schema_localStorage.json' assert { type: 'json' };
import schema_viewport from './schemas/schema_viewport.json' assert { type: 'json' };
import schema_before from './schemas/schema_before.json' assert { type: 'json' };

import logger from './logger.js';
import checks from './checks.js';

const ajv = new Ajv({ useDefaults: true });

ajv.addSchema(schema_cli, 'cli');
ajv.addSchema(schema_config, 'config');
ajv.addSchema(schema_selectors, 'selectors');
ajv.addSchema(schema_cookie, 'cookie');
ajv.addSchema(schema_localStorage, 'localStorage');
ajv.addSchema(schema_viewport, 'viewport');
ajv.addSchema(schema_before, 'before');

export { ajv };

export default function (tests) {
  logger
    .separate()
    .spinner('validate', logger.style('Validating files...', 'info'), {
      color: 'magenta',
    });

  for (const test of tests) {
    for (const file of checks.files) {
      const curr = test[file];
      if (!curr || curr._error) {
        continue;
      }

      const validate = ajv.getSchema(file);
      if (!validate(curr)) {
        test[file] = {
          _error: `Validation failed: ${ajv.errorsText(validate.errors)}`,
        };
      }
    }
  }

  logger.spinnerDone('validate');

  return tests;
}

export function getSchemaProps(name) {
  const validate = ajv.getSchema(name);

  return validate?.schema?.properties || {};
}

export function getSchemaPropsDefaults(name) {
  const props = getSchemaProps(name);
  const res = {};

  for (const key in props) {
    res[key] = props[key].default;
  }

  return res;
}
