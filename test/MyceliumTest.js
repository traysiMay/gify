const Mycelium = artifacts.require("Mycelium");
const Hyphae = artifacts.require("Hyphae");

contract("Mycelium", accounts => {
  it("Should make the first account the owner", async () => {
    let instance = await Mycelium.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });

  it("See if Mycelium construction deployed genesis Hyphae", async () => {
    let instance = await Mycelium.deployed();
    let genHyphae = await instance.getHyphae(0);
    let _hyphae = await Hyphae.at(genHyphae);
    let name = await _hyphae.getName.call();

    assert.equal("genesis", name);
  });

  it("Make a new Hyphae", async () => {
    let instance = await Mycelium.deployed();
    let chicken = await instance.newHyphae(1, "chicken");
    const chickenHyphae = await instance.getHyphae(1);
    const _hyphae = await Hyphae.at(chickenHyphae);
    const name = await _hyphae.getName.call();
    assert.equal("chicken", name);
  });

  //   describe("mint", () => {
  //     it("creates shroom with specified inner and outer whatevers", async () => {
  //       let instance = await Shrooms.deployed();
  //       let owner = await instance.owner();

  //       let shroom = await instance.mint("#ffffff", "#ddddff");
  //       let ownerO = await instance.ownerOf(0);
  //       //   let shroomsWhatevers = await instance.getShroom(shrooms[0]);
  //       console.log(ownerO, owner);
  //       assert.deepEqual(ownerO, owner);
  //     });
  //   });

  //   describe("change name", () => {
  //     it("it changes the name", async () => {
  //       let instance = await Morels.deployed();
  //       let nameChange = await instance.setName("meepo");
  //       const name = await instance.name();
  //       assert.equal(name, "meepo");
  //     });
  //   });
});
