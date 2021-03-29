import React, { useState, useEffect } from 'react'
import './edititem.scss'

import { connect } from 'react-redux'

import { Form, Button, Spinner } from 'react-bootstrap'
import { useParams, Redirect } from 'react-router-dom'

import { FETCH_SINGLEITEM_ASYNC, UPDATE_SINGLEITEM_ASYNC } from '../../redux/storeitem/storeitem.action'

const EditItemPage = ({ itemDetail, fetchDetail, singleItemFetching, updateItem, redirectTo }) => {
    const { item_id } = useParams()

    const [new_quantity, handleNewQuantity] = useState(0)
    const [reserved_quantity, handleReservedQuantity] = useState(0)
    const [new_notice, handleNotice] = useState('')

    useEffect(() => {
        fetchDetail(item_id)
    }, [])

    if(redirectTo.length !== 0){
        return <Redirect to={`${redirectTo}`}/>
    }

    return (
        <div>
            {
                itemDetail.length > 0 ?
                <div className='edititem_page'>
                    <h2 className="edititem_title">Edit Item {item_id}</h2>
                    {
                        singleItemFetching ? <Spinner animation="border" variant="success" />
                        :
                        <Form>
                            <Form.Group>
                                <Form.Label><span>Item Name:</span> </Form.Label>
                                <Form.Control plaintext readOnly defaultValue={itemDetail[0].item_name} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><span>Previous Available Quantities:</span> </Form.Label>
                                <Form.Control plaintext readOnly defaultValue={itemDetail[0].available_quantity} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><span>Previous Reserved Quantities:</span> </Form.Label>
                                <Form.Control plaintext readOnly defaultValue={itemDetail[0].reserved_quantity} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Previous Notice</Form.Label>
                                <Form.Control as="textarea" rows={4} readOnly defaultValue={itemDetail[0].notice}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><span>Brand:</span> </Form.Label>
                                <Form.Control plaintext readOnly defaultValue={itemDetail[0].brand} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><span>Current Available Quantities:</span> </Form.Label>
                                <Form.Control size='sm' type="number" placeholder="Current available quantities" defaultValue={itemDetail[0].available_quantity} min='0' onChange={(e) => handleNewQuantity(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label><span>Current Reserved Quantities:</span> </Form.Label>
                                <Form.Control size='sm' type="number" placeholder="Current reserved quantities" defaultValue={itemDetail[0].reserved_quantity} min='0' onChange={(e) => handleReservedQuantity(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>New Notice</Form.Label>
                                <Form.Control as="textarea" rows={4} onChange={(e) => handleNotice(e.target.value) }/>
                            </Form.Group>
                            <Button variant="success" type="button" 
                            onClick={() => updateItem({
                                    "item_id": item_id,
                                    "available_quantity": new_quantity,
                                    "reserved_quantity": reserved_quantity,
                                    "notice": new_notice
                                    })
                                }
                            >
                                Save & Edit
                            </Button>
                        </Form>            
                    }
                </div>: <Spinner animation="border" variant="success" />
            }

        </div>
    )
}

const mapStateToProps = state => ({
    itemDetail: state.StoreItemReducer.singleItem,
    singleItemFetching: state.StoreItemReducer.singleItem_is_fetching,
    redirectTo: state.UrlReducer.redirectLink
})

const mapDispatchToProps = dispatch => ({
    fetchDetail: (id) => dispatch(FETCH_SINGLEITEM_ASYNC(id)),
    updateItem: (obj) => dispatch(UPDATE_SINGLEITEM_ASYNC(obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditItemPage)