import React from 'react';

import { PDFDownloadLink } from '@react-pdf/renderer'
import MyDocument from './pdf.jsx'

import { connect } from 'react-redux'

import { Button } from 'react-bootstrap'

const Export = ({ requestDetail }) => {

    return (<div>
      <div className="mb5">
        {/* <button onClick={this.printDocument}>Print</button> */}
          <PDFDownloadLink document={<MyDocument requestDetail={requestDetail}/>} fileName="somename.pdf">
            {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Print')}
          </PDFDownloadLink>
      </div>
    </div>);
}

const mapStateToProps = state => ({
  requestDetail: state.RequestItemReducer.singleRequest
})

export default connect(mapStateToProps)(Export)