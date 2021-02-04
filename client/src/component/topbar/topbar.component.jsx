import React from 'react'
import './topbar.scss'

import { Nav, Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'

import { TOOGLE_SIDEBAR_IN_SMALL_SCREEN } from '../../redux/scaling/scaling.action'

const Topbar = ({ profile, toogle_sidebar }) => {

    return (
        <div className='topbar-nav'>
            {
                profile.length <= 0 ? <Spinner variant="success"/>
                :
                <Nav.Item className='topbar-nav-item'>
                <div className="icon" onClick={() => toogle_sidebar()}>Icon here</div>
                    <h5>{profile[0]["name"]}</h5>
                    <h5>{profile[0]["email"]}</h5>
                    <h5>{profile[0]["role"]}</h5>
                </Nav.Item>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    profile: state.UserReducer.profile
})

const mapDispatchToProps = dispatch => ({
    toogle_sidebar: () => dispatch(TOOGLE_SIDEBAR_IN_SMALL_SCREEN())
})

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)