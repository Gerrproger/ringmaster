import logger from '../logger.js';
import doBefore from './before.js';

export default async function (check, baseUrl, page) {
  const result = {
    name: check.name,
    selector: check.selector,
  };

  try {
    const settings = {};

    if (check.visible) {
      settings.visible = check.visible;
    }
    if (check.timeout) {
      settings.timeout = check.timeout;
    }

    await page.goto(`${baseUrl}${check.path.replace(/^\//, '')}`);

    if (check.before) {
      for (const beforeCheck of check.before) {
        await doBefore(beforeCheck, page);
      }
    }

    await page.waitForSelector(check.selector, settings);

    logger.text('✔ Success', 'success').newline();

    return {
      ...result,
      success: true,
      error: null,
    };
  } catch (e) {
    logger
      .text('✘ Failed', 'error')
      .newline()
      .text('Error description: ', 'error')
      .text(e.message, 'bold')
      .newline();

    return {
      ...result,
      success: false,
      error: e.message,
    };
  }
}
