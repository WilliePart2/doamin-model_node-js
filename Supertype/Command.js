const { Session } = require('./Session');
const UnitOfWork = require('./UnitOfWork');

/**
 * Pattern command intended to provide single interface to run.
 * Also it enforce pass argumants as single object that allow serialize it
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
    return new Session(
      new UnitOfWork()
    );
  }
}

module.exports = Command;