import React, { useEffect } from 'react'
import './requestlist.scss'
import { Table, Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'

import { Link, useLocation } from 'react-router-dom'

import { FETCH_REQUEST_LIST_ASYNC, FETCH_FULFILLED_REQUEST_ASYNC } from '../../redux/requestitem/requestitem.action'

const RequestListPage = ({ fetch_fulfilled_requests, fetch_requests, isFetching, requestList }) => {

    const location = useLocation()

    useEffect(() => {
        if(location.pathname === "/request_list"){
            fetch_requests()
        }
        else {
            fetch_fulfilled_requests()
        }
    }, [location])

    return (
        <div>
        {
            isFetching ? <Spinner animation="border" variant="success" />
            :
            <div className='requestlist_page'>
                <h3>{ location.pathname === "/request_list" ? 'Request List' : 'History'}</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Project</th>
                            <th>Requestor</th>
                            <th>Collect Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        requestList.map(request => {
                            return (    
                            <tr key={request.request_id}>
                                <td>{request.request_id}</td>
                                <td>{request.project_name}</td>
                                <td>{request.requestor}</td>
                                <td>{request.collection_date}</td>
                                <td><Link className="link-btn" to={`/fulfill/${request.request_id}`}>Detail</Link></td>
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
    isFetching: state.RequestItemReducer.is_fetching,
    requestList: state.RequestItemReducer.requestList
})

const mapDispatchToProps = dispatch => ({
    fetch_requests: () => dispatch(FETCH_REQUEST_LIST_ASYNC()),
    fetch_fulfilled_requests: () => dispatch(FETCH_FULFILLED_REQUEST_ASYNC())
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestListPage)