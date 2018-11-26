const contractInstance = {
  contractBuild: require("../../build/contracts/ethritageToken.json"),
  contractABI: require("../../build/contracts/ethritageToken.json").abi,
  contractAddress: require("../../build/contracts/ethritageToken.json")
    .networks[5777].address
};
exports.contractInstance = contractInstance;