import React from 'react'
import {Line} from 'react-chartjs-2'

function LineChart() {
	
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
				borderColor: ['#36C0B2FF'],
				backgroundColor: ['#36C0B27F'],
				pointBackgroundColor: '#DD0',
				pointBorderColor: '#DD0'
			}
		]
	}
	const options = {
		title: {display: true, text: 'Mobile Application'},
		scales: {yAxes: [{ticks: {min: 0, max: 10, stepSize: 1}}]}
	}
	
	return <Line data={data} options={options}/>
}

export default LineChart
