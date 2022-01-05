const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, '/db/contacts.json');

async function getContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await getContacts();
  const result = contacts.find(item => item.id === contactId);

  if (!result) {
    console.log('Contact not found');
    return;
  }

  console.table([result]);
}

async function removeContact(contactId) {
  const contacts = await getContacts();
  const contactExist = contacts.some(el => el.id === contactId);

  if (contactExist) {
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
    console.log(`Contact removed`);
  }
  console.log(`Contact with id=${contactId} not found`);
}

async function addContact(name, email, phone) {
  const contacts = await getContacts();
  if (!name || !email || !phone) {
    console.log('Please fill all fields');
    return;
  }

  contacts.push({
    id: uuidv4(),
    name,
    email,
    phone,
  });

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log('New contact added');
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
