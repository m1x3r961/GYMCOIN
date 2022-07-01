const Theter = artifacts.require('Theter')
const GYM = artifacts.require('GYM')
const DecentralBank = artifacts.require('DecentralBank')

module.exports = async function(deployer, network, accounts) {
    // Despliega contrato tether
    await deployer.deploy(Theter)
    const theter = await Theter.deployed()

    await deployer.deploy(GYM)
    const gym = await GYM.deployed()

    await deployer.deploy(DecentralBank, gym.address, theter.address)
    const decentralBank = await DecentralBank.deployed()
    
    // transferir 1 millon de URI al banco
    await gym.transfer(DecentralBank.address, '1000000000000000000000000')

    // transferir 100 tether al inversionista
    await theter.transfer(accounts[1], '100000000000000000000')
}