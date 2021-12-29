import React from 'react'
import {Doughnut} from 'react-chartjs-2'

function DoughnutChart() {
	
	const info = [
		{doneDate: 12, inProgressData: 3},
		{doneDate: 10, inProgressData: 5},
		{doneDate: 9, inProgressData: 2},
		{doneDate: 18, inProgressData: 13},
		{doneDate: 15, inProgressData: 12}
	]
	
	const data = {
		labels: ['Frontend', 'Backend', 'Database', 'UI/UX', 'Testing'],
		datasets: [
			{
				data: info.map(item => item.doneDate - item.inProgressData),
				backgroundColor: ['#FF6384FF', '#FFCD56FF', '#36A2EBFF', '#36C0B2FF','#FF9F40FF']
			}
		]
	}
	
	const options = {
		title: {display: true, text: 'All Project'}
	}
	
	return <Doughnut data={data} options={options}/>
}

export default DoughnutChart
