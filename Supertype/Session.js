const UnitOfWork = require('./UnitOfWork');
const IdentityMap = require('./IdentityMap');

/**
 * Class which could receive and set session for its instances
 */
class SessionObject {
  setSession(session) {
    this.session = session;
  }

  getSession() {
    return this.session;
  }
}

/**
 * Intended to trek sessions within one operation
 * Similarly to unit of work that track objects state
 */
class SessionUnit {
  constructor() {
    this.classesMap = new IdentityMap();
  }

  getAllStartedSessions() {
    return this.classesMap.getEntries();
  }

  getSession(identityObject) {
    if (!this.classesMap.hasEntity(identityObject)) {
      this.classesMap.setEntity(identityObject, new Session(
        new UnitOfWork()
      ));
    }

    return this.classesMap.getEntity(identityObject);
  }

  commit() {
    this.getAllStartedSessions()
      .forEach(([targetClass, session]) =>
        session.getUnitOfWork()
          .commit(targetClass.getClassIdentifier())
      );
  }
}

/**
 * Implementation of server side session
 * Such object intended to hold temporary data that needed only for one operation iteration
 */
class Session {
  constructor(unitOfWork) {
    this.unitOfWork = unitOfWork;
  }

  getUnitOfWork() {
    return this.unitOfWork;
  }
}

module.exports = {
  SessionObject,
  SessionUnit,
  Session,
};
