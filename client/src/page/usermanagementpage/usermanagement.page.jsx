import React, { useEffect } from 'react'
import './usermanagement.scss'

import { Button, Table, Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'
import { SHOW_VERIFICATION_COMPONENT } from '../../redux/verification/verification.action'
import { FETCH_USERS_ASYNC } from '../../redux/user/user.action'

const UserManagementPage = ({ userList, showVerification, fetchUsers, is_fetching, redirectTo }) => {

    if(redirectTo === "reload"){
        fetchUsers()
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
        {
            is_fetching ? <Spinner animation="border" variant="success" />
            :
            <div className="user_management_page">
                <h2 className="user_management_title">User List</h2>
                <Button variant='info' className='addUser_btn' onClick={() => showVerification(null)}>Add User</Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        userList.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td><Button variant="danger" size="sm" className="delete-btn" onClick={() => showVerification(user.id)}>Delete</Button></td>
                                </tr>
                            )
                        }) 
                        }
                    </tbody>
                </Table>
            </div>
        }
        </div>
    )
}

const mapStateToProps = state => ({
    userList: state.UserReducer.user_list,
    is_fetching: state.UserReducer.is_fetching,
    redirectTo: state.UrlReducer.redirectLink
})

const mapDispatchToProps = dispatch => ({
    showVerification: (id) => dispatch(SHOW_VERIFICATION_COMPONENT(id)),
    fetchUsers: () => dispatch(FETCH_USERS_ASYNC())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage)