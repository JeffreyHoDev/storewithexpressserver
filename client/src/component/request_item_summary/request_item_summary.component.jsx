import React from 'react'
import './request_item_summary.scss'

import { ListGroup, Button } from 'react-bootstrap'

import { connect } from 'react-redux'
import { REMOVE_FROM_SUMMARY } from '../../redux/requestitem/requestitem.action'

const RequestItemSummary = ({summary_items, removeFromSummary}) => {
    return (
        <div className='request_item_summary_container'>
            <h3>Summary</h3>
            {
                summary_items.map((item,index) => {
                    return(<ListGroup variant="flush" key={index}>
                        <ListGroup.Item className='summary_item'><span>{item.name} - {item.quantity}</span><Button variant="danger" onClick={() => removeFromSummary(item)}>Remove</Button></ListGroup.Item>
                    </ListGroup>)
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => ({
    summary_items: state.RequestItemReducer.summaryItems
})

const mapDispatchToProps = dispatch => ({
    removeFromSummary: item => dispatch(REMOVE_FROM_SUMMARY(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestItemSummary)