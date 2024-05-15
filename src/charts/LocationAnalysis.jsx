import React, { useState } from 'react';
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
//import { dataContext } from '../context/context';
import { useSelector } from 'react-redux';
import { useGetAllDataQuery } from '../redux/api/slices/diseaseSlice';

const LocatioAnalysis = () => {
	const [selectedDistrict, setSelectedDistrict] = useState({});
	const [query, setQuery] = useState('');
	const { data: data } = useGetAllDataQuery(query);

	//const filteredData = useContext(dataContext);
	// const filteredData = useALLData();
	// const data = filteredData;
	// const results = filteredData?.data;

	const state = useSelector((state) => state);
	const results = state?.datas?.allData;

	const nameCounts = results.reduce((acc, curr) => {
		const { district } = curr;
		if (district && district.trim() !== '') {
			acc[district] = (acc[district] || 0) + 1;
		}
		return acc;
	}, {});

	// Convert the object to array of objects with name and count
	const dataR = Object.entries(nameCounts).map(([name, value]) => ({
		name,
		value,
	}));

	const handleLocationClick = (data) => {
		let queryParams = new URLSearchParams();
		queryParams.append('district', data?.name);
		setQuery(queryParams.toString());
	};

	return (
		<div style={{ height: '300px', width: '100%', overflowY: 'scroll' }}>
			<p>Location Analysis</p>
			<BarChart
				width={300}
				height={300}
				layout="vertical"
				data={dataR}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="2 2" />
				<XAxis type="number" />
				<YAxis type="category" dataKey="name" />
				<Tooltip />
				<Legend />
				<Bar
					dataKey="value"
					fill="#829eca"
					onClick={(event, index) => handleLocationClick(event, index)}
				>
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

export default LocatioAnalysis;
