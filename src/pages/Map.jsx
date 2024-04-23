import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	GoogleMap,
	useLoadScript,
	MarkerF,
	InfoWindowF,
} from '@react-google-maps/api';
import StatePolygons from '../components/StatePolygon';
import DistrictPolygons from '../components/DistrictPolygon';
import axios from 'axios';
import IndiaPolygon from '../components/IndiaPolygon';

const Map = ({ selectedLocation, filterData }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: '',
	});

	const [activeStateId, setActiveStateId] = useState(null);
	const [activeDistrict, setActiveDistrict] = useState(null);
	//console.log('activeDistrict', activeDistrict);
	const [data, setData] = useState([]);
	const [activeMarker, setActiveMarker] = useState(null);
	const [IsState, setIsState] = useState(false);
	console.log('IsState', IsState);
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
		//setIsState(true);
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

	// function parseCoordinates(coordString) {
	// 	const parts = coordString.split(',');
	// 	if (parts.length !== 2) {
	// 		return null; // or throw an error, or handle this case as needed
	// 	}
	// 	const lat = parseFloat(parts[1]);
	// 	const lng = parseFloat(parts[0]);
	// 	return { lat, lng };
	// }

	// to show markers on Map containing details of that area
	const markers = data.map((item) => ({
		id: item?._id,
		cropname: item?.cropname,
		disease: item?.diseasename,
		district: item?.district,
		state: item?.state,
		position: { lat: parseFloat(item?.lat), lng: parseFloat(item?.lon) },
	}));
	//console.log('markers', markers);

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				overflow: 'hidden',
			}}
		>
			{IsState ? (
				<div className="absolute left-60 top-3 z-[9]">
					<button
						type="button"
						onClick={() => {
							setIsState(false);
						}}
						className="flex items-center w-9 h-9 justify-center bg-white p-2 text-white rounded-lg border border-gray-400"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#4EAA6F"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M3 9l9-7 9 7v8a2 2 0 0 1-2 2h-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
					</button>
				</div>
			) : null}
			<GoogleMap
				mapContainerStyle={{
					width: '100%',
					height: '100%',
				}}
				center={selectedLocation}
				zoom={4.5}
				onLoad={onMapLoad}
			>
				{/* <IndiaPolygon dataToShow={data} activeStateId={activeStateId} /> */}
				{/* <StatePolygons
					onStateClick={onStateClick}
					activeStateId={activeStateId}
					dataToShow={data}
				/> */}
				{IsState ? (
					<DistrictPolygons
						onDistrictClick={onDistrictClick}
						// activeStateId={activeStateId}
						dataToShow={data}
					/>
				) : (
					<IndiaPolygon
						dataToShow={data}
						activeStateId={activeStateId}
						setIsState={setIsState}
					/>
				)}

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
			</GoogleMap>
		</div>
	);
};

export default Map;
