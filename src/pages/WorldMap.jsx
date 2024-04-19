// import React, { useState, useEffect } from 'react';
// import {
// 	GoogleMap,
// 	useLoadScript,
// 	MarkerF,
// 	PolygonF,
// } from '@react-google-maps/api';
// import { IndiaData } from '../assets/data';
// import { BengaloreData } from '../assets/karnataka';

// const MapComponent = ({ selectedLocation, setSelectedLocation }) => {
// 	const { isLoaded, loadError } = useLoadScript({
// 		googleMapsApiKey: '',
// 	});

// 	const [activeStateId, setActiveStateId] = useState(null);
// 	// const [activeState, setActiveState] = useState(null);
// 	const [activeDistrict, setActiveDistrict] = useState(null);

// 	// useEffect(() => {
// 	// 	isDistrictClick, isStateClick(false);
// 	// }, [isDistrictClick]);

// 	const mapRef = React.useRef();

// 	const onMapLoad = React.useCallback((map) => {
// 		mapRef.current = map;
// 	}, []);

// 	const onStateClick = React.useCallback((state) => {
// 		console.log('state ---->', state);
// 		setActiveStateId(state.properties.id);
// 		const bounds = new window.google.maps.LatLngBounds();
// 		state.geometry.coordinates[0].forEach((coord) => {
// 			bounds.extend(new window.google.maps.LatLng(coord[1], coord[0]));
// 		});
// 		mapRef.current.fitBounds(bounds);
// 	}, []);

// 	const onDistrictClick = React.useCallback((district) => {
// 		console.log('district ---->', district);
// 		setActiveDistrict(district);
// 		const bounds = new window.google.maps.LatLngBounds();
// 		district.geometry.coordinates[0].forEach((coord) => {
// 			bounds.extend(new window.google.maps.LatLng(coord[1], coord[0]));
// 		});
// 		mapRef.current.fitBounds(bounds);
// 	}, []);

// 	if (loadError) return 'Error';
// 	if (!isLoaded) return 'Maps';

// 	return (
// 		<div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
// 			<GoogleMap
// 				mapContainerStyle={{
// 					width: '100vw',
// 					height: '100vh',
// 				}}
// 				center={selectedLocation}
// 				zoom={4}
// 				onLoad={onMapLoad}
// 			>
// 				{/* <MarkerF
// 					position={selectedLocation}
// 					icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
// 				/> */}
// 				{IndiaData.features.map((state) => (
// 					<PolygonF
// 						key={state.name}
// 						//paths={state.coordinates}
// 						paths={state.geometry.coordinates[0].map((coord) => ({
// 							lat: coord[1],
// 							lng: coord[0],
// 						}))}
// 						options={{
// 							fillColor: 'none',
// 							fillOpacity: 0.01,
// 							strokeColor: '#000000',
// 							strokeOpacity: 0.8,
// 							strokeWeight: 1,
// 						}}
// 						onClick={() => onStateClick(state)}
// 						visible={
// 							activeStateId === null || activeStateId === state.properties.id
// 						}
// 					/>
// 				))}
// 				{BengaloreData.features.map((district) => (
// 					<PolygonF
// 						key={district.properties.districtId}
// 						paths={district.geometry.coordinates.map((coord) => ({
// 							lat: coord[1],
// 							lng: coord[0],
// 						}))}
// 						options={{
// 							fillColor: 'none',
// 							fillOpacity: 0.01,
// 							strokeColor: '#FF0000',
// 							strokeOpacity: 0.8,
// 							strokeWeight: 1,
// 						}}
// 						onClick={() => onDistrictClick(district)}
// 						//visible={activeStateId === district.properties.stateId}
// 					/>
// 				))}
// 			</GoogleMap>
// 		</div>
// 	);
// };

// export default MapComponent;

// // import React from 'react';
// // import { GoogleMap, LoadScript, Polygon } from '@react-google-maps/api';

// // const containerStyle = {
// // 	width: '100vw',
// // 	height: '100vh',
// // };

// // const center = {
// // 	lat: 25.629115,
// // 	lng: 80.9116366,
// // };

