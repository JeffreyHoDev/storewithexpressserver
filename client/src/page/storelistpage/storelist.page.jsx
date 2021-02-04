import React, {useEffect, useMemo } from 'react'
import './storelist.scss'

import { Table, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom' 

import { connect } from 'react-redux'
import { DISPLAY_ADDITEM_COMPONENT, FETCH_ITEM_ASYNC } from '../../redux/storeitem/storeitem.action'

import { useTable, usePagination } from 'react-table'

const StoreListPage = ({ toggleAddItem, fetchItem, storeItem, isFetching, redirectTo }) => {

    useEffect(() => {
        fetchItem()
    },[])

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
            Header: 'Available Quantities',
            accessor: 'available_quantity'
        },
        {
            Header: 'Reserved Quantities',
            accessor: 'reserved_quantity'
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
            accessor: 'action',
            Cell: ({row}) => {
                return <Link className="link-btn" to={`/edit/${row.original.item_id}`}>Detail</Link>
            }
        }
    ], [])


    // const data = React.useMemo(() => storeItem,[])
    const data = storeItem
    
    const tableInstance = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 9} }, usePagination)
        
    const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
    state: { pageIndex, pageSize}
    } = tableInstance

    // START - To reload this page after use add the item
    if(redirectTo === 'reload'){
        fetchItem()
    }
    // END - To reload this page after use add the item

    return (
        <div className="storelist_page">
            <h2 className="storelist_title">Inhouse List</h2>
            <Button variant='info' className='addItem_btn' onClick={toggleAddItem}>Add Item</Button>
            {
                isFetching? <Spinner animation="border" variant="success" />
                :
                <div>
                    <Table {...getTableProps()}>
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
                    <ul className="pagination">
                        <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <a className="page-link">First</a>
                        </li>
                        <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <a className="page-link">{'<'}</a>
                        </li>
                        <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                            <a className="page-link">{'>'}</a>
                        </li>
                        <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            <a className="page-link">Last</a>
                        </li>
                        <li>
                            <a className="page-link">
                                Page{' '}
                                <strong>
                                    {pageIndex + 1} of {pageOptions.length}
                                </strong>{' '}
                            </a>
                        </li>
                        <li className="page-link-container">
                            <a className="page-link">
                                <input
                                    className="form-control"
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={e => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                                        gotoPage(page)
                                    }}
                                    style={{ width: '100px', height: '20px' }}
                                />
                            </a>
                        </li>{' '}
                        <select
                            className="form-control"
                            value={pageSize}
                            className="page-link-container"
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                            }}
                            style={{ width: '120px', height: '38px' }}
                        >
                            {[5, 10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                    </ul>
                </div>
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