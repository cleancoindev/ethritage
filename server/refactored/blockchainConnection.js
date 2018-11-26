const { blockchainSubscription } = require("./blockchainSubscription");
const { contractInstance } = require("./contractInstance");
const keypair = require("../../secrets").keypair;

//------------ // Web3 Interface // ------------//
const Web3 = require("web3");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Tx = require("ethereumjs-tx");
const server = "HTTP://127.0.0.1:7545";
const wsServer = "ws://localhost:7545";
const gas = {
  price: 20 * 1e8,
  limit: 2100000
};
const web3Plus = {
  Web3,
  HDWalletProvider,
  Tx,
  server,
  wsServer
};
const tokenInterface = new TokenInterface(
  gas,
  keypair,
  contractInstance,
  web3Plus
);

const mintIt = async uri => {

    const block = await getCurrentBlock();
    
    try {
      console.log("Creating a Subscription to Events...");
      let events = await tokenInterface.subscribeToContractEvents();
     
      console.log("Subscription Created...");
      
      blockchainSubscription(events, block);
      console.log("Minting Token...");
      await tokenInterface.mintToken(uri);
    } catch (error) {
      console.log("MintIt Error: ", error);
    }
  };

  const getCurrentBlock= async () => {
    try {
      return await tokenInterface.getLatestBlockNumber();
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  module.exports = mintIt;