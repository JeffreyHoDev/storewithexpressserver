import React from 'react';
import './table.scss'
import { MDBDataTableV5 } from 'mdbreact';

import { Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'

const BasicTable = ({ storeItem, isFetching }) => {



    const [datatable, setDatatable] = React.useState({
        columns: [
          {
            label: '#',
            field: 'item_id',
            width: 270,
          },
          {
            label: 'Item Name',
            field: 'item_name',
            width: 200,
          },
          {
            label: 'Available Quantities',
            field: 'display_quantity',
            sort: 'asc',
            width: 100,
          },
          {
            label: 'Brand',
            field: 'brand',
            width: 150,
          },
          {
            label: 'Notice',
            field: 'notice',
            width: 100,
          },
        ],
        rows: storeItem
    });

  return <div>
      {
          isFetching ? <Spinner />
          :<MDBDataTableV5 hover entriesOptions={[10, 20, 25]} entries={10} pagesAmount={4} data={datatable} />
      }
  </div>
}

const mapStateToProps = state => ({
    storeItem: state.StoreItemReducer.storeItem,
    isFetching: state.StoreItemReducer.is_fetching,
})


export default connect(mapStateToProps)(BasicTable)