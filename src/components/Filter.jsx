import React, { useState, useEffect } from 'react';
import Select from './Select';
import axios from 'axios';
//import { dataContext } from '../context/context';
import { useGetAllDataQuery } from '../redux/api/slices/diseaseSlice';

const Filter = () => {
	const [stateData, setStateData] = useState([]);
	const [selectedState, setSelectedState] = useState({});
	const [districtData, setDistrictData] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState([]);
	// const [cropData, setCropData] = useState([]);
	// const [selectedCrop, setSelectedCrop] = useState([]);
	// const [diseaseData, setDiseaseData] = useState([]);
	// const [selectedDisease, setSelectedDisease] = useState([]);
	const [query, setQuery] = useState('');
	//const { data, setData } = useContext(dataContext);
	const { data: data } = useGetAllDataQuery(query);

	useEffect(() => {
		axios
			.get('http://localhost:3031/states')
			.then((res) => setStateData(res?.data))
			.catch((err) => console.error(err));
	}, []);

	// Fetch districts data based on the selected state ID
	useEffect(() => {
		if (selectedState) {
			// Define your bearer token
			//const bearerToken = 'your_bearer_token_here';

			axios
				.get(
					`https://api.bighaat.com/farmer-traceability-service/api/farm/FT-get-districts-by-StateId?stateId=${selectedState?.id}&api-version=1.0`,
					{
						headers: {
							authorization:
								'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijk2NjY4OTY1MjEiLCJuYmYiOjE3MTM3Njg0MjEsImV4cCI6MTcxNDM3MzIyMSwiaWF0IjoxNzEzNzY4NDIxfQ.fpkNW4B2EVDifMQjhrjJqcRgatFO2nmx7OsvUwIFbwQ',
						},
					}
				)
				.then((res) => setDistrictData(res.data))
				.catch((err) => console.error(err));
		}
	}, [selectedState]);

	// useEffect(() => {
	// 	axios
	// 		.get('http://localhost:3031/crops')
	// 		.then((res) => setCropData(res.data))
	// 		.catch((err) => console.error(err));
	// }, []);

	// useEffect(() => {
	// 	axios
	// 		.get('http://localhost:3031/diseases')
	// 		.then((res) => setDiseaseData(res.data))
	// 		.catch((err) => console.error(err));
	// }, []);

	useEffect(() => {
		setSelectedState({
			id: '0000-0000-0000-0000',
			label: '--Select State--',
			stateId: stateData?.length ? stateData[0].id : 0,
		});
	}, [stateData]);

	useEffect(() => {
		setSelectedDistrict([
			{
				id: '0000-0000-0000-0000',
				label: '--Select District--',
				districtsId: districtData?.length ? districtData[0].id : 0,
			},
		]);
	}, [districtData]);

	// useEffect(() => {
	// 	setSelectedCrop([
	// 		{
	// 			id: '0000-0000-0000-0000',
	// 			label: '--Select Crop--',
	// 			cropId: cropData?.length ? cropData[0].id : 0,
	// 		},
	// 	]);
	// }, [cropData]);

	// useEffect(() => {
	// 	setSelectedDisease([
	// 		{
	// 			id: '0000-0000-0000-0000',
	// 			label: '--Select Disease--',
	// 			diseaseId: diseaseData?.length ? diseaseData[0].id : 0,
	// 		},
	// 	]);
	// }, [diseaseData]);

	const handleApplyClick = () => {
		let queryParams = new URLSearchParams();

		// Conditionally append parameters if they exist and are not undefined
		// if (selectedCrop.length && selectedCrop[0]?.label !== '--Select Crop--') {
		// 	selectedCrop.forEach((crop) => {
		// 		queryParams.append('cropId', crop?.id);
		// 	});
		// }
		// if (
		// 	selectedDisease.length &&
		// 	selectedDisease[0]?.label !== '--Select Disease--'
		// ) {
		// 	selectedDisease.forEach((disease) => {
		// 		queryParams.append('diseaseId', disease?.id);
		// 	});
		// 	// queryParams.append('diseaseId', selectedDisease.id);
		// }
		if (selectedState && selectedState?.label !== '--Select State--') {
			queryParams.append('state', selectedState?.label);
		}
		if (
			selectedDistrict.length &&
			selectedDistrict[0]?.label !== '--Select District--'
		) {
			selectedDistrict.forEach((district) => {
				queryParams.append('district', district?.label);
			});
		}

		// Convert URLSearchParams to string for the request
		setQuery(queryParams.toString());
		// queryParams = queryParams.toString();
		// console.log('queryParams', queryParams); // Log the final query string

		// axios
		// 	.get(`http://localhost:3031/data?${queryParams}`)
		// 	.then((res) => {
		// 		//console.log('Filtered Data:', res.data);
		// 		setData(res.data);
		// 	})
		// 	.catch((err) => console.error('Error fetching filtered data:', err));
	};

	// const handleResetClick = () => {
	// 	setSelectedState({
	// 		id: '0000-0000-0000-0000',
	// 		label: '--Select State--',
	// 		stateId: stateData?.length ? stateData[0].id : 0,
	// 	});
	// 	setSelectedDistrict([
	// 		{
	// 			id: '0000-0000-0000-0000',
	// 			label: '--Select District--',
	// 			districtsId: districtData?.length ? districtData[0].id : 0,
	// 		},
	// 	]);
	// 	setSelectedCrop([
	// 		{
	// 			id: '0000-0000-0000-0000',
	// 			label: '--Select Crop--',
	// 			cropId: cropData?.length ? cropData[0].id : 0,
	// 		},
	// 	]);
	// 	setSelectedDisease([
	// 		{
	// 			id: '0000-0000-0000-0000',
	// 			label: '--Select Disease--',
	// 			diseaseId: diseaseData?.length ? diseaseData[0].id : 0,
	// 		},
	// 	]);
	// 	setData([]);
	// };

	return (
		<>
			{/* <dataContext.Provider value={{ data, setData }}> */}
			<Select
				className="md:w-40 lg:w-full mb-2.5"
				optionsClassName="w-48"
				btnClassName="bg-white"
				selectOptions={stateData}
				setSelectedValue={setSelectedState}
				selectedValue={selectedState}
				isLoading={false}
				disabled={stateData?.length < 1}
			/>
			<Select
				className="md:w-40 lg:w-full mb-2.5"
				optionsClassName="w-48"
				btnClassName={`${
					districtData.length < 2 ? 'bg-disableColor' : 'bg-white'
				}`}
				selectOptions={districtData.map((district) => ({
					id: district?._id,
					label: district?.name,
				}))}
				setSelectedValue={setSelectedDistrict}
				selectedValue={selectedDistrict}
				isLoading={false}
				// disabled={
				// 	districtData.length < 2 || stateLabels.includes(selectedState.label)
				// }
				multiple
			/>
			{/* <Select
				className="md:w-40 lg:w-full mb-2.5"
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
				multiple
			/>
			<Select
				className="md:w-40 lg:w-full mb-2.5"
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
			/> */}
			<div className="w-full flex flex-row items-center">
				<div className="w-1/2 mr-2">
					<button
						className="bg-blue-500 w-full hover:bg-blue-700 text-white text-sm font-medium text-center py-2 px-4 rounded"
						//onClick={handleResetClick}
					>
						Reset
					</button>
				</div>
				<div className="w-1/2 ml-2">
					<button
						className="bg-blue-500 hover:bg-blue-700 w-full text-white text-sm font-medium text-center py-2 px-4 rounded"
						onClick={handleApplyClick}
					>
						Apply
					</button>
				</div>
			</div>
			{/* </dataContext.Provider> */}
		</>
	);
};

export default Filter;
