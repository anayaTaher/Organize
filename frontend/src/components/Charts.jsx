import React from 'react'

import BarChart from "./BarChart"
import LineChart from "./LineChart"
import DoughnutChart from "./DoughnutChart"
import "./styles/sharedStyles.css"

const Charts = () => {
	return <>
		<div className="charts">
			<div className="chart">
				<BarChart/>
				<LineChart/>
				<DoughnutChart/>
			</div>
		</div>
	</>
}

export default Charts
