import React from 'react';
import { PolygonF } from '@react-google-maps/api';
import { stateGeoJson } from '../assets/StateGeoJson';

const DistrictPolygons = ({ onDistrictClick, activeStateId, dataToShow }) => {
	//console.log('dataToShow in district Polygon', dataToShow);
	// console.log('activeStateId inside district polygon ---->', activeStateId);
	const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	const getFillColor = (district) => {
		// const hasData = dataToShow.some((data) => data.districtid === districtId);
		// return hasData ? '#FFD700' : 'none';

		// Check if any data has matching lat and long with state coordinates
		const hasData = dataToShow.some((data) => {
			// return district?.geometry?.coordinates[0].some((coord) => {
			// 	return (
			// 		parseFloat(coord[1]).toFixed(2) === parseFloat(data.lat).toFixed(2) &&
			// 		parseFloat(coord[0]).toFixed(2) === parseFloat(data.lon).toFixed(2)
			// 	);
			// });
			return district?.properties?.districtName === data?.district;
		});
		return hasData ? randomColor : 'none';
	};

	return (
		<>
			{stateGeoJson.features.map((district) => {
				//console.log('District:', district);
				console.log(
					'checking visbility',
					dataToShow.some(
						(item) => item.district === district?.properties?.districtName
					)
				);
				return (
					<PolygonF
						key={district.properties.districtId}
						paths={district.geometry.coordinates[0].map((coord) => ({
							lat: coord[1],
							lng: coord[0],
						}))}
						options={{
							//fillColor: getFillColor(district),
							//fillOpacity: getFillColor(district) === randomColor ? 1.05 : 0.01,
							fillColor: 'none',
							fillOpacity: 0.01,
							strokeColor: '#000000',
							strokeOpacity: 0.8,
							strokeWeight: 1,
						}}
						onClick={() => onDistrictClick(district)}
						// visible={
						// 	district?.properties?.districtName === dataToShow?.district
						// }
						visible={dataToShow.some(
							(item) => item.district === district?.properties?.districtName
						)}

						// visible={false}
					/>
				);
			})}
		</>
	);
};

export default DistrictPolygons;
