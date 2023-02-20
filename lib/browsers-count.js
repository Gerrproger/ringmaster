class BrowsersCount {
  constructor() {
    this.activeInstances = 0;
  }

  increment() {
    return ++this.activeInstances;
  }

  decrement() {
    return --this.activeInstances;
  }

  get hasActive() {
    return this.activeInstances > 0;
  }
}

export default new BrowsersCount();
