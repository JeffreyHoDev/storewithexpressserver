import { USER_CONSTANT } from './user.constant'

import { RedirectTo, ResetRedirect } from '../url/url.action'
import { RESET_AUTHORIZED } from '../verification/verification.action'

export const DELETE_USER_FROM_DATABASE_START = () => ({
    type: USER_CONSTANT.DELETE_USER_FROM_DATABASE_START
})

export const DELETE_USER_FROM_DATABASE_SUCCESS = () => ({
    type: USER_CONSTANT.DELETE_USER_FROM_DATABASE_SUCCESS
})

export const DELETE_USER_FROM_DATABASE_FAILED = () => ({
    type: USER_CONSTANT.DELETE_USER_FROM_DATABASE_FAILED
})

export const FETCH_USER_FROM_DATABASE_START = () => ({
    type: USER_CONSTANT.FETCH_USER_FROM_DATABASE_START
})

export const FETCH_USER_FROM_DATABASE_SUCCESS = (userList) => ({
    type: USER_CONSTANT.FETCH_USER_FROM_DATABASE_SUCCESS,
    payload: userList
})

export const FETCH_USER_FROM_DATABASE_FAILED = (error) => ({
    type: USER_CONSTANT.FETCH_USER_FROM_DATABASE_FAILED,
    payload: error
})

export const FETCH_SINGLEUSER_FROM_DATABASE_START = () => ({
    type: USER_CONSTANT.FETCH_SINGLEUSER_FROM_DATABASE_START
})

export const FETCH_SINGLEUSER_FROM_DATABASE_SUCCESS = (userList) => ({
    type: USER_CONSTANT.FETCH_SINGLEUSER_FROM_DATABASE_SUCCESS,
    payload: userList
})

export const FETCH_SINGLEUSER_FROM_DATABASE_FAILED = (error) => ({
    type: USER_CONSTANT.FETCH_SINGLEUSER_FROM_DATABASE_FAILED,
    payload: error
})

export const ADD_NEW_USER_START = () => ({
    type: USER_CONSTANT.ADD_NEW_USER_START
})
export const ADD_NEW_USER_SUCCESS = () => ({
    type: USER_CONSTANT.ADD_NEW_USER_SUCCESS
})
export const ADD_NEW_USER_FAILED = (error) => ({
    type: USER_CONSTANT.ADD_NEW_USER_FAILED,
    payload: error
})

export const LOGIN_USER_START = () => ({
    type: USER_CONSTANT.LOGIN_USER_START
})
export const LOGIN_USER_SUCCESS = (data) => ({
    type: USER_CONSTANT.LOGIN_USER_SUCCESS,
    payload: data
})
export const LOGIN_USER_FAILED = (error) => ({
    type: USER_CONSTANT.LOGIN_USER_FAILED,
    payload: error
})

export const LOGOUT = () => ({
    type: USER_CONSTANT.LOGOUT
})


// START - ASYNC action handler
export const DELETE_USER_ASYNC = (user_id) => {
    return dispatch => {
        dispatch(DELETE_USER_FROM_DATABASE_START())
        fetch('http://localhost:50000/delete_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': user_id
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data === 1){
                dispatch(DELETE_USER_FROM_DATABASE_SUCCESS())
                dispatch(RESET_AUTHORIZED())
                dispatch(RedirectTo('reload'))
                dispatch(ResetRedirect())
            }
            else {
                dispatch(DELETE_USER_FROM_DATABASE_FAILED())
            }
        })
        .catch(err => dispatch(DELETE_USER_FROM_DATABASE_FAILED()))

    }
}

export const ADD_NEW_USER_ASYNC = (email, name, role, password) => {
    return dispatch => {
        dispatch(ADD_NEW_USER_START())
        fetch('http://localhost:50000/add_new_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'password': password,
                'role': role
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.name === "error"){
                dispatch(ADD_NEW_USER_FAILED(data.detail))
            }
            else {
                dispatch(ADD_NEW_USER_SUCCESS())
                dispatch(RESET_AUTHORIZED())
                dispatch(RedirectTo('reload'))
                dispatch(ResetRedirect())

            }
        })
        .catch(err => dispatch(ADD_NEW_USER_FAILED(err)))
    }
}

export const FETCH_USERS_ASYNC = () => {
    return dispatch => {
        dispatch(FETCH_USER_FROM_DATABASE_START)
        fetch('http://localhost:50000/fetch_users',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            dispatch(FETCH_USER_FROM_DATABASE_SUCCESS(data))
        })
        .catch(err => dispatch(FETCH_USER_FROM_DATABASE_FAILED(err)))
    }
}

export const FETCH_SINGLEUSER_ASYNC = (id) => {
    return dispatch => {
        dispatch(FETCH_SINGLEUSER_FROM_DATABASE_START)
        fetch('http://localhost:50000/fetch_single_user',{
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                'id': id
            })
        })
        .then(response => response.json())
        .then(data => {
            dispatch(FETCH_SINGLEUSER_FROM_DATABASE_SUCCESS(data))
        })
        .catch(err => dispatch(FETCH_SINGLEUSER_FROM_DATABASE_FAILED(err)))
    }
}

export const LOGIN_USER_ASYNC = (data) => {
    return dispatch => {
        dispatch(LOGIN_USER_START())
        fetch('http://localhost:50000/login_user', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            dispatch(LOGIN_USER_SUCCESS(result))
            dispatch(RedirectTo('/'))
            dispatch(ResetRedirect())
        })
        .catch(err => dispatch(LOGIN_USER_FAILED(err)))
    }
}
// END - ASYNC action handler
