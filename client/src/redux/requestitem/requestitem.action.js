import REQUEST_ITEM_CONSTANT from './requestitem.constant'

import { RedirectTo, ResetRedirect } from '../url/url.action'

export const ADD_TO_SUMMARY = (item) => ({
    type: REQUEST_ITEM_CONSTANT.ADD_TO_SUMMARY,
    payload: item
})

export const REMOVE_FROM_SUMMARY = (item) => ({
    type: REQUEST_ITEM_CONSTANT.REMOVE_FROM_SUMMARY,
    payload: item
})

export const RESET_SUMMARY = () => ({
    type: REQUEST_ITEM_CONSTANT.RESET_SUMMARY
})

export const SUBMIT_REQUEST_START = () => ({
    type: REQUEST_ITEM_CONSTANT.SUBMIT_REQUEST_START
})

export const SUBMIT_REQUEST_SUCCESS = () => ({
    type: REQUEST_ITEM_CONSTANT.SUBMIT_REQUEST_SUCCESS
})

export const SUBMIT_REQUEST_FAILED = (error) => ({
    type: REQUEST_ITEM_CONSTANT.SUBMIT_REQUEST_FAILED,
    payload: error
})

export const FETCH_REQUEST_LIST_START = () => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_REQUEST_LIST_START
})

export const FETCH_REQUEST_LIST_SUCCESS = (data) => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_REQUEST_LIST_SUCCESS,
    payload: data
})

export const FETCH_REQUEST_LIST_FAILED = (error) => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_REQUEST_LIST_FAILED,
    payload: error
})

export const FETCH_FULFILLED_REQUEST_START = () => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_FULFILLED_REQUEST_START
})

export const FETCH_FULFILLED_REQUEST_SUCCESS = (data) => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_FULFILLED_REQUEST_SUCCESS,
    payload: data
})

export const FETCH_FULFILLED_REQUEST_FAILED = (error) => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_FULFILLED_REQUEST_FAILED,
    payload: error
})

export const FETCH_SINGLEREQUEST_START = () => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_SINGLEREQUEST_START
})

export const FETCH_SINGLEREQUEST_SUCCESS = (data) => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_SINGLEREQUEST_SUCCESS,
    payload: data
})

export const FETCH_SINGLEREQUEST_FAILED = (error) => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_SINGLEREQUEST_FAILED,
    payload: error
})

export const FETCH_ONE_FOR_REQUEST_START = () => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_ONE_FOR_REQUEST_START
})

export const FETCH_ONE_FOR_REQUEST_SUCCESS = (data) => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_ONE_FOR_REQUEST_SUCCESS,
    payload: data
})

export const FETCH_ONE_FOR_REQUEST_FAILED = (error) => ({
    type: REQUEST_ITEM_CONSTANT.FETCH_ONE_FOR_REQUEST_FAILED,
    payload: error
})

export const SHOW_REQUEST_ITEM_COMPONENT = () => ({
    type: REQUEST_ITEM_CONSTANT.SHOW_REQUEST_ITEM_COMPONENT
})

// START - ASYNC action handler
export const SUBMIT_REQUEST_ASYNC = (dataObj) => {
    return dispatch => {
        const { collection_date, item_details, project_name, requestor } = dataObj
        if(item_details.length <= 0 || project_name === "" || collection_date === ""){
            dispatch(SUBMIT_REQUEST_FAILED("Missing Details Information"))
        }
        else {
            dispatch(SUBMIT_REQUEST_START())
            fetch('/submit_request', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    "collection_date": collection_date,
                    "item_details": item_details,
                    "project_name": project_name,
                    "requestor": requestor,
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.name !== 'error'){
                    dispatch(SUBMIT_REQUEST_SUCCESS())
                    dispatch(RESET_SUMMARY())
                    dispatch(RedirectTo('/request_list'))
                    dispatch(ResetRedirect())
                }
                else {
                    dispatch(SUBMIT_REQUEST_FAILED(data.item_details))
                }
            })
            .catch(err => dispatch(SUBMIT_REQUEST_FAILED(err)))
        }
    }
}


export const FETCH_REQUEST_LIST_ASYNC = () => {
    return dispatch => {
        dispatch(FETCH_REQUEST_LIST_START())
        fetch('/fetch_request_list', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(FETCH_REQUEST_LIST_SUCCESS(data))
        })
        .catch(err => dispatch(FETCH_REQUEST_LIST_FAILED(err)))
    }
}

export const FETCH_FULFILLED_REQUEST_ASYNC = () => {
    return dispatch => {
        dispatch(FETCH_FULFILLED_REQUEST_START())
        fetch('/fetch_fulfilled_request_list', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(FETCH_FULFILLED_REQUEST_SUCCESS(data))
        })
        .catch(err => dispatch(FETCH_FULFILLED_REQUEST_FAILED(err)))
    }
}

export const FETCH_SINGLEREQUEST_ASYNC = (request_id) => {
    return dispatch => {
        dispatch(FETCH_SINGLEREQUEST_START())
        fetch('/fetch_single_request', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"request_id": request_id})
        })
        .then(response => response.json())
        .then(data => {
            dispatch(FETCH_SINGLEREQUEST_SUCCESS(data))
        })
        .catch(err => dispatch(FETCH_SINGLEREQUEST_FAILED(err)))
    }
}

export const FETCH_ONE_FOR_REQUEST_ASYNC = (item_id) => {
    return dispatch => {
        dispatch(FETCH_ONE_FOR_REQUEST_START())
        fetch('/fetch_single_item', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "item_id": item_id
            })
        })
        .then(response => response.json())
        .then(data => {
            dispatch(FETCH_ONE_FOR_REQUEST_SUCCESS(data))
            dispatch(SHOW_REQUEST_ITEM_COMPONENT())
        })
        .catch(err => dispatch(FETCH_ONE_FOR_REQUEST_FAILED(err)))
    }
}
// END - ASYNC action handler