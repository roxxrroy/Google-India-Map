import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
	Legend,
	Title,
} from 'chart.js';

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend,
	Title
);

const HorizontalBarChart = () => {
	const data = {
		labels: ['Khammam', 'Warangal', 'Nalgonda'],
		datasets: [
			{
				label: 'Location Ananlysis',
				data: [18, 20, 30],
				backgroundColor: '#61DBFB',
			},
		],
	};
	const options = {
		indexAxis: 'y',
		elements: {
			bar: {
				borderWidth: 0.5,
			},
		},
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Crop Analysis',
			},
		},
	};
	return (
		<div>
			<Bar data={data} options={options}></Bar>
		</div>
	);
};

export default HorizontalBarChart;
