import logUI from './log-ui.js';

export const criticalText = 'Critical error occured: ';

export default new logUI({
  spinnerFormatDone: (str) => str.replace(/\.\.\./, ' done.'),
});
