import React from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts';

const data = [
	{ name: 'Khammam', value: 18.56 },
	{ name: 'Mahbubnagar', value: 16.59 },
	// Add other locations
];

const LocationAnalysis = () => (
	<BarChart
		width={600}
		height={300}
		data={data}
		margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
	>
		<CartesianGrid strokeDasharray="3 3" />
		<XAxis dataKey="name" />
		<YAxis />
		<Tooltip />
		<Legend />
		<Bar dataKey="value" fill="#8884d8" />
	</BarChart>
);

export default LocationAnalysis;
