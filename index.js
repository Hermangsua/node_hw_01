const path = require("path");
const fs = require("fs/promises");
const { Command } = require("commander");

const {
  contactsPath,
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const program = new Command();

program.name("index.js").version("0.8.0");

program
  .description("Simple application to manage your contacts list")
  .requiredOption("-a, --action <list | get | add | remove>", "choose action")
  .option("--id <string>", "user id")
  .option("-n, --name <string>,", "user name")
  .option("-e, --email <string>", "user email")
  .option("-p, --phone <type>", "user phone")
  .option("--action='remove' --id=<string>", "user phone");

program.parse();
const options = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
