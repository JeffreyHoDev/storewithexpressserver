import React, { useState } from 'react'
import './adduser.scss'

import { Form, Button, Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'
import { RESET_AUTHORIZED } from '../../redux/verification/verification.action'
import { ADD_NEW_USER_ASYNC } from '../../redux/user/user.action'

const AddUser = ({authorized, capturedID, resetAuthorized, addUser, errorMessage, isAdding}) => {
    const [new_email, handleEmail] = useState('')
    const [new_name, handleName] = useState('')
    const [new_role, handleRole] = useState('Admin')
    const [new_password, handlePassword] = useState('')
    return (
        <div>
            {
                authorized && capturedID === null
                ?<div>
                    <div className="adduser-background" onClick={() => resetAuthorized()}></div>
                    <div className="adduser-container">
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" onChange={(e) => handleEmail(e.target.value)} required/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => handleName(e.target.value)} required/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select" onChange={(e) => handleRole(e.target.value)}>
                                <option>Admin</option>
                                <option>Basic</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required onChange={(e) => handlePassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={() => addUser(new_email, new_name, new_role, new_password)}>
                                Add User 
                                {isAdding ? <Spinner animation="border" variant="success" /> : null}
                            </Button>
                            {
                                errorMessage.length !== 0? <p>{JSON.stringify(errorMessage)}</p>: null
                            }
                        </Form>    
                    </div>
                </div>: null
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    authorized: state.verificationReducer.authorized,
    capturedID: state.verificationReducer.capturedID,
    errorMessage: state.UserReducer.errorMessage,
    isAdding: state.UserReducer.is_adding
})

const mapDispatchToProps = dispatch => ({
    resetAuthorized: () => dispatch(RESET_AUTHORIZED()),
    addUser: (email,name, role, password) => dispatch(ADD_NEW_USER_ASYNC(email, name, role, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddUser)