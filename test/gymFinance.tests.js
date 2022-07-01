const Theter = artifacts.require('Theter')
const GYM = artifacts.require('GYM')
const DecentralBank = artifacts.require('DecentralBank')

require('chai')
.use(require('chai-as-promised'))
.should()

contract('DecentralBank', ([owner, customer]) => {
    let theter, gym, decentralBank

    function tokens(number) {
        return web3.utils.toWei(number, 'ether')
    }

    before(async () => {
        //cargar contratos
        theter = await Theter.new()
        gym = await GYM.new()
        decentralBank = await DecentralBank.new(gym.address, theter.address)

        //transferir tokens al banco
        await gym.transfer(decentralBank.address, tokens('1000000'))

        //transferir 100 tokens al cliente
        await theter.transfer(customer, tokens('100'), {from: owner})
    })

    describe('Mock Theter Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await theter.name()
            assert.equal(name, 'Mock Theter Token')
        })
    })

    describe('Reward Token Deployment', async () => {
        it('matches name successfully', async () => {
            const name = await gym.name()
            assert.equal(name, 'Gymcoin')
        })
    })

    describe('Decentral Bank Deployed', async => {
        it('matches name successfully', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Gym Finance')
        })

        it('contract has tokens', async () => {
            let balance = await gym.balanceOf(decentralBank.address)
            assert.equal(balance, tokens('1000000'))
        })
    })

    describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
            let result

            // Check Investor Balance
            result = await theter.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance before staking')
            
            // Check Staking For Customer of 100 tokens
            await theter.approve(decentralBank.address, tokens('100'), {from: customer})
            await decentralBank.depositTokens(tokens('100'), {from: customer})

            // Check Updated Balance of Customer
            result = await theter.balanceOf(customer)
            assert.equal(result.toString(), tokens('0'), 'customer mock wallet balance after staking 100 tokens')     
            
            // Check Updated Balance of Decentral Bank
            result = await theter.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('100'), 'decentral bank mock wallet balance after staking from customer')     
            
            // Is Staking Update
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'true', 'customer is staking status after staking')

            // Issue Tokens
            await decentralBank.issueTokens({from: owner})

            // Ensure Only The Owner Can Issue Tokens
            await decentralBank.issueTokens({from: customer}).should.be.rejected;

            // Unstake Tokens
            await decentralBank.unstakeTokens({from: customer})

            // Check Unstaking Balances

            result = await theter.balanceOf(customer)
            assert.equal(result.toString(), tokens('100'), 'customer mock wallet balance after unstaking')     
            
            // Check Updated Balance of Decentral Bank
            result = await theter.balanceOf(decentralBank.address)
            assert.equal(result.toString(), tokens('0'), 'decentral bank mock wallet balance after staking from customer')     
            
            // Is Staking Update
            result = await decentralBank.isStaking(customer)
            assert.equal(result.toString(), 'false', 'customer is no longer staking after unstaking')
        })
    })
})