// const Morels = artifacts.require("./Morels.sol");
const Mycelium = artifacts.require("./Mycelium.sol");

module.exports = function(deployer, network, accounts) {
  const wallet = accounts[1];
  deployer.deploy(Mycelium);
  // return deployer
  //   .then(() => {
  //     return deployer.deploy(Morels);
  //   })
  //   .then(() => {
  //     return deployer.deploy(Mycelium, wallet, Morels.address);
  //   });
};
