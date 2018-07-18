const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile");
const { endpoint } = require("./infura");

const provider = new HDWalletProvider(
  "open dolphin syrup sniff hub lumber okay quality banana summer festival infant",
  endpoint
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log(`Attempting to deploy from account ${accounts[0]}`);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: `0x${bytecode}`, arguments: ["Hi there!"] })
    .send({ from: accounts[0] });

  console.log(result);
};
try {
  deploy();
} catch (e) {
  console.log(e);
}
