import React from 'react';
import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
	Interaction,
	getTheme
} from 'bizcharts';
import './pieChart.scss'

import { connect } from 'react-redux'

const PieChart = ({pie_data}) => {

	return (
		<div>
		{
			pie_data.length <= 0 ? null
			:
			<div>
				<h4 className="pieChart-title">Outbound Quantities Distribution</h4>
				<Chart height={400} data={pie_data} autoFit >
					<Coordinate type="theta" radius={0.75} />
					<Tooltip showTitle={false} />
					<Axis visible={false} />
					<Interval
						position="sum"
						adjust="stack"
						color="item_name"
						style={{
							lineWidth: 1,
							stroke: '#fff',
						}}
						label={['sum', {
							content: (data) => {
								return `${data.item_name}: ${data.sum}`;
							},
						}]}
						state={{
							selected: {
								style: (t) => {
									const res = getTheme().geometries.interval.rect.selected.style(t);
									return { ...res, fill: 'red' }
								}
							}
						}}
					/>
					<Interaction type='element-single-selected' />
				</Chart>
			</div>
		}
		</div>
	);
}

const mapStateToProps = state => ({
	pie_data: state.ChartReducer.pie_data
})

export default connect(mapStateToProps)(PieChart)
