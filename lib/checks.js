import selectors from './checks/selector.js';
import visual from './checks/visual.js';

export default {
  entry: 'config',
  files: ['config', 'selectors', 'visual'],
  processors: {
    selectors,
    visual,
  },
  ext: '.json',
};
