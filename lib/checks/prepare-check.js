import doBefore from './before.js';

export default async function prepareCheck(check, baseUrl, page) {
  await page.goto(`${baseUrl}${check.path.replace(/^\//, '')}`);

  if (check.before) {
    for (const beforeCheck of check.before) {
      await doBefore(beforeCheck, page);
    }
  }
}
