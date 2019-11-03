const { Registry } = require('./Metadata');

/**
 * Unit of work intended to track state of domain class
 * Also this patter exosed as glue between domain model and data mapper
 */
class UnitOfWork {
  constructor() {
    this.dirty = new Set();
    this.created = new Set();
    this.deleted = new Set();
  }

  setDirty(obj) {
    if (this.created.has(obj) || this.deleted.has(obj)) {
      console.warn('You try to set data on removed object');
      return;
    }

    this.dirty.add(obj);
  }

  setCreated(obj) {
    this.created.add(obj);
  }

  setRemoved(obj) {
    this.dirty.delete(obj);
    this.created.delete(obj);

    this.deleted.add(obj);
  }

  commit(targetClass) {
    const mapper = Registry.getMapper(targetClass);
    if (this.dirty.size) {
      mapper.update(this.dirty);
    }

    if (this.created.size) {
      mapper.insert(this.created);
    }

    if (this.deleted.size) {
      mapper.delete(this.deleted);
    }
  }
}

module.exports = UnitOfWork;
