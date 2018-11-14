
var ethritageToken = artifacts.require("ethritageToken");

const name = "ethritage";
const symbol = "ERTG";


module.exports = function(deployer) {
  deployer.deploy(ethritageToken, name, symbol);
};
