import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import './addItem.scss'

import { connect } from 'react-redux'
import { DISPLAY_ADDITEM_COMPONENT, ADD_NEW_ITEM_ASYNC } from '../../redux/storeitem/storeitem.action'

const AddItem = ({displayAddItem,errorMessage, toggleAddItem, addNewItem, is_adding}) => {

    const [item_name, handleItemName] = useState('')
    const [brand, handleBrand] = useState('')
    const [available_quantity, handleAvailableQuantity] = useState(0)
    const [reserved_quantity, handleReservedQuantity] = useState(0)
    const [notice, handleNotice] = useState("")

    return ( 
    <div>
        {
            displayAddItem ?
        <div>
            <div className='background-page' onClick={toggleAddItem}></div>
            <div className={`addItem_container ${displayAddItem ? 'animate-appear' : ''} `}>
                <div className="addItem-header">
                    <h4>Add New Item</h4>
                    <Button className="cancel-btn" variant="secondary" onClick={toggleAddItem}>Cancel</Button>
                </div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Item Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter item name" onChange={(e) => handleItemName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Brand:</Form.Label>
                        <Form.Control type="text" placeholder="Enter item brand" onChange={(e) => handleBrand(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Available Quantity:</Form.Label>
                        <Form.Control type="number" placeholder="Enter current available quantities" onChange={(e) => handleAvailableQuantity(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Reserved Quantity:</Form.Label>
                        <Form.Control type="number" placeholder="Enter reserved quantities that will not display to others except Admin" onChange={(e) => handleReservedQuantity(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Notice</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Notification message to everyone about the item..." onChange={(e) => handleNotice(e.target.value)} />
                    </Form.Group>
                    <Button className="addItem-submit-btn" variant="success" type="button" 
                    onClick={() => {
                        addNewItem({
                            "item_name": item_name,
                            "brand": brand,
                            "available_quantity": available_quantity,
                            "reserved_quantity": reserved_quantity,
                            "notice": notice
                        })
                        handleBrand("")
                        handleReservedQuantity(0)
                        handleNotice("")
                    }}   
                    disabled={is_adding}
                    >
                        Submit
                    </Button>
                    <p className='errorMessage'>{errorMessage? errorMessage : null}</p>
                </Form>
            </div>
        </div>
        : null
        }
    </div>
    )
}

const mapStateToProps = (state) => ({
    displayAddItem: state.StoreItemReducer.displayAddItem,
    errorMessage: state.StoreItemReducer.errorMessage,
    is_adding: state.StoreItemReducer.is_adding
})

const mapDispatchToProps = dispatch => ({
    toggleAddItem: () => dispatch(DISPLAY_ADDITEM_COMPONENT),
    addNewItem: (dataObj) => dispatch(ADD_NEW_ITEM_ASYNC(dataObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddItem)