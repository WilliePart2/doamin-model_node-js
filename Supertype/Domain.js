const { SessionObject } = require('./Session');
/**
 * Basic class for domain model
 * 
 * It's simplified version but close to real.
 * Real domain model should contain at least link to its identity
 * which usually represented by a class which hold 'id' of database record
 * 
 * Here we use constructor based DI.
 * Also here is used session for traking changes.
 */
class DomainModel extends SessionObject {
  constructor(session) {
    super(session);
    this.getSession()
      .getUnitOfWork()
      .setCreated(this);
  }
  
  static commit(session, classIdentifier) {
   session.getUnitOfWork()
    .commit(classIdentifier); 
  }

  remove() {
    this.getSession()
      .getUnitOfWork()
      .setRemoved(this);
  }
}

module.exports = DomainModel;
