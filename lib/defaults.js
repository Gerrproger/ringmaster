import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getSchemaPropsDefaults } from './validator.js';

const _filename = import.meta.url.match(/^file:/)
  ? fileURLToPath(import.meta.url)
  : import.meta.url;
const _dirname = path.dirname(_filename);

export default {
  _filename,
  _dirname,
  defaultName: 'Unknown',
  resultSuffix: ' result',
  resultLast: 'last',
  folderTests: './_tests',
  folderResults: './_results',
  folderScreenshots: './_results/screenshots',
  folderSample: path.join(_dirname, '../sample-test'),
  resultsViewerFile: path.join(_dirname, '../lib/view results.html'),
  resultsViewerExpr: /(suitsList = )\[\]/,
  resultsBuildDate: /(buildDate = )null/,
  executablePath: {
    win32: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    linux: '/snap/bin/chromium',
  },
  maxScreenshots: 1,
  config: {
    ...getSchemaPropsDefaults('config'),
    viewport: getSchemaPropsDefaults('viewport'),
  },
};
