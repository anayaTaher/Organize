import React from 'react'
import {Bar} from 'react-chartjs-2'

const BarChart = () => {
	
	const info = [
		{doneDate: 12, inProgressData: 3},
		{doneDate: 10, inProgressData: 5},
		{doneDate: 9, inProgressData: 2},
		{doneDate: 15, inProgressData: 13},
		{doneDate: 18, inProgressData: 11}
	]
	
	const data = {
		labels: ['Frontend', 'Backend', 'Database', 'UI/UX', 'Testing'],
		datasets: [
			{
				label: 'Web Application',
				data: info.map(item => item.doneDate - item.inProgressData),
				borderColor: ['#FF6384EE', '#FF6384EE', '#FF6384EE', '#FF6384EE', '#FF6384EE'],
				backgroundColor: ['#FF6384EE', '#FF6384EE', '#FF6384EE', '#FF6384EE', '#FF6384EE']
			}
		]
	}
	
	const options = {
		title: {display: true, text: 'Web Application'},
		scales: {yAxes: [{ticks: {min: 0, max: 10, stepSize: 1}}]}
	}
	
	return <Bar data={data} options={options}/>
}

export default BarChart