// // // const indiaPolygonCoords = [
// // // 	{ lat: 35.494, lng: 76.1648 },
// // // 	{ lat: 28.7041, lng: 77.1025 },
// // // 	{ lat: 19.076, lng: 72.8777 },
// // // 	{ lat: 13.0827, lng: 80.2707 },
// // // 	{ lat: 8.0883, lng: 77.5385 },
// // // 	{ lat: 22.5726, lng: 88.3639 },
// // // 	{ lat: 25.5941, lng: 85.1376 },
// // // 	{ lat: 26.8467, lng: 80.9462 },
// // // 	{ lat: 31.634, lng: 74.8723 },
// // // 	{ lat: 34.0837, lng: 74.7973 },
// // // 	{ lat: 35.494, lng: 76.1648 },
// // // ];

// // const WorldMap = () => {

// // 	return (
// // 		<LoadScript googleMapsApiKey="AIzaSyAY5jHBjor3vNrICE4WUkTbehruiCgqBi8">
// // 			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
// // 				{/* <Polygon
// // 					paths={indiaPolygonCoords}
// // 					options={{
// // 						fillColor: '#FF0000',
// // 						fillOpacity: 0.4,
// // 						strokeColor: '#000000',
// // 						strokeOpacity: 0.8,
// // 						strokeWeight: 2,
// // 					}}
// // 				/> */}
// // 				{/* Map content like markers or shapes */}
// // 			</GoogleMap>
// // 		</LoadScript>
// // 	);
// // };

// // export default WorldMap;

// // import React, { useState, useRef } from 'react';
// // import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import { IndiaData } from '../assets/data';
// // // import MarkerClusterGroup from 'react-leaflet-cluster';

// // // import { Icon, divIcon, point } from 'leaflet';

// // const WorldMap = () => {
// // 	const [center, setCenter] = useState({ lat: 25.629115, lng: 80.9116366 });
// // 	const ZOOM_LEVEL = 4;
// // 	const mapRef = useRef();
// // 	return (
// // 		<div>
// // 			<MapContainer
// // 				center={center}
// // 				zoom={ZOOM_LEVEL}
// // 				ref={mapRef}
// // 				scrollWheelZoom={false}
// // 				style={{ width: '100vw', height: '100vh' }}
// // 			>
// // 				<TileLayer
// // 					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// // 					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// // 				/>
// // 				{/* {IndiaData.features.map((state) => {
// // 					const coordinates = state.geometry.coordinates[0].map((item) => [
// // 						item[1],
// // 						item[0],
// // 					]);
// // 					return (
// // 						<Polygon
// // 							pathOptions={{
// // 								fillColor: '#FD8D3C',
// // 								fillOpacity: 0.7,
// // 								weight: 2,
// // 								opacity: 1,
// // 								dashArray: 3,
// // 								color: 'white',
// // 							}}
// // 							positions={coordinates}
// // 							eventHandlers={{
// // 								mouseover: (e) => {
// // 									const layer = e.target;
// // 									layer.setStyle({
// // 										dashArray: '',
// // 										fillColor: '#BD0026',
// // 										fillOpacity: 0.7,
// // 										weight: 2,
// // 										opacity: 1,
// // 										color: 'white',
// // 									});
// // 								},
// // 								mouseout: (e) => {
// // 									const layer = e.target;
// // 									layer.setStyle({
// // 										fillOpacity: 0.7,
// // 										weight: 2,
// // 										dashArray: '3',
// // 										color: 'white',
// // 										fillColor: '#FD8D3C',
// // 									});
// // 								},
// // 								click: (e) => {},
// // 							}}
// // 						/>
// // 					);
// // 				})} */}
// // 			</MapContainer>
// // 		</div>
// // 	);
// // };

// // export default WorldMap;

// // import React,{useState} from 'react'
// // import { Tooltip as ReactTooltip } from "react-tooltip";
// // import MapChart from './MapChart';

// // export function Home2  ()  {
// //     const [content, setContent] = useState("");
// //   return (
// //     <div>
// //         <MapChart setTooltipContent={setContent} />
// //         <ReactTooltip id="my-tooltip">{content}</ReactTooltip>
// //     </div>
// //   )
// // }
