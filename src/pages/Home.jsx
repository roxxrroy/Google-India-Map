import React from 'react';
import Map from './Map';
import CropAnalysis from '../charts/CropAnalysis';

const Home = ({ selectedLocation, setSelectedLocation }) => {
	return (
		<div style={{ display: 'flex', height: '100vh' }}>
			<div style={{ flex: '1', height: '100%', overflow: 'hidden' }}>
				<Map
					selectedLocation={selectedLocation}
					setSelectedLocation={setSelectedLocation}
				/>
			</div>
			<div style={{ flex: '1', height: '100%', overflow: 'auto' }}>
				<CropAnalysis />
				{/* <CropAnalysis /> */}
			</div>
		</div>
	);
};

export default Home;
