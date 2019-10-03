const { Registry } = require('./Metadata');

/**
 * Unit of work intended to track state of domain class
 * Also this patter exosed as glue between domain model and data mapper
 */
class UnitOfWork {
  constructor() {
    this.dirty = [];
    this.created = [];
    this.deleted = [];
  }

  _isExists(list, target) {
    return list.some(listObj => listObj === target);
  }

  setDirty(obj) {
    if (this._isExists(this.created, obj) || this._isExists(this.deleted, obj)) {
      console.warn('You try to set data on removed object');
      return;
    }

    this.dirty.push(obj);
  }

  setCreated(obj) {
    this.created.push(obj);
  }

  setRemoved(obj) {
    this.dirty = this.dirty.filter(dirtyObj => dirtyObj !== obj);
    this.created = this.created.filter(createdObj => createdObj !== obj);

    this.deleted.push(obj);
  }

  commit(targetClass) {
    const mapper = Registry.getMapper(targetClass);
    if (this.dirty.length) {
      mapper.update(this.dirty);
    }

    if (this.created.length) {
      mapper.insert(this.created);
    }

    if (this.deleted.length) {
      mapper.delete(this.deleted);
    }
  }
}

module.exports = UnitOfWork;
