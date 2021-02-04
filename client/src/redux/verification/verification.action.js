import {VERIFICATION_CONSTANT} from './verification.constant'

export const SHOW_VERIFICATION_COMPONENT = (id) => ({
    type: VERIFICATION_CONSTANT.SHOW_VERIFICATION_COMPONENT,
    payload: id
})

export const CLOSE_DISPLAY = {
    type: VERIFICATION_CONSTANT.CLOSE_DISPLAY
}

export const VERIFY_START = () => ({
    type: VERIFICATION_CONSTANT.VERIFY_START
})

export const VERIFY_SUCCESS = () => ({
    type: VERIFICATION_CONSTANT.VERIFY_SUCCESS
})

export const VERIFY_FAILED = (error) => ({
    type: VERIFICATION_CONSTANT.VERIFY_FAILED,
    payload: error
})

export const RESET_AUTHORIZED = () => ({
    type: VERIFICATION_CONSTANT.RESET_AUTHORIZED
})

export const verify_authorized_personAsync = (email, password) => {
    return dispatch => {
        dispatch(VERIFY_START())
        fetch('http://localhost:50000/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': 'Ho Kah Wai',
                'email': email,
                'password': password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data !== "OK"){
                throw Error("Failed")
            }
            else {
                dispatch(VERIFY_SUCCESS())
                dispatch(CLOSE_DISPLAY)
            }
        })
        .catch(err => {
            dispatch(VERIFY_FAILED(err))
        })
    }
}