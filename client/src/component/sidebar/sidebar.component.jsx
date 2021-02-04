import React from 'react'
import './sidebar.scss'

import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

import { LOGOUT } from '../../redux/user/user.action'
import { TOOGLE_SIDEBAR_IN_SMALL_SCREEN } from '../../redux/scaling/scaling.action'

const Sidebar = ({ profile, logout, display_sidebar, toggle_sidebar }) => {
    return (
        <div className={`sidebar ${display_sidebar ? "appear" : "sidebar_small_screen"}`}>
            
                {
                    profile[0]["role"] === "Admin"
                    ?
                    <nav className="sidebar-nav">
                        { display_sidebar ? <div onClick={() => toggle_sidebar()} className="toggle-btn">Toggle</div> : null}
                        <Link to="/" className='sidebar-nav-item' onClick={() => toggle_sidebar()}>Home</Link>
                        <Link to="/user_management" className='sidebar-nav-item' onClick={() => toggle_sidebar()}>User Management</Link>
                        <Link to="/request_list" className='sidebar-nav-item' onClick={() => toggle_sidebar()}>Request List</Link>
                        <Link to="/request_item" className='sidebar-nav-item' onClick={() => toggle_sidebar()}>Request Item</Link>
                        <Link to="/store_list" className='sidebar-nav-item' onClick={() => toggle_sidebar()}>Store Management</Link>
                        <Link to="/history" className='sidebar-nav-item' onClick={() => toggle_sidebar()}>History</Link>
                        <Link to="#" className='sidebar-nav-item' onClick={() => {
                            logout();
                            toggle_sidebar()
                            }}>Logout</Link>
                    </nav>
                    :
                    <nav className='sidebar-nav'>
                        <Link to="/" className='sidebar-nav-item' onClick={() => toggle_sidebar()}>Home</Link>
                        <Link to="/request_item" className='sidebar-nav-item' onClick={() => toggle_sidebar()}>Request Item</Link>
                        <Link to="/history" className='sidebar-nav-item' onClick={() => toggle_sidebar()}>History</Link>
                        <Link to="#" className='sidebar-nav-item' onClick={() => {
                            logout()
                            toggle_sidebar()
                            }}>Logout</Link>
                    </nav>
                }
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.UserReducer.profile,
    display_sidebar: state.ScalingReducer.display_sidebar
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(LOGOUT()),
    toggle_sidebar: () => dispatch(TOOGLE_SIDEBAR_IN_SMALL_SCREEN())
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)