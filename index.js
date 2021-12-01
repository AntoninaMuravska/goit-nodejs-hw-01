const contactsOperations = require('./contacts');
const argv = require('yargs').argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      await contactsOperations.listContacts();
      break;

    case 'get':
      await contactsOperations.getContactById(id);
      break;

    case 'add':
      await contactsOperations.addContact(name, email, phone);
      break;

    case 'remove':
      await contactsOperations.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

invokeAction(argv);
