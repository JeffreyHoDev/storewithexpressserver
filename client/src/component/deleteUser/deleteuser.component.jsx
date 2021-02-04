import React, { useEffect } from 'react'
import './deleteuser.scss'

import { Button, Form, Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'
import { RESET_AUTHORIZED } from '../../redux/verification/verification.action'
import { DELETE_USER_ASYNC, FETCH_SINGLEUSER_ASYNC } from '../../redux/user/user.action'

const DeleteUser = ({ singleUser, fetchUser, authorized, capturedID, resetAuthorized, deleteUserAsync, isDeleting }) => {
    
    useEffect(() => {
        fetchUser(capturedID)
    }, [capturedID])

    return (
        <div>
        {
            authorized && capturedID !== null ?
            singleUser.length > 0 ?
            <div>
                <div className="deleteuser-background" onClick={()=> resetAuthorized()}></div>
                <div className="deleteuser-container">
                <h3>Confirm Delete?</h3>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={singleUser[0].email} readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={singleUser[0].name} readOnly/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" value={singleUser[0].role} readOnly/>
                    </Form.Group>
                    <Button variant="danger" type="button" onClick={() => deleteUserAsync(capturedID)}>
                        Delete
                        {isDeleting ? <Spinner animation="border" variant="success" />: null}
                    </Button>
                </Form>
                </div>
            </div>: <Spinner />
            : null
        }
        </div>
    )
}

const mapStateToProps = (state) => ({
    authorized: state.verificationReducer.authorized,
    capturedID: state.verificationReducer.capturedID,
    isDeleting: state.UserReducer.is_deleting,
    isFetching: state.UserReducer.is_fetching,
    singleUser: state.UserReducer.singleUser
})

const mapDispatchToProps = dispatch => ({
    resetAuthorized: () => dispatch(RESET_AUTHORIZED()),
    deleteUserAsync: (user_id) => dispatch(DELETE_USER_ASYNC(user_id)),
    fetchUser: (user_id) => dispatch(FETCH_SINGLEUSER_ASYNC(user_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser)