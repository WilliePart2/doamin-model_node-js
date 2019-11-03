const { SessionUnit } = require('./Session');

/**
 * Pattern command intended to provide single interface to run.
 * Also it enforce passing arguments as single object that allow serialize it
 */
class Command {
  /**
   * Entry point to run command
   * @abstract
   * @param {object} args
   */
  run(args) {

  }

  startSession() {
    return new SessionUnit();
  }
}

module.exports = Command;
