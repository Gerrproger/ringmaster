import fs from 'node:fs/promises';
import crypto from 'node:crypto';
import path from 'node:path';
import open from 'open';

import { generateId } from './id.js';
import defaults from './defaults.js';
import logger, { criticalText } from './logger.js';
import checks from './checks.js';

export default async function (tests) {
  const writeResults = async (test) => {
    try {
      const content = JSON.stringify(test, null, 2);
      const dateName = date
        .toLocaleString()
        .replace(/,\s/, '_')
        .replace(/\.|:|\//g, '-');
      const safeName = test.name
        ? test.name.replace(/[^\p{L}\p{M}0-9_,\s\-.]/giu, '_')
        : defaults.defaultName;

      await fs.mkdir(test.outputDir, { recursive: true });

      const handlerDate = await fs.open(
        path.join(
          test.outputDir,
          `${safeName} [${dateName}]${defaults.resultSuffix}${ext}`
        ),
        'w'
      );
      await handlerDate.writeFile(content);
      await handlerDate.close();

      const handlerLast = await fs.open(
        path.join(
          test.outputDir,
          `${safeName} [${defaults.resultLast}]${defaults.resultSuffix}${ext}`
        ),
        'w'
      );
      await handlerLast.writeFile(content);
      await handlerLast.close();
    } catch (e) {
      return e.message;
    }
  };

  const putViewerFiles = async () => {
    const outDirsLength = outputDirs.size;
    let counterDir = 1;

    for (const dir of outputDirs) {
      const viewerId = `viewer${counterDir}`;

      try {
        const handlerRead = await fs.open(defaults.resultsViewerFile, 'r');
        const content = await handlerRead.readFile({ encoding: 'utf8' });
        await handlerRead.close();

        logger.spinner(
          viewerId,
          `Generating Viewer file: ${logger.style(
            `${counterDir++}/${outDirsLength}`,
            'bold'
          )}`
        );

        const dirents = await fs.readdir(dir, { withFileTypes: true });
        const filesList = dirents
          .filter(
            (ent) =>
              ent.isFile() &&
              ent.name.match(new RegExp(`${defaults.resultSuffix}\\${ext}$`)) &&
              !ent.name.match(
                new RegExp(
                  `\\[${defaults.resultLast}\\]${defaults.resultSuffix}\\${ext}$`
                )
              )
          )
          .map((ent) => path.join(dir, ent.name));

        const suitsList = [];

        for (const file of filesList) {
          const handler = await fs.open(file, 'r');
          const content = await handler.readFile({ encoding: 'utf8' });
          await handler.close();

          const suit = JSON.parse(content);
          suit.sourceFile = file;
          suit.id = crypto.randomBytes(8).toString('hex');
          suitsList.push(suit);
        }

        const resultsContent = content
          .replace(defaults.resultsViewerExpr, `$1${JSON.stringify(suitsList)}`)
          .replace(defaults.resultsBuildDate, `$1"${date.toISOString()}"`);
        const viewerFile = path.join(
          dir,
          path.basename(defaults.resultsViewerFile)
        );

        const handlerWrite = await fs.open(viewerFile, 'w');
        await handlerWrite.writeFile(resultsContent);
        await handlerWrite.close();

        logger.spinnerDone(viewerId);

        if (openView.has(dir)) {
          logger
            .text('Opening Viewer file in your browser: ')
            .text(viewerFile, 'bold')
            .newline();

          await open(viewerFile);
        }
      } catch (e) {
        logger
          .spinnerDone(viewerId)
          .text('Error occured while writing viewer file: ', 'error')
          .text(e.message, 'bold')
          .newline();
      }
    }
  };

  const ext = '.json';

  const result = {
    error: null,
    suits: [],
  };

  const outputDirs = new Set();
  const openView = new Set();

  const date = new Date();

  logger
    .newline(2)
    .separate()
    .spinner('results', logger.style('Generating results...', 'info'), {
      color: 'magenta',
    })
    .separate();

  for (const test of tests) {
    const testRes = {
      date: date.toISOString(),
      error:
        test?._error || test?.config?._error || test?._result?.error || null,
      inputDir: test?.path || null,
      outputDir: test?.config?.output ?? null,
      name: test?.config?.name || null,
      host: test?.config?.host || null,
      timeSpent: test?._result?.timeSpent || null,
      cases: [],
    };

    const resId = `result${generateId()}`;

    logger.spinner(
      resId,
      `${logger.style('Generating for test suit: ', {
        color: 'blueBright',
      })}${logger.style(testRes.name || defaults.defaultName, 'bold')}`,
      { color: 'blueBright' }
    );

    for (const file of checks.files) {
      if (file === checks.entry) {
        continue;
      }

      testRes.cases.push({
        error: test?.[file]?._error || null,
        type: file,
        results: test?._result?.[file] || [],
      });
    }

    if (testRes.outputDir) {
      logger
        .text('Outputting results to dir: ')
        .text(testRes.outputDir, 'bold')
        .newline();

      const err = await writeResults(testRes);

      if (err) {
        logger.text(criticalText, 'error').text(err, 'bold').newline();

        testRes.error = err;
      }

      outputDirs.add(testRes.outputDir);

      if (test?.config?.view) {
        openView.add(testRes.outputDir);
      }
    }

    result.suits.push(testRes);

    logger.spinnerDone(resId).newline(2);
  }

  logger.newline(2);

  await putViewerFiles();

  logger.spinnerDone('results');

  return result;
}
