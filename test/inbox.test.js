const assert = require("assert");
const ganache = require("ganache-cli");
// Web3 is contructor function
const Web3 = require("web3");
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require("../compile.js");

let accounts;
let inbox;

beforeEach(async () => {
  // get a list of all account
  accounts = await web3.eth.getAccounts();
  // use one of accounts to deploy contracts
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hi there"] })
    .send({ from: accounts[0], gas: "1000000" });

  inbox.setProvider(provider);
});

describe("Inbox", () => {
  it("deploy a contact", () => {
    assert.ok(inbox.options.address);
    // console.log(inbox.options.address);
  });

  it("has a default message", async () => {
    // method() is used to pass method arguments
    // call() is used to pass transaction parameter, in the case the transaction will modify data
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there");
  });

  it("set a new message", async () => {
    await inbox.methods.setMessage("Bye There").send({ from: accounts[0] });

    const message = await inbox.methods.message().call();
    assert.equal(message, "Bye There");
  });
});
