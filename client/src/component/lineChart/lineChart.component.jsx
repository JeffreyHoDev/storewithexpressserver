import React from "react";
import { Chart, Line, Point, Tooltip, Axis } from "bizcharts";
import './linechart.scss'

import { connect } from 'react-redux'

const LineChart = ({ line_data }) => {

	return (
		<div>
			<h4 className="lineChart-title">Total Outbound Quantities Trend</h4>
			<Chart
				padding={[10, 20, 50, 50]}
				autoFit
				height={500}
				data={line_data}
				scale={{ value: { min: 0, max: 10000 } }}
				// onLineMouseleave={console.log}
				// onPointClick={console.warn}
				onAxisLabelClick={(e => {
					const { axis } = e.gEvent.delegateObject;
					debugger
					alert(`you clicked axis: ${axis.get('field')}`)
				})}
			>
				<Line position="day*sum" />
				<Point position="day*sum" />
				<Tooltip showCrosshairs lock triggerOn='hover' />
				<Axis name='sum' title={{
					position: 'center'
				}} />
			</Chart>

		</div>
	);
}

const mapStateToProps = state => ({
	line_data: state.ChartReducer.line_data
})

export default connect(mapStateToProps)(LineChart)
