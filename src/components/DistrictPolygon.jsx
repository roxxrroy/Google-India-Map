import React from 'react';
import { PolygonF } from '@react-google-maps/api';
import { stateGeoJson } from '../assets/StateGeoJson';

const DistrictPolygons = ({ onDistrictClick, activeStateId, dataToShow }) => {
	console.log('activeStateId inside district polygon ---->', activeStateId);
	const getFillColor = (districtId) => {
		const hasData = dataToShow.some((data) => data.districtid === districtId);
		return hasData ? '#FFD700' : 'none';
	};

	return (
		<>
			{stateGeoJson.features.map((district) => (
				<PolygonF
					key={district.properties.districtId}
					paths={district.geometry.coordinates[0].map((coord) => ({
						lat: coord[1],
						lng: coord[0],
					}))}
					options={{
						fillColor: getFillColor(district.properties.districtId),
						fillOpacity:
							getFillColor(district.properties.districtId) === '#FFD700'
								? 1.05
								: 0.01,
						strokeColor: '#000000',
						strokeOpacity: 0.8,
						strokeWeight: 1,
					}}
					onClick={() => onDistrictClick(district)}
					visible={activeStateId === district.properties.stateId}
				/>
			))}
		</>
	);
};

export default DistrictPolygons;
