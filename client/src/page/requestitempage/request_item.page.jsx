import { Table } from 'react-bootstrap'
import React, { useState, useMemo, useEffect } from 'react'
import './request_item.scss'
import "react-datetime/css/react-datetime.css";
import Datetime from 'react-datetime'

import { Redirect } from 'react-router-dom'

import RequestItemSummary from '../../component/request_item_summary/request_item_summary.component'

import { Button, Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'
import { SUBMIT_REQUEST_ASYNC, FETCH_ONE_FOR_REQUEST_ASYNC } from '../../redux/requestitem/requestitem.action'
import { FETCH_ITEM_ASYNC } from '../../redux/storeitem/storeitem.action'

import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'

const RequestItemPage = ({ profile, fetch_request_one, fetch_items, errorMessage, isFetching, redirectTo, storeItems, summaryItems, submit_request, is_submitting}) => {

    const [project_name, handleProjectName] = useState('')
    const [collection_date, handleCollectionDate] = useState('')

    useEffect(() => {
        fetch_items()
    }, [])

    function GlobalFilter({
        preGlobalFilteredRows,
        globalFilter,
        setGlobalFilter,
    }) {
        const count = preGlobalFilteredRows.length
        const [value, setValue] = useState(globalFilter)
        const onChange = useAsyncDebounce(value => {
            setGlobalFilter(value || undefined)
        }, 200)
    
        return (
            <span>
                <input
                    className="form-control"
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder="Search Item..."
                />
            </span>
        )
    }

    const columns = useMemo(() => [
        {
            Header: '#',
            accessor: 'item_id'
        },
        {
            Header: 'Item',
            accessor: 'item_name'
        },
        {
            Header: 'Brand',
            accessor: 'brand'
        },
        {
            Header: 'Notice',
            accessor: 'notice'
        },
        {
            Header: 'Action',
            Cell: ({row}) => {
                return <Button variant="primary" size="sm" className="to-summary-btn" onClick={() => fetch_request_one(row.original.item_id)}>Request</Button>
            }
        }
    ], [])


    const data = React.useMemo(() => storeItems,[])
    const tableInstance = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 5} },useFilters, useGlobalFilter, usePagination, )
        
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter}
    } = tableInstance

    if(redirectTo.length !== 0){
        return <Redirect to={redirectTo} />
    }

    return (
        <div>
        {
            isFetching ? <Spinner animation="border" variant="success" />
            :
            <div className='request_item_page'>
                <div className='request_content'>
                    <h2>Request Item</h2>
                    <div className='request_item_others'>
                        <div className='request_item_projectContainer'>
                            <label htmlFor='project' className="request-project-label">Project:</label>
                            <input type='text' className="request-project-input" onChange={(event) => handleProjectName(event.target.value)}></input>
                        </div>
                        <div className='request_item_collectiondateContainer'>
                            <label htmlFor='request_item_collectiondate' className="request-date-label">Collection Date:</label>
                            <Datetime inputProps={{
                                placeholder: "Collection Date & Time"
                            }} 
                                onChange={handleCollectionDate}
                                utc={true}
                                initialValue=""
                                name="request_item_collectiondate"
                                className="request-date-input"
                            />
                        </div>
                    </div>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={globalFilter}
                        setGlobalFilter={setGlobalFilter}
                    />
                    <Table {...getTableProps()} className="request-item-table">
                        <thead>
                        {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                            headerGroup.headers.map(column => (
                                // Apply the header cell props
                                <th {...column.getHeaderProps()}>
                                {// Render the header
                                column.render('Header')}
                                </th>
                            ))}
                            </tr>
                        ))}
                        </thead>
                        {/* Apply the table body props */}
                        <tbody {...getTableBodyProps()}>
                        {// Loop over the table rows
                        page.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                row.cells.map(cell => {
                                // Apply the cell props
                                return (
                                    <td {...cell.getCellProps()}>
                                    {// Render the cell contents
                                    cell.render('Cell')}
                                    </td>
                                )
                                })}
                            </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    <ul className="pagination-utilities">
                        <div className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            First
                        </div>
                        <div className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </div>
                        <div className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </div>
                        <div className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            Last
                        </div>
                        <div>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>{' '}
                        </div>
                        <div className="form-control-container">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={e => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                                        gotoPage(page)
                                    }}
                                    
                                />
                        </div>{' '}
                        <select
                            className="form-control-container"
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                            
                        >
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </ul>
                    <Button variant="success" type="button" className="submit-request-btn"
                        onClick={() => submit_request({
                            "collection_date": collection_date,
                            "project_name": project_name,
                            "item_details": summaryItems,
                            "requestor": profile[0]["name"]
                        })}
                        disabled={is_submitting}
                    >Submit Request</Button>
                    {errorMessage ? <p className="errorMessage">{errorMessage}</p> : null}
                </div>
                <div className='request_item_summary'>
                    <RequestItemSummary />
                </div>
            </div>
        }
        </div>
    )
}

const mapStateToProps = state => ({
    summaryItems: state.RequestItemReducer.summaryItems,
    storeItems: state.StoreItemReducer.storeItem,
    isFetching: state.StoreItemReducer.is_fetching,
    redirectTo: state.UrlReducer.redirectLink,
    errorMessage: state.RequestItemReducer.errorMessage,
    profile: state.UserReducer.profile,
    is_submitting: state.RequestItemReducer.is_submitting
})

const mapDispatchToProps = dispatch => ({
    fetch_items: () => dispatch(FETCH_ITEM_ASYNC()),
    submit_request: (dataObj) => dispatch(SUBMIT_REQUEST_ASYNC(dataObj)),
    fetch_request_one: (item_id) => dispatch(FETCH_ONE_FOR_REQUEST_ASYNC(item_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestItemPage)