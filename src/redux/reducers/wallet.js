import {
    SET_METAMASK_WALLET_SUCCESS,
    SET_METAMASK_WALLET_FAIL,
    LOAD_WEB3_SUCCESS,
    LOAD_WEB3_FAIL,
    LOAD_BLOCKCHAIN_DATA_SUCCESS,
    LOAD_BLOCKCHAIN_DATA_FAIL,
    LOAD_THETER_FAIL,
    LOAD_THETER_SUCCESS,
    LOAD_THETER_BALANCE_SUCCESS,
    LOAD_THETER_BALANCE_FAIL,
    LOAD_GYM_FAIL,
    LOAD_GYM_SUCCESS,
    LOAD_GYM_BALANCE_SUCCESS,
    LOAD_GYM_BALANCE_FAIL,
    LOAD_BANK_SUCCESS,
    LOAD_BANK_FAIL,
    LOAD_BANK_BALANCE_SUCCESS,
    LOAD_BANK_BALANCE_FAIL,
    SET_LOADING_SUCCESS,
    SET_LOADING_FAIL
} from '../actions/types'

const initialState = {
    account: null,
    web3: null,
    theter: null,
    theter_balance: null,
    gym: null,
    gym_balance: null,
    decentralBank: null,
    loading: null,
    stakingBalance: null,
    loading_success: false
}

export default function wallet(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case SET_METAMASK_WALLET_SUCCESS:
            return {
                ...state,
                account: payload
            }
        case SET_METAMASK_WALLET_FAIL:
            return {
                ...state,
                account: payload
            }
        case LOAD_BLOCKCHAIN_DATA_SUCCESS:
            return {
                ...state,
                account: payload
            }
        case LOAD_WEB3_SUCCESS:
            return {
                ...state,
                web3: payload
            }
        case LOAD_THETER_SUCCESS:
            return {
                ...state,
                theter: payload
            }
        case LOAD_THETER_BALANCE_SUCCESS:
            return {
                ...state,
                theter_balance: payload
            }
        case LOAD_GYM_SUCCESS:
            return {
                ...state,
                gym: payload
            }
        case LOAD_GYM_BALANCE_SUCCESS:
            return {
                ...state,
                gym_balance: payload
            }
        case LOAD_BANK_SUCCESS:
            return {
                ...state,
                decentralBank: payload
            }
        case LOAD_BANK_BALANCE_SUCCESS:
            return {
                ...state,
                stakingBalance: payload
            }
        case SET_LOADING_SUCCESS:
            return {
                ...state,
                loading_success: payload
            }



        case LOAD_BLOCKCHAIN_DATA_FAIL:
            return {
                ...state,
                account: null
            }
        case LOAD_WEB3_FAIL:
            return {
                ...state,
                web3: null
            }
        case LOAD_THETER_FAIL:
            return {
                ...state,
                theter: null
            }
        case LOAD_THETER_BALANCE_FAIL:
            return {
                ...state,
                theter_balance: null
            }
        case LOAD_GYM_FAIL:
            return {
                ...state,
                gym: null
            }
        case LOAD_GYM_BALANCE_FAIL:
            return {
                ...state,
                gym_balance: null
            }
        case LOAD_BANK_FAIL:
            return {
                ...state,
                decentralBank: null
            }
        case LOAD_BANK_BALANCE_FAIL:
            return {
                ...state,
                stakingBalance: null
            }
        case SET_LOADING_FAIL:
            return {
                ...state,
                loading_success: null
            }

        default:
            return state
    }
}