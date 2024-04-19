import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	GoogleMap,
	useLoadScript,
	MarkerF,
	InfoWindowF,
} from '@react-google-maps/api';
import StatePolygons from '../components/StatePolygon';
import DistrictPolygons from '../components/DistrictPolygon';
import Filter from '../components/Filter';
import axios from 'axios';
import IndiaPolygon from '../components/IndiaPolygon';

const Map = ({ selectedLocation, filterData }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: '',
	});

	const [activeStateId, setActiveStateId] = useState(null);
	console.log('activeStateId inside Map ====>', activeStateId);
	const [activeDistrict, setActiveDistrict] = useState(null);
	const [data, setData] = useState([]);
	const [activeMarker, setActiveMarker] = useState(null);

	console.log('data inside Map', data);
	const handleActiveMarker = (marker) => {
		if (marker === activeMarker) {
			return;
		}
		setActiveMarker(marker);
	};

	useEffect(() => {
		axios
			.get('http://localhost:3031/data')
			.then((res) => setData(res.data))
			.catch((err) => console.error(err));
	}, []);
	// const dataToShow = [
	// 	{
	// 		cropId: '5ebd77eabcc00904187a00bf',
	// 		cropName: 'Cabbage',
	// 		diseaseId: '64a68b9275af348fb689d9b0',
	// 		diseaseName: 'Upward Curling (Thrips)',
	// 		stateId: '6203a5ee199fc3be0e45f047',
	// 		stateName: 'Karnataka',
	// 		districtName: 'MYSURU',
	// 		districtId: '620a1342e76dd55684be2eca',
	// 	},
	// 	{
	// 		cropId: '5ebd78b6bcc00904187a00c3',
	// 		cropName: 'Carrot',
	// 		diseaseId: '64a68ba575af348fb689d9b1',
	// 		diseaseName: 'Downward Curling (Mites)',
	// 		stateId: '6203a5ee199fc3be0e45f047',
	// 		stateName: 'Karnataka',
	// 		districtName: 'Gulbarga',
	// 		districtId: '647dc482240ea8e965e9523a',
	// 	},
	// 	{
	// 		cropId: '60e83298fa927f00017dcc2b',
	// 		cropName: 'Tea',
	// 		diseaseId: '64a68ba575af348fb689d9b1',
	// 		diseaseName: 'Downward Curling (Mites)',
	// 		stateId: '6203a5ee199fc3be0e45f047',
	// 		stateName: 'Karnataka',
	// 		districtName: 'Gadag',
	// 		districtId: '620a1342e76dd55684be2ec2',
	// 	},
	// 	{
	// 		cropId: '60e83298fa927f00017dcc2b',
	// 		cropName: 'Tea',
	// 		diseaseId: '64a68ba575af348fb689d9b1',
	// 		diseaseName: 'Downward Curling (Mites)',
	// 		stateId: '6203a5ee199fc3be0e45f03a',
	// 		stateName: 'Andhra Pradesh',
	// 		districtName: 'Guntur',
	// 		districtId: '620a1342e76dd55684be2db1',
	// 	},
	// ];

	const mapRef = useRef();

	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const onStateClick = useCallback((state) => {
		console.log('state ---->', state);
		setActiveStateId(state.properties.id);
		const bounds = new window.google.maps.LatLngBounds();
		state.geometry.coordinates[0].forEach((coord) => {
			bounds.extend(new window.google.maps.LatLng(coord[1], coord[0]));
		});
		mapRef.current.fitBounds(bounds);
	}, []);

	const onDistrictClick = useCallback((district) => {
		console.log('district ---->', district);
		setActiveDistrict(district);
		const bounds = new window.google.maps.LatLngBounds();
		district.geometry.coordinates[0].forEach((coord) => {
			bounds.extend(new window.google.maps.LatLng(coord[1], coord[0]));
		});
		mapRef.current.fitBounds(bounds);
	}, []);

	if (loadError) return 'Error';
	if (!isLoaded) return 'Loading Maps...';

	function parseCoordinates(coordString) {
		const parts = coordString.split(',');
		if (parts.length !== 2) {
			return null; // or throw an error, or handle this case as needed
		}
		const lat = parseFloat(parts[1]);
		const lng = parseFloat(parts[0]);
		return { lat, lng };
	}

	// to show markers on Map containing details of that area
	const markers = data
		.filter((item) => {
			return (
				item.state_code === activeStateId &&
				(!activeDistrict || item.districtid === activeDistrict)
			);
		})
		.map((item) => ({
			id: item.districtid,
			cropname: item?.cropname,
			disease: item?.disease,
			district: item?.district,
			state: item?.state,
			position: parseCoordinates(item.location_coordinates),
		}));

	return (
		<div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
			<GoogleMap
				mapContainerStyle={{
					width: '100vw',
					height: '100vh',
				}}
				center={selectedLocation}
				zoom={4.5}
				onLoad={onMapLoad}
			>
				<IndiaPolygon dataToShow={data} activeStateId={activeStateId} />
				<StatePolygons
					onStateClick={onStateClick}
					activeStateId={activeStateId}
					dataToShow={data}
				/>
				<DistrictPolygons
					onDistrictClick={onDistrictClick}
					activeStateId={activeStateId}
					dataToShow={data}
				/>
				{markers.map((marker) => (
					<MarkerF
						key={marker?.id}
						position={marker?.position}
						onClick={() => handleActiveMarker(marker?.id)}
					>
						{activeMarker === marker?.id ? (
							<InfoWindowF onCloseClick={() => setActiveMarker(null)}>
								<div>
									<p>{marker?.cropname}</p>
									<p>{marker?.disease}</p>
									<p>{marker?.district}</p>
									<p>{marker?.state}</p>
								</div>
							</InfoWindowF>
						) : null}
					</MarkerF>
				))}
				<div className="absolute top-0 right-0 mt-20 mr-4">
					<Filter data={data} setData={setData} />
				</div>
			</GoogleMap>
		</div>
	);
};

export default Map;
