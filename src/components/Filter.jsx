import React, { useState, useEffect, useMemo } from 'react';
import Select from './Select';
import axios from 'axios';

const Filter = (props) => {
	console.log('props', props);
	const [stateData, setStateData] = useState([]);
	const [selectedState, setSelectedState] = useState({});
	const [districtData, setDistrictData] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState([]);
	const [cropData, setCropData] = useState([]);
	const [selectedCrop, setSelectedCrop] = useState([
		// { id: 1, label: '--Select Crop--' },
	]);
	console.log('selectedCrop', selectedCrop);

	const [diseaseData, setDiseaseData] = useState([]);
	const [selectedDisease, setSelectedDisease] = useState([
		// { id: 1, label: '--Select Disease--' },
	]);

	console.log('data inside filter', props.data);

	useEffect(() => {
		axios
			.get('http://localhost:3031/states')
			.then((res) => setStateData(res.data))
			.catch((err) => console.error(err));
	}, []);

	// Fetch districts data based on the selected state ID
	useEffect(() => {
		if (selectedState) {
			axios
				.get(`http://localhost:3031/districts?stateId=${selectedState.id}`)
				.then((res) => setDistrictData(res.data))
				.catch((err) => console.error(err));
		}
	}, []);

	useEffect(() => {
		axios
			.get('http://localhost:3031/crops')
			.then((res) => setCropData(res.data))
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		axios
			.get('http://localhost:3031/diseases')
			.then((res) => setDiseaseData(res.data))
			.catch((err) => console.error(err));
	}, []);

	// useEffect(() => {
	// 	axios
	// 		.get('http://localhost:3031/data')
	// 		.then((res) => setData(res.data))
	// 		.catch((err) => console.error(err));
	// }, []);

	const handleApplyClick = () => {
		let queryParams = new URLSearchParams();

		// Conditionally append parameters if they exist and are not undefined
		if (selectedCrop.length > 0) {
			selectedCrop.forEach((crop) => {
				queryParams.append('cropid', crop.id);
			});
		}

		if (selectedDisease && selectedDisease.id) {
			queryParams.append('diseaseid', selectedDisease.id);
		}
		if (selectedState && selectedState.id) {
			queryParams.append('state_code', selectedState.id);
		}
		if (selectedDistrict && selectedDistrict.id) {
			queryParams.append('districtid', selectedDistrict.id);
		}

		// Convert URLSearchParams to string for the request
		queryParams = queryParams.toString();
		console.log('queryParams', queryParams); // Log the final query string

		axios
			.get(`http://localhost:3031/data?${queryParams}`)
			.then((res) => {
				console.log('Filtered Data:', res.data);
				props.setData(res.data);
				// You can set this data to state to display or handle it as needed
			})
			.catch((err) => console.error('Error fetching filtered data:', err));
	};

	const handleResetClick = () => {
		setSelectedState({});
		setSelectedDistrict([]);
		setSelectedCrop([]);
		setSelectedDisease([]);
	};

	const defaultSelectedCrop = [{ id: 1, label: '--Select Crop--' }];
	const defaultSelectedDisease = [{ id: 1, label: '--Select Disease--' }];

	return (
		<div className="card-container" style={{ border: '2px solid' }}>
			{/* <Select
				className="md:w-48 md:ml-4 mt-2 md:mt-0 z-20"
				optionsClassName="w-48"
				btnClassName="bg-white"
				selectOptions={stateData}
				setSelectedValue={setSelectedState}
				selectedValue={selectedState}
				isLoading={false}
				disabled={stateData?.length < 2}
				multiple
			/>
			<Select
				className="md:w-48 md:ml-4 mt-2 md:mt-0 z-20"
				optionsClassName="w-48"
				btnClassName={`${
					districtData.length < 2 || stateLabels.includes(selectedState.label)
						? 'bg-disableColor'
						: 'bg-white'
				}`}
				selectOptions={districtData}
				setSelectedValue={setSelectedDistrict}
				selectedValue={selectedDistrict}
				isLoading={false}
				disabled={
					districtData.length < 2 || stateLabels.includes(selectedState.label)
				}
				defaultSelectedValue={defaultSelectedDistrict}
				multiple
			/> */}
			<Select
				className="md:w-40 mt-2 md:mt-0 z-20"
				optionsClassName="w-40"
				btnClassName={`${cropData.length < 1 ? 'bg-disableColor' : 'bg-white'}`}
				selectOptions={cropData.map((crop) => ({
					id: crop.cropId,
					label: crop.cropName,
				}))}
				setSelectedValue={setSelectedCrop}
				selectedValue={selectedCrop}
				isLoading={false}
				disabled={cropData?.length < 1}
				defaultSelectedValue={defaultSelectedCrop}
				multiple
			/>
			<Select
				className="md:w-40 mt-2 md:mt-0 z-20"
				optionsClassName="w-40"
				btnClassName={`${
					diseaseData.length < 1 ? 'bg-disableColor' : 'bg-white'
				}`}
				selectOptions={diseaseData.map((disease) => ({
					id: disease.diseaseId,
					label: disease.diseaseName,
				}))}
				setSelectedValue={setSelectedDisease}
				selectedValue={selectedDisease}
				isLoading={false}
				disabled={diseaseData?.length < 1}
				multiple
			/>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0"
				onClick={handleResetClick}
			>
				Reset
			</button>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-0 ml-2"
				onClick={handleApplyClick}
			>
				Apply
			</button>
		</div>
	);
};

export default Filter;
