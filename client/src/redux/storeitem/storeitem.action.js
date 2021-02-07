import STORE_ITEM_CONSTANT from './storeitem.constant.js'
import { RedirectTo, ResetRedirect } from '../url/url.action'

export const DISPLAY_ADDITEM_COMPONENT = {
    type: STORE_ITEM_CONSTANT.DISPLAY_ADDITEM_COMPONENT
}

export const ADD_NEW_ITEM_START = () => ({
    type: STORE_ITEM_CONSTANT.ADD_NEW_ITEM_START
})

export const ADD_NEW_ITEM_SUCCESS = () => ({
    type: STORE_ITEM_CONSTANT.ADD_NEW_ITEM_SUCCESS
})

export const ADD_NEW_ITEM_FAILED = (error) => ({
    type: STORE_ITEM_CONSTANT.ADD_NEW_ITEM_FAILED,
    payload: error
})

export const FETCH_ITEM_START = () => ({
    type: STORE_ITEM_CONSTANT.FETCH_ITEM_START
})

export const FETCH_ITEM_SUCCESS = (data) => ({
    type: STORE_ITEM_CONSTANT.FETCH_ITEM_SUCCESS,
    payload: data
})

export const FETCH_ITEM_FAILED = (error) => ({
    type: STORE_ITEM_CONSTANT.FETCH_ITEM_FAILED,
    payload: error
})
export const FETCH_SINGLEITEM_START = () => ({
    type: STORE_ITEM_CONSTANT.FETCH_SINGLEITEM_START
})

export const FETCH_SINGLEITEM_SUCCESS = (data) => ({
    type: STORE_ITEM_CONSTANT.FETCH_SINGLEITEM_SUCCESS,
    payload: data
})

export const FETCH_SINGLEITEM_FAILED = (error) => ({
    type: STORE_ITEM_CONSTANT.FETCH_SINGLEITEM_FAILED,
    payload: error
})

export const UPDATE_SINGLEITEM_START = () => ({
    type: STORE_ITEM_CONSTANT.UPDATE_SINGLEITEM_START
})

export const UPDATE_SINGLEITEM_SUCCESS = () => ({
    type: STORE_ITEM_CONSTANT.UPDATE_SINGLEITEM_SUCCESS
})

export const UPDATE_SINGLEITEM_FAILED = (error) => ({
    type: STORE_ITEM_CONSTANT.UPDATE_SINGLEITEM_FAILED,
    payload: error
})

// START - ASYNC action handler

export const ADD_NEW_ITEM_ASYNC = (dataObj) => {
    return dispatch => {
        dispatch(ADD_NEW_ITEM_START())
        fetch('/add_new_item', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataObj)
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === "OK"){
                dispatch(ADD_NEW_ITEM_SUCCESS())
                dispatch(DISPLAY_ADDITEM_COMPONENT)
                dispatch(RedirectTo('reload'))
                dispatch(ResetRedirect())
            }
            else{
                dispatch(ADD_NEW_ITEM_FAILED(data.detail))
            }
        })
        .catch(err => dispatch(ADD_NEW_ITEM_FAILED(err)))
    }
}

export const FETCH_ITEM_ASYNC = () => {
    return dispatch => {
        dispatch(FETCH_ITEM_START())
        fetch('/fetch_store_items', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            dispatch(FETCH_ITEM_SUCCESS(data))
        })
        .catch(err => dispatch(FETCH_ITEM_FAILED(err)))
    }
}

export const FETCH_SINGLEITEM_ASYNC = (item_id) => {
    return dispatch => {
        dispatch(FETCH_SINGLEITEM_START())
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
            dispatch(FETCH_SINGLEITEM_SUCCESS(data))
        })
        .catch(err => dispatch(FETCH_SINGLEITEM_FAILED(err)))
    }
}

export const UPDATE_SINGLEITEM_ASYNC = (dataObj) => {
    return dispatch => {
        dispatch(UPDATE_SINGLEITEM_START())
        fetch('/update_single_item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        })
        .then(response => response.json())
        .then(data => {
            if(data === 1){
                dispatch(UPDATE_SINGLEITEM_SUCCESS())
                dispatch(RedirectTo('/store_list'))
                dispatch(ResetRedirect())
            }
            else {
                dispatch(UPDATE_SINGLEITEM_FAILED("Some error occur"))
            }
        })
        .catch(err => dispatch(UPDATE_SINGLEITEM_FAILED(err)))
    }
}

// END - ASYNC action handler
