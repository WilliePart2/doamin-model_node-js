const { SessionObject } = require('./Session');
/**
 * Basic class for domain model
 *
 * It's simplified version but close to real.
 * Real domain model should contain at least link to its identity
 * which usually represented by a class which hold 'id' of database record
 *
 * Here we use accessor(method) based DI.
 * Also here is used session for tracking changes.
 */
class DomainModel extends SessionObject {
  initialize(session) {
    this.setSession(session);
    this.getSession()
      .getUnitOfWork()
      .setCreated(this);
  }

  remove() {
    this.getSession()
      .getUnitOfWork()
      .setRemoved(this);
  }

  getClassIdentifier() {
    return this.constructor;
  }
}

module.exports = DomainModel;
