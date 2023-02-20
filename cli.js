#! /usr/bin/env node

import './suppress-warnings.js';

(async () => {
  const { cli } = await import('./lib/index.js');

  cli();
})();
