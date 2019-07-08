const Toadstool = artifacts.require("./Toadstool.sol");
const Mycelium = artifacts.require("./Mycelium.sol");

module.exports = async function(deployer, network, accounts) {
  const wallet = accounts[1];

  await deployer.deploy(Mycelium);
  const myceliumInstance = await Mycelium.deployed();
  await deployer.deploy(Toadstool, "Toadstool", "TOAD");
  const toadstoolInstance = await Toadstool.deployed();
  toadstoolInstance.transferOwnership(myceliumInstance.address);
  myceliumInstance.setToad(0, toadstoolInstance.address);
};
