import React from 'react';
import { PolygonF } from '@react-google-maps/api';
import { IndiaData } from '../assets/IndiaGeoJson';

const StatePolygons = ({ activeStateId, onStateClick, dataToShow }) => {
	//console.log('activeStateId inside state polygon ---->', activeStateId);
	const getFillColor = (stateId) => {
		const hasData = dataToShow.some((data) => data.state_code === stateId);
		// const hasData = dataToShow.some(
		// 	(data) =>
		// 		data.stateId === activeStateId &&
		// 		data.districtId === district.properties.districtId
		// );
		//console.log('result', stateId, hasData ? '#FFD700' : 'none');
		return hasData ? '#FF0000' : 'none'; // Gold color if data is present, no fill if not
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
						fillOpacity:
							getFillColor(state.properties.id) === '#FFD700' ? 1.05 : 0.01,
						strokeColor: '#000000',
						strokeOpacity: 0.8,
						strokeWeight: 1,
					}}
					onClick={() => onStateClick(state)}
					visible={
						activeStateId === null || activeStateId === state.properties.id
					}
				/>
			))}
		</>
	);
};

export default StatePolygons;
