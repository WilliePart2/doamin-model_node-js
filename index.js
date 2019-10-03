const { registerMapper } = require('./Supertype/Metadata');
const { DomainMapper } = require('./Supertype/DataMapper');
const { Customer } = require('./Domain');
const CreateCustommerCommand = require('./CreateCustommerCommand');

/**
 * Register data mappers for specific domains
 */
registerMapper(Customer.class, DomainMapper);

/**
 * Test work
 */

 new CreateCustommerCommand().run({
   customerName: 'Willie'
 });
 
