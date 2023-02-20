import selectors from './checks/selector.js';

export default {
  entry: 'config',
  files: ['config', 'selectors'],
  processors: {
    selectors,
  },
  ext: '.json',
};
