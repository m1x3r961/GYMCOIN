import Web3 from 'web3'

import Theter from '../../truffle_abis/Theter.json'
import GYM from '../../truffle_abis/GYM.json'
import DecentralBank from '../../truffle_abis/DecentralBank.json'

import {
    SET_METAMASK_WALLET_SUCCESS,
    LOAD_WEB3_SUCCESS,
    LOAD_WEB3_FAIL,
    LOAD_BLOCKCHAIN_DATA_SUCCESS,
    LOAD_BLOCKCHAIN_DATA_FAIL,
    LOAD_THETER_SUCCESS,
    LOAD_THETER_FAIL,
    LOAD_THETER_BALANCE_SUCCESS,
    LOAD_THETER_BALANCE_FAIL,
    LOAD_GYM_SUCCESS,
    LOAD_GYM_FAIL,
    LOAD_GYM_BALANCE_SUCCESS,
    LOAD_GYM_BALANCE_FAIL,
    LOAD_BANK_SUCCESS,
    LOAD_BANK_FAIL,
    LOAD_BANK_BALANCE_SUCCESS,
    LOAD_BANK_BALANCE_FAIL,
    SET_LOADING_SUCCESS,
    SET_LOADING_FAIL
} from './types'
export const setMetamaskWallet = () => dispath => {
    dispath({
        type: SET_METAMASK_WALLET_SUCCESS,
        payload: '0x0'
    })
}
export const setLoadWeb3 = () => async dispatch => {
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        dispatch({
            type: LOAD_WEB3_SUCCESS,
        })
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        dispatch({
            type: LOAD_WEB3_SUCCESS,
        })
    } else {
        dispatch({
            type: LOAD_WEB3_FAIL,
        })
    }
}

export const loadBlockchainData = () => async dispatch => {
    if(window.web3){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        dispatch({
            type: LOAD_BLOCKCHAIN_DATA_SUCCESS,
            payload:accounts[0]
        })

        const networkId = await web3.eth.net.getId()
        
        // Cargar Tether
        const theterData = Theter.networks[networkId]
        if(theterData){
            const theter = new web3.eth.Contract(Theter.abi, theterData.address)
            dispatch({
                type: LOAD_THETER_SUCCESS,
                payload:theter
            })
            let theterBalance = await theter.methods.balanceOf(accounts).call()
            if(theterBalance){
                dispatch({
                    type: LOAD_THETER_BALANCE_SUCCESS,
                    payload:theterBalance.toString()
                })
            } else {
                dispatch({
                    type: LOAD_THETER_BALANCE_FAIL
                })
            }
        } else {
            dispatch({
                type: LOAD_THETER_FAIL
            })
            
        }
        
        // Cargar Uridium
        const gymData = GYM.networks[networkId]
        if(gymData){
            const gym = new web3.eth.Contract(GYM.abi, gymData.address)
            dispatch({
                type: LOAD_GYM_SUCCESS,
                payload:gym
            })
            let gymBalance = await gym.methods.balanceOf(accounts).call()
            if(gymBalance){
                dispatch({
                    type: LOAD_GYM_BALANCE_SUCCESS,
                    payload:gymBalance.toString()
                })
            } else {
                dispatch({
                    type: LOAD_GYM_BALANCE_FAIL
                })
            }
        } else {
            dispatch({
                type: LOAD_GYM_FAIL
            })
            
        }
        
        
        // Cargar Banco Decentralizado
        const decentralBankData = DecentralBank.networks[networkId]
        if(decentralBankData){
            const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
            dispatch({
                type: LOAD_BANK_SUCCESS,
                payload:decentralBank
            })
            let stakingBalance = await decentralBank.methods.stakingBalance(accounts).call()
            if(stakingBalance){
                dispatch({
                    type: LOAD_BANK_BALANCE_SUCCESS,
                    payload:stakingBalance.toString()
                })
            } else {
                dispatch({
                    type: LOAD_BANK_BALANCE_FAIL
                })
            }
        } else {
            dispatch({
                type: LOAD_BANK_FAIL
            })
        }

        dispatch({
            type: SET_LOADING_SUCCESS,
            payload:true
        })

    } else {
        dispatch({
            type: LOAD_BLOCKCHAIN_DATA_FAIL,
        })
        dispatch({
            type: SET_LOADING_FAIL,
            payload:false
        })
    }
    
}
