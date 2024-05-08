import React, { useContext } from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	LabelList,
} from 'recharts';
import { dataContext } from '../context/context';

const CropAnalysis = () => {
	const filteredData = useContext(dataContext);
	const results = filteredData?.data;

	// Use reduce to count occurrences of each name
	const nameCounts = results.reduce((acc, curr) => {
		const { cropname } = curr;
		// Increment count for the current name, or initialize it to 1 if not exists
		acc[cropname] = (acc[cropname] || 0) + 1;
		return acc;
	}, {});

	// Convert the object to array of objects with name and count
	const data = Object.entries(nameCounts).map(([name, value]) => ({
		name,
		value,
	}));

	return (
		<div style={{ maxHeight: '200px' }}>
			<BarChart
				width={600}
				height={300}
				layout="vertical"
				data={data}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="2 2" />
				<XAxis type="number" />
				<YAxis type="category" dataKey="name" />
				<Tooltip />
				<Legend />
				<Bar dataKey="value" fill="#829eca">
					<LabelList
						dataKey="value"
						position="right"
						formatter={(value) => `${value}%`}
					/>
				</Bar>
				<XAxis
					dataKey="Crop Analysis"
					axisLine={false}
					tickLine={false}
					height={2}
				/>
			</BarChart>
		</div>
	);
};

export default CropAnalysis;
