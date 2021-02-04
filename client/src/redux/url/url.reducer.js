import URL_CONSTANT from './url.constant'

const INITIAL_STATE = {
    redirectLink: ""
}

const UrlReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case URL_CONSTANT.REDIRECT_TO:
            return {
                ...state,
                redirectLink: action.payload
            }
        case URL_CONSTANT.RESET_REDIRECT:
            return {
                ...state,
                redirectLink: ""
            }
        default:
            return state
    }
}

export default UrlReducer