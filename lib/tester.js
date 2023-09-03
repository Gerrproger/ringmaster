import puppeteer from 'puppeteer-extra';
import PluginStealth from 'puppeteer-extra-plugin-stealth';
import PluginPrefs from 'puppeteer-extra-plugin-user-preferences';

import { generateId } from './id.js';
import logger, { criticalText } from './logger.js';
import browsersCount from './browsers-count.js';
import defaults from './defaults.js';
import checks from './checks.js';

export default async function (test) {
  const id = generateId();
  const prepId = `prep${id}`;

  logger
    .newline(2)
    .spinner(prepId, logger.style('Preparing...', { color: 'cyan' }), {
      color: 'cyan',
    });

  const startTime = new Date().getTime();
  const result = {};
  let browser = null;
  let config = null;

  try {
    config = test[checks.entry];

    const baseUrl = `https://${config.host}/`;

    const pluginStealth = PluginStealth();
    pluginStealth.enabledEvasions.delete('iframe.contentWindow');

    puppeteer.use(pluginStealth);
    puppeteer.use(
      PluginPrefs({
        userPrefs: {
          devtools: {
            preferences: {
              'InspectorView.splitViewState': JSON.stringify({
                vertical: { size: 300 },
                horizontal: { size: 0 },
              }),
            },
          },
        },
      })
    );

    browser = await puppeteer.launch({
      devtools: true,
      headless: config.headless ? 'new' : false,
      executablePath: config.executable,
      timeout: config.timeout,
      defaultViewport: {
        width: config.viewport.width,
        height: config.viewport.height,
      },
      args: [
        config.muted ? '--mute-audio' : '',
        `--window-size=${config.viewport.width + 400},${
          config.viewport.height + 200
        }`,
      ],
    });
    browsersCount.increment();

    const startPage = await browser.newPage();

    startPage.setDefaultTimeout(config.timeout);
    await startPage.goto(baseUrl);

    for (const cookie of config.cookies) {
      await startPage.setCookie(cookie);
    }

    for (const ls of config.localStorage) {
      await startPage.evaluate(
        (name, value) => {
          // eslint-disable-next-line no-undef
          window.localStorage.setItem(name, value);
        },
        ls.name,
        ls.value
      );
    }

    logger.spinnerDone(prepId);

    for (const file of checks.files) {
      if (file === checks.entry) {
        continue;
      }

      const checkList = test[file];

      if (!checkList) {
        continue;
      }

      const casesId = `cases${id}${file}`;

      logger.newline(2).spinner(
        casesId,
        `${logger.style('Testing ', { color: 'cyan' })}${logger.style(file, {
          color: 'cyan',
          bold: true,
        })}${logger.style(' cases...', { color: 'cyan' })}`,
        { color: 'cyan' }
      );

      if (checkList._error) {
        logger
          .spinnerDone(casesId)
          .text(
            'Critical error found during loading and validating config file: ',
            'error'
          )
          .text(checkList._error, 'bold')
          .newline()
          .text('File name: ')
          .text(`${file}${checks.ext}`, 'bold')
          .newline()
          .text('Directory path: ')
          .text(test.path, 'bold')
          .newline();

        continue;
      }

      const checkListLength = checkList.length;
      let checkInd = 1;

      logger
        .text('Found test cases: ', { color: 'cyan' })
        .text(checkListLength, { color: 'cyan', bold: true })
        .newline();

      result[file] = [];

      for (const check of checkList) {
        const caseId = `case${id}${file}${checkInd}`;

        logger
          .newline(2)
          .spinner(
            caseId,
            `${logger.style('Running test case: ', {
              color: 'greenBright',
            })}${logger.style(`${checkInd++}/${checkListLength}`, 'bold')}`,
            { color: 'greenBright' }
          )
          .text('Name: ', { color: 'yellow' })
          .text(check.name, 'bold')
          .newline()
          .text('Type: ')
          .text(file, 'bold')
          .newline();

        const page = await browser.newPage();
        page.setDefaultTimeout(config.timeout);
        result[file].push(
          await checks.processors[file](check, baseUrl, page, config, defaults)
        );

        logger.spinnerDone(caseId);
      }

      logger.spinnerDone(casesId);
    }

    result.timeSpent = Math.ceil((new Date().getTime() - startTime) / 1000);

    logger
      .newline(2)
      .text('Done in ', { color: 'cyan' })
      .text(result.timeSpent, { color: 'cyan', bold: true })
      .text(' seconds', { color: 'cyan' })
      .newline();

    if (config.close || config.headless) {
      await browser.close();
      browsersCount.decrement();
    }

    return result;
  } catch (e) {
    logger
      .spinnerDone(prepId)
      .text(criticalText, 'error')
      .text(e.message, 'bold')
      .newline();

    if (browser) {
      await browser.close();
      browsersCount.decrement();
    }

    return {
      error: e.message,
    };
  }
}
