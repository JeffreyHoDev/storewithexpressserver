import FULFILL_REQUEST_CONSTANT from './fulfillrequest.constant'

const INITIAL_STATE = {
    is_submitting: false,
    errorMessage: "",
    is_cancelling: false
}

const FulfillRequestReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case FULFILL_REQUEST_CONSTANT.FULFILL_REQUEST_START:
            return {
                ...state,
                is_submitting: true
            }
        case FULFILL_REQUEST_CONSTANT.FULFILL_REQUEST_SUCCESS:
            return {
                ...state,
                is_submitting: false,
                errorMessage: ""
            }
        case FULFILL_REQUEST_CONSTANT.FULFILL_REQUEST_FAILED:
            return {
                ...state,
                is_submitting: false,
                errorMessage: action.payload
            }
        case FULFILL_REQUEST_CONSTANT.CANCEL_REQUEST_START:
            return {
                ...state,
                is_cancelling: true
            }
        case FULFILL_REQUEST_CONSTANT.CANCEL_REQUEST_SUCCESS:
            return {
                ...state,
                is_cancelling: false,
                errorMessage: ""
            }
        case FULFILL_REQUEST_CONSTANT.CANCEL_REQUEST_FAILED:
            return {
                ...state,
                is_cancelling: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
}

export default FulfillRequestReducer