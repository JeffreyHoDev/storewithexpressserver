import React, {useEffect} from 'react'
import './storelist.scss'

import { Table, Button, Spinner } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom' 

import { connect } from 'react-redux'
import {DISPLAY_ADDITEM_COMPONENT, FETCH_ITEM_ASYNC} from '../../redux/storeitem/storeitem.action'

const StoreListPage = ({ toggleAddItem, fetchItem, storeItem, isFetching, redirectTo }) => {

    useEffect(() => {
        fetchItem()
    },[])
    
    const history = useHistory()

    // START - To reload this page after use add the item
    if(redirectTo === 'reload'){
        history.go(0)
    }
    // END - To reload this page after use add the item

    return (
        <div className="storelist_page">
            <h2 className="storelist_title">Inhouse List</h2>
            <Button variant='info' className='addItem_btn' onClick={toggleAddItem}>Add Item</Button>
            {
                isFetching? <Spinner animation="border" variant="success" />
                :<Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Available Quantities</th>
                            <th>Reserved Quantities</th>
                            <th>Brand</th>
                            <th>Notice</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            storeItem.map(each => {
                                return (
                                    <tr>
                                        <td>{each.item_id}</td>
                                        <td>{each.item_name}</td>
                                        <td>{each.available_quantity}</td>
                                        <td>{each.reserved_quantity}</td>
                                        <td>{each.brand}</td>
                                        <td>{each.notice}</td>
                                        <td><Link to={`/edit/${each.item_id}`}>Edit</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    storeItem: state.StoreItemReducer.storeItem,
    isFetching: state.StoreItemReducer.is_fetching,
    redirectTo: state.UrlReducer.redirectLink
})

const mapDispatchToProps = dispatch => ({
    toggleAddItem: () => dispatch(DISPLAY_ADDITEM_COMPONENT),
    fetchItem: () => dispatch(FETCH_ITEM_ASYNC())
})

export default connect(mapStateToProps, mapDispatchToProps)(StoreListPage)