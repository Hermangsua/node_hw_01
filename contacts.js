const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(
  path.dirname(__filename),
  "/db/",
  "contacts.json"
);

async function listContacts() {
  const fileContent = await fs.readFile(contactsPath);
  console.table(JSON.parse(fileContent));
}

async function getContactById(contactId) {
  const id = String(contactId);
  const fileContent = JSON.parse(await fs.readFile(contactsPath));
  const contact = fileContent.filter((contact) => contact.id === id);
  contact.length > 0
    ? console.table(contact[0])
    : console.log(`Sorry! There is no contact with id ${contactId}`);
}

async function removeContact(contactId) {
  const fileContent = JSON.parse(await fs.readFile(contactsPath));
  const newContactsArray = fileContent.filter(
    (contact) => contact.id !== String(contactId)
  );
  if (newContactsArray.length === fileContent.length) {
    console.log(`Contact with id ${contactId} is absent`);
    return;
  }
  fs.writeFile(contactsPath, JSON.stringify(newContactsArray))
    .then((r) =>
      console.log(
        `Contact with id = ${contactId} had been successfully deleted.`
      )
    )
    .catch((err) => console.error("Sorry. Can not delete this contact"));
}

async function addContact(name, email, phone) {
  const fileContent = JSON.parse(await fs.readFile(contactsPath));
  const newContact = { id: shortid.generate(), name, email, phone };
  const newContactsList = [...fileContent, newContact];
  fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    .then((r) => console.log(`Contact had been successfully added.`))
    .catch((err) => console.error("Sorry. Can not add this contact"));
}

module.exports = {
  contactsPath,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
