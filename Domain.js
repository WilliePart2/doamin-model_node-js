const { domainWrapper } = require('./Supertype/Metadata');
const DomainModel = require('./Supertype/Domain');

class Customer extends DomainModel {
  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

module.exports = {
  Customer: domainWrapper(Customer),
};
