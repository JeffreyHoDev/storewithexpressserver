import FULFILL_REQUEST_CONSTANT from './fulfillrequest.constant'

import { RedirectTo, ResetRedirect } from '../url/url.action'

export const FULFILL_REQUEST_START = () => ({
    type: FULFILL_REQUEST_CONSTANT.FULFILL_REQUEST_START
})

export const FULFILL_REQUEST_SUCCESS = () => ({
    type: FULFILL_REQUEST_CONSTANT.FULFILL_REQUEST_SUCCESS
})

export const FULFILL_REQUEST_FAILED = (error) => ({
    type: FULFILL_REQUEST_CONSTANT.FULFILL_REQUEST_FAILED,
    payload: error
})

export const CANCEL_REQUEST_START = () => ({
    type: FULFILL_REQUEST_CONSTANT.CANCEL_REQUEST_START
})

export const CANCEL_REQUEST_SUCCESS = () => ({
    type: FULFILL_REQUEST_CONSTANT.CANCEL_REQUEST_SUCCESS
})

export const CANCEL_REQUEST_FAILED = (error) => ({
    type: FULFILL_REQUEST_CONSTANT.CANCEL_REQUEST_FAILED,
    payload: error
})


// START - ASYNC action handler
export const FULFILL_REQUEST_ASYNC = (itemObj, request_id) => {
    return dispatch => {
        dispatch(FULFILL_REQUEST_START())
        fetch('/fulfill_request', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "request_id": request_id,
                "itemObj": itemObj
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.rowCount === itemObj.length){
                dispatch(FULFILL_REQUEST_SUCCESS())
                dispatch(RedirectTo('/request_list'))
                dispatch(ResetRedirect())
            }
            else {
                dispatch(FULFILL_REQUEST_FAILED("Something is wrong when submitting"))
            }
        })
        .catch(err => dispatch(FULFILL_REQUEST_FAILED(err)))
    }
}

export const CANCEL_REQUEST_ASYNC = (request_id) => {
    return dispatch => {
        dispatch(CANCEL_REQUEST_START())
        fetch('/cancel_request', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                "request_id": request_id
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data === 1) {
                dispatch(CANCEL_REQUEST_SUCCESS())
                dispatch(RedirectTo('/request_list'))
                dispatch(ResetRedirect())
            }
            else {
                dispatch(CANCEL_REQUEST_FAILED("Something wrong when cancelling"))
            }
        })
        .catch(err => dispatch(CANCEL_REQUEST_FAILED(err)))
    }
}
// END - ASYNC action handler
