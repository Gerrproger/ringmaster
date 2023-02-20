import fs from 'node:fs/promises';
import path from 'node:path';

import logger from './logger.js';
import checks from './checks.js';

export default async function (dirs) {
  const tests = [];

  const fileContent = async (path) => {
    try {
      const handler = await fs.open(path, 'r');
      const content = await handler.readFile({ encoding: 'utf8' });
      await handler.close();
      const envContent = replaceEnvs(content);
      return JSON.parse(envContent);
    } catch (e) {
      if (e.message.match(/^ENOENT/)) {
        return null;
      }
      return {
        _error: e.message,
      };
    }
  };

  const populateFiles = async (dir) => {
    const ret = {};
    for (const file of checks.files) {
      ret[file] = await fileContent(path.join(dir, `${file}${checks.ext}`));
    }
    return ret;
  };

  const replaceEnvs = (content) => {
    const regex = /%[a-zA-Z_][a-zA-Z0-9_]*%/g;
    const envs = content.match(regex);
    if (!envs || !envs.length) {
      return content;
    }

    for (const env of envs) {
      const value = process.env[env.slice(1, -1)];
      if (!value) {
        throw new Error(`Environment variable ${env} not found`);
      }
      content = content.replace(env, value);
    }
    return content;
  };

  const walker = async (list) => {
    for (const dir of list) {
      try {
        const dirents = await fs.readdir(dir, { withFileTypes: true });
        const config = dirents.filter(
          (ent) => ent.name === `${checks.entry}${checks.ext}` && ent.isFile()
        )[0];

        if (config) {
          tests.push({
            path: dir,
            ...(await populateFiles(dir)),
          });
        }
        await walker(
          dirents
            .filter((ent) => ent.isDirectory())
            .map((ent) => path.join(dir, ent.name))
        );
      } catch (e) {
        tests.push({
          path: dir,
          _error: e.message.match(/^ENOENT/) ? 'No such directory' : e.message,
        });
      }
    }
  };

  logger.separate().spinner('scan', logger.style('Scanning files...', 'info'), {
    color: 'magenta',
  });

  await walker(dirs);

  logger.spinnerDone('scan');

  return tests;
}
