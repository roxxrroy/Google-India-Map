import React from 'react';
import { PolygonF } from '@react-google-maps/api';
import { IndiaData } from '../assets/IndiaGeoJson';

const IndiaPolygon = ({ activeStateId, dataToShow, setIsState }) => {
	const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

	const getFillColor = (state) => {
		// const hasData = dataToShow.some((data) => data.stateId === stateId);
		// //console.log('result', stateId, hasData ? '#FFD700' : 'none');
		// return hasData ? '#FFD700' : 'none'; // Gold color if data is present, no fill if not

		// Check if any data has matching lat and long with state coordinates

		const hasData = dataToShow.some((data) => {
			// return state?.geometry?.coordinates[0].some((coord) => {
			// 	return (
			// 		parseFloat(coord[1]).toFixed(2) === parseFloat(data.lat).toFixed(2) &&
			// 		parseFloat(coord[0]).toFixed(2) === parseFloat(data.lon).toFixed(2)
			// 	);
			// });
			return state?.properties?.stateName === data?.state;
		});
		//console.log('randomColor', randomColor);

		return hasData ? randomColor : 'none';
	};

	return (
		<>
			{IndiaData.features.map((state) => (
				<PolygonF
					key={state.properties.id}
					paths={state?.geometry?.coordinates[0].map((coord) => ({
						lat: coord[1],
						lng: coord[0],
					}))}
					options={{
						//fillColor: getFillColor(state),
						//fillOpacity: getFillColor(state) === randomColor ? 1.05 : 0.01,
						fillColor: 'none',
						fillOpacity: 0.01,
						strokeColor: '#000000',
						strokeOpacity: 0.8,
						strokeWeight: 1,
					}}
					onClick={() => setIsState(true)}
					visible={true}
				/>
			))}
		</>
	);
};

export default IndiaPolygon;
