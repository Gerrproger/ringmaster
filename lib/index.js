import path from 'node:path';
import dotenv from 'dotenv';
import inquirer from 'inquirer';
import inquirerDir from 'inquirer-select-directory';
import { Command } from 'commander';

import pjson from '../package.json' assert { type: 'json' };

import { ajv } from './validator.js';
import defaults from './defaults.js';
import logger, { criticalText } from './logger.js';
import browsersCount from './browsers-count.js';
import loader from './loader.js';
import validator from './validator.js';
import launcher from './launcher.js';
import resulter from './resulter.js';

dotenv.config();

export { ringmaster };

export default async function ringmaster(
  dirs = [],
  opts = {},
  needLogs = false
) {
  const pipe =
    (...fns) =>
    (arg) =>
      fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

  if (!needLogs) {
    logger.disable();
  }

  logger.spinner('start', logger.style('Starting...', 'info'), {
    color: 'magenta',
  });

  const validate = ajv.getSchema('cli');

  if (!validate({ dirs, opts })) {
    const errText = ajv.errorsText(validate.errors);

    logger
      .spinnerDone('start')
      .text('Citical error found in your params: ', 'error')
      .text(errText, 'bold')
      .newline(2);

    return {
      error: errText,
      suits: [],
    };
  }

  if (!dirs.length) {
    dirs = [defaults.folderTests];
  }

  const resolvedDirs = dirs.map((dir) => path.resolve(dir));

  logger.spinnerDone('start');

  const result = await pipe(
    loader,
    validator,
    launcher.bind(this, opts),
    resulter
  )(new Set(resolvedDirs));

  logger
    .newline()
    .separate()
    .text('Finished.', 'info')
    .separate('yellowBright');

  return result;
}

export async function cli(argv) {
  const program = new Command();

  const interaction = async (dirs, opts) => {
    const dirPrompt = {
      type: 'directory',
      name: 'dir',
      message: 'Select directory with the tests configs:',
      basePath: './',
    };
    const outPrompt = {
      type: 'directory',
      name: 'dir',
      message: 'Select output directory for results:',
      basePath: './',
    };
    const choicesPrompt = {
      type: 'checkbox',
      name: 'overrides',
      message: 'Select settings which you want to override:',
      choices: [],
    };

    const choices = [
      {
        name: 'headless',
        default: defaults.config.headless,
        type: 'confirm',
      },
      {
        name: 'muted',
        default: defaults.config.muted,
        type: 'confirm',
      },
      {
        name: 'close',
        default: defaults.config.close,
        type: 'confirm',
      },
      {
        name: 'view',
        default: defaults.config.view,
        type: 'confirm',
      },
      {
        name: 'executable',
        default: defaults.executablePath[process.platform] || '',
        type: 'input',
      },
      {
        name: 'timeout',
        default: defaults.config.timeout,
        type: 'number',
      },
      {
        name: 'output',
        default: true,
        type: 'confirm',
      },
    ];

    inquirer.registerPrompt('directory', inquirerDir);

    try {
      if (!dirs.length) {
        const answers = await inquirer.prompt(dirPrompt);
        dirs.push(answers.dir);
      }

      for (const choice of choices) {
        if (Object.prototype.hasOwnProperty.call(opts, choice.name)) {
          continue;
        }

        choicesPrompt.choices.push(choice);
      }

      if (choicesPrompt.choices.length) {
        const answers = await inquirer.prompt(choicesPrompt);

        for (const opt of answers.overrides) {
          const answers = await inquirer.prompt(
            choices.filter((choice) => choice.name === opt)
          );

          if (opt !== 'output' || answers.output === false) {
            opts[opt] = answers[opt];
            continue;
          }

          const answersOut = await inquirer.prompt(outPrompt);
          opts.output = answersOut.dir;
        }
      }
    } catch (e) {
      return e.message;
    }
  };

  const run = async (dirs, opts) => {
    const interactive = opts.interactive;
    if (opts.sample) {
      dirs.push(defaults.folderSample);
    }

    if (opts.dir) {
      dirs = dirs.concat(opts.dir);
    }

    if (opts.timeout) {
      opts.timeout = Number.parseInt(opts.timeout, 10);
    }

    if (interactive) {
      logger
        .text('Interactive mode activated.', { color: 'cyan' })
        .separate()
        .pause();

      const err = await interaction(dirs, opts);

      logger.resume();

      if (err) {
        logger.text(criticalText, 'error').text(err, 'bold').newline(2);
        return;
      }
    }

    delete opts.dir;
    delete opts.sample;
    delete opts.interactive;

    await ringmaster(dirs, opts, true);

    if (interactive || browsersCount.hasActive) {
      await logger.waitInteraction('Press any key to exit...');
    }

    process.exit();
  };

  logger
    .clear()
    .separate('yellowBright')
    .text(`${pjson.name} v${pjson.version}`, { color: 'yellowBright' })
    .separate();

  program
    .configureOutput({
      writeOut: (str) => logger.log(str),
      writeErr: (str) => logger.log(str),
    })
    .version(pjson.version, '--version')
    .name(Object.keys(pjson.bin)[0])
    .usage('[dirs...] [options]')
    .argument('[dirs...]', 'paths to dirs with the tests configs')
    .option('-d, --dir <dirs...>', 'paths to dirs with the tests configs')
    .option('-s, --sample', 'use the bundled sample test config')
    .option('-e, --executable <path>', 'path to the Chromium executable')
    .option('-t, --timeout <milliseconds>', 'timeout for tests execution')
    .option(
      '-v, --view',
      'open view results html file in browser after testing'
    )
    .option('-V, --no-view', 'do not open view results html file')
    .option('-i, --interactive', 'Launch library with interactive wizard')
    .option('-I, --no-interactive', 'Launch library without interactive wizard')
    .option('-o, --output <path>', 'path to the results output dir')
    .option('-O, --no-output', 'do not create results files')
    .option('-h, --headless', 'run the browser in headless mode')
    .option('-H, --no-headless', 'run the browser in standard (windowed) mode')
    .option('-m, --muted', 'mute the browser')
    .option('-M, --no-muted', 'unmute the browser')
    .option(
      '-c, --close',
      'close the browser after tests are done (for standard mode)'
    )
    .option(
      '-C, --no-close',
      'do not close the browser after tests are done (for standard mode)'
    )
    .showHelpAfterError('use --help to display help for commands')
    .action(run);

  program.parse(Array.isArray(argv) ? argv : process.argv);
}

export function makeInteractive(argv) {
  argv = Array.isArray(argv) ? argv : process.argv;

  if (
    ['-i', '-I', '--interactive', '--no-interactive'].every(
      (item) => !argv.includes(item)
    )
  ) {
    argv.push('-i');
  }

  return argv;
}
