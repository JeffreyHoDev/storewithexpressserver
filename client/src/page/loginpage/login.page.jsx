import React, { useState } from 'react'
import './login.scss'

import { connect } from 'react-redux'

import { Redirect } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'
import { LOGIN_USER_ASYNC } from '../../redux/user/user.action'


const LoginPage = ({ login, redirectTo, errorMessage }) => {

    const [name, handleName] = useState('')
    const [password, handlePassword] = useState('')
    const [email, handleEmail] = useState('')

    if(redirectTo !== "") {
        return <Redirect to={redirectTo}/>
    }
    
    return (
        <div className='loginpage'>
            <h2>Welcome to Store Platform v1.0</h2>
            <Form className="login-form">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => handleEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your registered name" onChange={(e) => handleName(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => handlePassword(e.target.value)} />
                </Form.Group>
                <Button variant="success" onClick={() => {
                    if(name === "" || password === "" || email === ""){
                    }
                    else {
                        login({
                        "name": name,
                        "password": password,
                        "email": email
                        })
                    }
                }}>
                    Submit
                </Button>
                <p className="demo-message">Please use the following to login (Demo)</p>
                <p className="demo-message">Email: demo@demo.com</p>
                <p className="demo-message">Name: Demo</p>
                <p className="demo-message">Password: Demo12345</p>
                {errorMessage !== "" ? <h4>{JSON.stringify(errorMessage)}</h4> : null}
            </Form>
        </div>
    )
}

const mapStateToProps = state => ({
    isLoggedIn: state.UserReducer.isLoggedIn,
    redirectTo: state.UrlReducer.redirectLink,
    errorMessage: state.UrlReducer.errorMessage
})

const mapDispatchToProps = dispatch =>  ({
    login: (data) => dispatch(LOGIN_USER_ASYNC(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);