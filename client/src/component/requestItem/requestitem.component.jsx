import React, { useState } from 'react'
import './requestitem.scss'

import { Spinner, Form, Button } from 'react-bootstrap'

import { connect } from 'react-redux'

import { SHOW_REQUEST_ITEM_COMPONENT, ADD_TO_SUMMARY } from '../../redux/requestitem/requestitem.action'

const RequestItemComponent = ({ showRequestComponent, toggleRequestComponent, singleRequest, add_to_summary }) => {

    const [requestQuantity, handleQuantity] = useState(0)

    return (
        <div>
            {
                showRequestComponent?
                <div>
                    <div className="request_item_component_background" onClick={() => toggleRequestComponent()}></div>
                    {
                        singleRequest.length > 0 
                        ?
                        <div className='request_item_component_container'>
                            <Form>
                                <Form.Group>
                                    <Form.Label><span>Item Name:</span> </Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={singleRequest[0].item_name} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><span>Brand:</span> </Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={singleRequest[0].brand} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><span>Available Quantities:</span> </Form.Label>
                                    <Form.Control plaintext readOnly defaultValue={singleRequest[0].available_quantity - singleRequest[0].reserved_quantity} />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Notice</Form.Label>
                                    <Form.Control as="textarea" rows={4} readOnly defaultValue={singleRequest[0].notice}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label><span>Request Quantities:</span> </Form.Label>
                                    <Form.Control size='sm' type="number" placeholder="Request your quantity of item" min='0' onChange={(e) => handleQuantity(e.target.value)} />
                                </Form.Group>
                                <Button variant="success" type="button" onClick={() => add_to_summary({
                                    "name": singleRequest[0].item_name,
                                    "quantity": requestQuantity,
                                    "item_id": singleRequest[0].item_id
                                })}>
                                    Add to Summary
                                </Button>
                            </Form>    
                        </div>
                        : <Spinner variant="success"/>
                    }
                </div> 
                : null
            }
        </div>
    )
}

const mapStateToProps = state => ({
    showRequestComponent: state.RequestItemReducer.showRequestComponent,
    singleRequest: state.RequestItemReducer.oneItemRequest
})

const mapDispatchToProps = dispatch => ({
    toggleRequestComponent: () => dispatch(SHOW_REQUEST_ITEM_COMPONENT()),
    add_to_summary: (data) => dispatch(ADD_TO_SUMMARY(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestItemComponent)