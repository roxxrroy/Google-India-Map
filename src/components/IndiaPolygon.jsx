import React from 'react';
import { PolygonF } from '@react-google-maps/api';
import { IndiaData } from '../assets/IndiaGeoJson';

const IndiaPolygon = ({ activeStateId, dataToShow }) => {
	console.log('india polygon is getting clicked', activeStateId);
	const getFillColor = (stateId) => {
		const hasData = dataToShow.some((data) => data.stateId === stateId);
		//console.log('result', stateId, hasData ? '#FFD700' : 'none');
		return hasData ? '#FFD700' : 'none'; // Gold color if data is present, no fill if not
	};

	return (
		<>
			{IndiaData.features.map((state) => (
				<PolygonF
					key={state.properties.id}
					paths={state.geometry.coordinates[0].map((coord) => ({
						lat: coord[1],
						lng: coord[0],
					}))}
					options={{
						fillColor: getFillColor(state.properties.id),
						//fillColor: 'none',
						fillOpacity:
							getFillColor(state.properties.id) === '#FFD700' ? 1.05 : 0.01,
						strokeColor: '#000000',
						strokeOpacity: 0.8,
						strokeWeight: 1,
					}}
					// onClick={() => setIsState(true)}
					visible={
						activeStateId === null || activeStateId === state.properties.id
					}
				/>
			))}
		</>
	);
};

export default IndiaPolygon;
