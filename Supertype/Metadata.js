const Registry = {
  _dataMappers: new Map(),

  registerMapper(key, mapper) {
    this._dataMappers.set(key, mapper);
  },

  getMapper(key) {
    const mapper = this._dataMappers.get(key);

    if (!mapper) {
      throw new Error('No registered mapper for this class ' + key.name);
    }

    return new mapper();
  },
};

const registerMapper = (domainClass, mapper) => {
  Registry.registerMapper(domainClass, mapper);
};

const domainWrapper = (domain) => {
  const proxiedClass = new Proxy(domain, {
    set(target, key, value, context) {
      if (Reflect.has(target, 'getSession')) {
        target.getSession()
        .getUnitOfWork()
        .setDitry(target);
      }
      
      return Reflect.set(target, key, value);
    }
  });

  proxiedClass.class = domain;

  return proxiedClass;
}

module.exports = {
  domainWrapper,
  registerMapper,
  Registry,
}
