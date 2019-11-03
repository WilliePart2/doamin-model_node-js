const Command = require('./Supertype/Command');
const { Customer } = require('./Domain');

class CreateCustomerCommand extends Command {
  run({ customerName }) {
    const session = this.startSession();

    const newCustomer = new Customer(session);
    newCustomer.initialize(session.getSession(newCustomer));

    const newCustomer2 = new Customer(session);
    newCustomer2.initialize(session.getSession(newCustomer2));

    newCustomer2.remove();

    newCustomer.setName(customerName);

    session.commit(session);
  }
}

module.exports = CreateCustomerCommand;
