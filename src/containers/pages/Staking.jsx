import StakingController from "../../components/staking/StakingController"
import Layout from "../../hocs/Layout"
import Loader from "react-loader-spinner";
import { connect } from "react-redux"

const Staking = ({
    account,
    theter,
    theter_balance,
    gym,
    gym_balance,
    decentralBank,
    stakingBalance,
    loading_success
}) => {

    const stakeTokens = (amount) => {
        //set loading true
        //funcion de aprove
        gym.methods.approve(decentralBank._address, amount).send({from: account }).on('transactionHash', (hash) => {
            decentralBank.methods.depositTokens(amount).send({from: account}).on('transactionHash', (hash) => {

            })
        })
        theter.methods.approve(decentralBank._address, amount).send({from: account }).on('transactionHash', (hash) => {
            // depositTokens
            decentralBank.methods.depositTokens(amount).send({from: account}).on('transactionHash', (hash) => {
                //set loading false
            })
        })
    }

    const unstakeTokens = () => {
        //set loading true
        decentralBank.methods.unstakeTokens().send({from: account}).on('transactionHash', (hash) => {
            //set loading false
        })
    }

    return(
        <Layout>
            <StakingController
                loading_success={loading_success}
                theterBalance={theter_balance}
                gymBalance={gym_balance}
                stakingBalance={stakingBalance}
                decentralBank={decentralBank}
                stakeTokens={stakeTokens}
                unstakeTokens={unstakeTokens}
            />
        </Layout>
    )
}

const mapStateToProps = state => ({
    account: state.wallet.account,
    theter: state.wallet.theter,
    theter_balance: state.wallet.theter_balance,
    gym: state.wallet.gym,
    gym_balance: state.wallet.gym_balance,
    decentralBank: state.wallet.decentralBank,
    stakingBalance: state.wallet.stakingBalance,
    loading_success: state.wallet.loading_success,
  })
  
  export default connect(mapStateToProps, {}) (Staking)