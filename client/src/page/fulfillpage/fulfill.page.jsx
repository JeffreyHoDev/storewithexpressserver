import React, { useEffect } from 'react'
import './fulfill.scss'

import { connect } from 'react-redux'

import { ListGroup, Button, Spinner } from 'react-bootstrap'
import { useParams, Redirect } from 'react-router-dom'

import { FETCH_SINGLEREQUEST_ASYNC } from '../../redux/requestitem/requestitem.action'
import { FULFILL_REQUEST_ASYNC, CANCEL_REQUEST_ASYNC } from '../../redux/fulfillrequest/fulfillrequest.action'

const FulfillPage = ({ redirectTo, errorMessage, fetchSingleRequest, isFetching, requestDetail, itemDetail, fulfillRequest, cancelRequest }) => {
    const { request_id } = useParams()

    useEffect(() => {
        fetchSingleRequest(request_id)
    }, [request_id])

    if(redirectTo !== ""){
        return <Redirect to={redirectTo} />
    }

    return (
        <div>
        {
            isFetching ? <Spinner animation="border" variant="success" />
            :<div className='fulfill-page'>
                <h2 className='fulfill-title'>Request ID: {request_id}</h2>
                {
                    requestDetail.length > 0 ?
                    <div>
                        <ListGroup variant="flush">
                            {   requestDetail[0]["item_details"].map((item, index) => {
                                    return <ListGroup.Item key={index}>{`${index+1}. ${item.name} - ${item.quantity}`}</ListGroup.Item>
                            })}
                        </ListGroup>
                        <div className='fulfill_others' >
                            <label htmlFor='project'>Project:</label>
                            <h6 name='project'>{requestDetail[0]["project_name"]}</h6>
                            <label htmlFor='collect_date'>Collect Date:</label>
                            <h6 name='collect_date'>{requestDetail[0]["collection_date"]}</h6>
                            <label htmlFor='requestor'>Requestor:</label>
                            <h6 name='requestor'>{requestDetail[0]["requestor"]}</h6>
                        </div>
                        {
                            requestDetail[0].status === "Fulfilled" ? null
                            :
                            <div className='action-container'>
                                <Button variant="success" type="button" onClick={() => fulfillRequest(itemDetail, request_id)}>Complete</Button>
                                <Button variant="danger" type="button" onClick={() => cancelRequest(request_id)}>Abandon</Button>
                            </div>
                        }
                        {
                            errorMessage !== "" ? <p className="errorMessage">Error occured</p>: null
                        }
                    </div>
                    : <Spinner animation="border" variant="success" />
                }

            </div>
        }
        </div>
    )
}

const mapStateToProps = state => ({
    isFetching: state.RequestItemReducer.is_singleFetching,
    requestDetail: state.RequestItemReducer.singleRequest,
    itemDetail: state.RequestItemReducer.request_items_detail,
    redirectTo: state.UrlReducer.redirectLink,
    errorMessage: state.FulfillRequestReducer.errorMessage
})

const mapDispatchToProps = dispatch => ({
    fetchSingleRequest: (request_id) => dispatch(FETCH_SINGLEREQUEST_ASYNC(request_id)),
    fulfillRequest: (itemObj, request_id) => dispatch(FULFILL_REQUEST_ASYNC(itemObj, request_id)),
    cancelRequest: (request_id) => dispatch(CANCEL_REQUEST_ASYNC(request_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FulfillPage)