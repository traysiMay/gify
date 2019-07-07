const Shrooms = artifacts.require("Transhroomtation");
const Morels = artifacts.require("Morels");

contract("Transhroomtation token", accounts => {
  it("Should make the first account the owner", async () => {
    let instance = await Shrooms.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  // describe("mint", () => {
  //   it("creates shroom with specified inner and outer whatevers", async () => {
  //     let instance = await Shrooms.deployed();
  //     let owner = await instance.owner();

  //     let shroom = await instance.mint("#ffffff", "#ddddff");
  //     let ownerO = await instance.ownerOf(0);
  //     //   let shroomsWhatevers = await instance.getShroom(shrooms[0]);
  //     console.log(ownerO, owner);
  //     assert.deepEqual(ownerO, owner);
  //   });
  // });

  // describe("change name", () => {
  //   it("it changes the name", async () => {
  //     let instance = await Morels.deployed();
  //     let nameChange = await instance.setName("meepo");
  //     const name = await instance.name();
  //     assert.equal(name, "meepo");
  //   });
  // });
});
