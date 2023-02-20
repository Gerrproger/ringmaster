import path from 'node:path';

import { generateId } from './id.js';
import logger from './logger.js';
import checks from './checks.js';
import defaults from './defaults.js';
import tester from './tester.js';

export default async function (overrideSets, tests) {
  if (!tests) {
    tests = overrideSets;
  }

  const testsLength = tests.length;
  let errorsCounter = 0;
  let testInd = 1;

  const errorsWalker = (items) => {
    if (typeof items !== 'object') {
      return;
    }
    for (const key in items) {
      const item = items[key];
      if (item && item._error) {
        errorsCounter++;
      }

      item && errorsWalker(item);
    }
  };

  errorsWalker(tests);

  logger
    .separate()
    .spinner('launch', logger.style('Launching Test Suits...', 'info'), {
      color: 'magenta',
    })
    .text('Found test suits: ', { color: 'cyan' })
    .text(testsLength, 'bold')
    .newline();

  if (errorsCounter) {
    logger
      .text(errorsCounter, { color: 'red', bold: true })
      .text(
        ' errors found during loading and validating config files!',
        'error'
      )
      .newline()
      .beep();
  }

  for (const test of tests) {
    const suitId = `suit${generateId()}`;

    logger
      .separate()
      .newline()
      .spinner(
        suitId,
        `${logger.style('Running test suit: ', {
          color: 'blueBright',
        })}${logger.style(`${testInd++}/${testsLength}`, 'bold')}`,
        { color: 'blueBright' }
      );

    if (test._error) {
      logger
        .spinnerDone(suitId)
        .text(
          'Critical error found during loading and validating test suit: ',
          'error'
        )
        .text(test._error, 'bold')
        .newline()
        .text('Directory path: ')
        .text(test.path, 'bold')
        .newline();

      continue;
    }

    const entry = test[checks.entry];

    if (entry._error) {
      logger
        .spinnerDone(suitId)
        .text(
          'Critical error found during loading and validating config file: ',
          'error'
        )
        .text(entry._error, 'bold')
        .newline()
        .text('File name: ')
        .text(`${checks.entry}${checks.ext}`, 'bold')
        .newline()
        .text('Directory path: ')
        .text(test.path, 'bold')
        .newline();

      continue;
    }

    logger
      .text('Name: ', { color: 'yellow' })
      .text(entry.name, 'bold')
      .newline()
      .text('Directory path: ')
      .text(test.path, 'bold')
      .newline();

    entry.executable = path.resolve(
      entry.executable || defaults.executablePath[process.platform] || ''
    );
    entry.output =
      entry.output === false
        ? false
        : path.resolve(
            entry.output || path.join(defaults.folderResults, entry.name)
          );
    entry.viewport = entry.viewport || defaults.config.viewport;
    entry.cookies = entry.cookies || [];
    entry.localStorage = entry.localStorage || [];

    for (const key in overrideSets) {
      entry[key] = overrideSets[key];
    }

    test._result = await tester(test);

    logger.spinnerDone(suitId);
  }

  logger.spinnerDone('launch');

  return tests;
}
