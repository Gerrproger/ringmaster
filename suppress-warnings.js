const originalEmit = process.emit;

process.emit = function (...args) {
  if (args[1].name === 'ExperimentalWarning') {
    return;
  }

  return originalEmit.call(this, ...args);
};
