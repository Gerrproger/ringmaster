#! /usr/bin/env node

import './suppress-warnings.js';

(async () => {
  const { cli, makeInteractive } = await import('./lib/index.js');

  cli(makeInteractive());
})();
