class Strategy {
  constructor() {
    if (new.target === Strategy) {
      throw new TypeError('Cannot construct Abstract instances directly');
    }
    if (this.render === undefined) {
      throw new TypeError('Must override render');
    }
  }
}

module.exports = Strategy;
