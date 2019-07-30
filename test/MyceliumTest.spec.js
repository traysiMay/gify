const Mycelium = artifacts.require('Mycelium')
const Hyphae = artifacts.require('Hyphae')
const Toadstool = artifacts.require('Toadstool')

contract('Mycelium', accounts => {
  it('Should make the first account the owner', async () => {
    let instance = await Mycelium.deployed()
    let owner = await instance.owner()
    assert.equal(owner, accounts[0])
  })

  it('See if Mycelium construction deployed genesis Hyphae', async () => {
    let instance = await Mycelium.deployed()
    await instance.createHyphae(0, 'genesis')
    let genHyphae = await instance.hyphaes.call(0)
    let _hyphae = await Hyphae.at(genHyphae)
    let name = await _hyphae.name.call()

    assert.equal('genesis', name)
  })

  it('Makes a toadstool contract', async () => {
    let instance = await Mycelium.deployed()
    await instance.createToadstool(1, 'Amanita', 'AMN')
    let toadIndex = await instance.lastToad.call()
    let toadAddress = await instance.toads.call(toadIndex)
    let toad = await Toadstool.at(toadAddress)
    let amanita = await toad.name.call()
    assert.equal('Amanita', amanita)
  })

  it('Mint a toad', async () => {
    const tI = 0
    let instance = await Mycelium.deployed()
    await instance.mintToad(tI, 255, 255, 255)
    let toadAddress = await instance.toads.call(tI)
    let toadInstance = await Toadstool.at(toadAddress)
    const shroomLength = await toadInstance.getShroomsLength.call()
    assert.equal(shroomLength, 1)
  })
})
