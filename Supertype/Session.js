/**
 * Class which could receive and set session for its instances
 */
class SessionObject {
  constructor(session) {
    this.session = session;
  }

  getSession() {
    return this.session;
  }

  provideSession(target) {
    target.setSession(this.session);
  }
}

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
  Session,
};
