import Logion from 'logion';

export const criticalText = 'Critical error occured: ';

export default new Logion({
  spinnerFormatDone: (str) => str.replace(/\.\.\./, ' done.'),
});
