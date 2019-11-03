class IdentityMap {
  constructor() {
    this.entitiesByIdentities = new Map();
  }

  hasEntity(identity) {
    return this.entitiesByIdentities.has(identity);
  }

  setEntity(identity, entity) {
    this.entitiesByIdentities.set(identity, entity);
  }

  getEntity(identity) {
    return this.entitiesByIdentities.get(identity);
  }

  getEntries() {
    return Array.from(this.entitiesByIdentities.entries());
  }
}

module.exports = IdentityMap;
