const Command = require('./Supertype/Command');
const { Customer } = require('./Domain');

class CreateCustomerCommand extends Command {
  run({ customerName }) {
    const session = this.startSession();
    const newCustomer = new Customer(session);
    const newCustomer2 = new Customer(session);

    newCustomer2.remove();

    newCustomer.setName(customerName);

    Customer.commit(session);
  }
}

module.exports = CreateCustomerCommand;
