import {VERIFICATION_CONSTANT} from './verification.constant'


const INITIAL_STATE = {
    verificationDisplay: false,
    capturedID: null,
    authorized: false,
    is_verifying: false,
    errorMessage: ""
}

const verificationReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case VERIFICATION_CONSTANT.SHOW_VERIFICATION_COMPONENT:
            return {
                ...state,
                verificationDisplay: true,
                capturedID: action.payload
            }
        case VERIFICATION_CONSTANT.CLOSE_DISPLAY:
            return {
                ...state,
                verificationDisplay: false
            }
        case VERIFICATION_CONSTANT.VERIFY_START:
            return {
                ...state,
                is_verifying: true
            }
        case VERIFICATION_CONSTANT.VERIFY_SUCCESS:
            return {
                ...state,
                is_verifying: false,
                authorized: true,
                errorMessage: ""
            }
        case VERIFICATION_CONSTANT.VERIFY_FAILED:
            return {
                ...state,
                is_verifying: false,
                authorized: false,
                errorMessage: action.payload
            }
        case VERIFICATION_CONSTANT.RESET_AUTHORIZED:
            return {
                ...state,
                authorized: false
            }
        default:
            return state
    }
}

export default verificationReducer