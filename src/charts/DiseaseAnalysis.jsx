import React, { useState, useContext } from 'react';
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
import { useALLData } from '../hooks/dataHook';
import { dataContext } from '../context/context';
import { useSelector } from 'react-redux';
import { useGetAllDataQuery } from '../redux/api/slices/diseaseSlice';

const DiseaseAnalysis = () => {
	const [selectedDisease, setSelectedDisease] = useState({});
	const [query, setQuery] = useState('');

	const { data: data } = useGetAllDataQuery(query);

	//const filteredData = useContext(dataContext);
	const state = useSelector((state) => state);
	//const filteredData = useALLData();
	const results = state?.datas?.allData;
	// console.log('filteredData ----->', filteredData);
	// const results = filteredData?.data;

	const nameCounts = results.reduce((acc, curr) => {
		const { diseasename } = curr;
		acc[diseasename] = (acc[diseasename] || 0) + 1;
		return acc;
	}, {});

	// Convert the object to array of objects with name and count
	const dataR = Object.entries(nameCounts).map(([name, value]) => ({
		name,
		value,
	}));

	const handleDiseaseClick = (data) => {
		console.log('It is clicked', data);
		let queryParams = new URLSearchParams();
		queryParams.append('diseasename', data?.name);
		setQuery(queryParams.toString());
	};

	return (
		<div style={{ height: '1000px', width: '100%', overflowY: 'scroll' }}>
			<p>Disease Analysis</p>
			<BarChart
				width={600}
				height={600}
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
					onClick={(event, index) => handleDiseaseClick(event, index)}
				>
					<LabelList
						dataKey="value"
						position="right"
						formatter={(value) => `${value}%`}
					/>
				</Bar>
				<XAxis
					dataKey="Disease Analysis"
					axisLine={false}
					tickLine={false}
					height={2}
				/>
			</BarChart>
		</div>
	);
};

export default DiseaseAnalysis;
