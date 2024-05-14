import React from 'react';
import Map from './Map';
import CropAnalysis from '../charts/CropAnalysis';
import DiseaseAnalysis from '../charts/DiseaseAnalysis';
import LocatioAnalysis from '../charts/LocationAnalysis';

const Home = ({ selectedLocation, setSelectedLocation }) => {
	return (
		<div
			// className="flex flex-row h-screen"
			style={{ display: 'flex', flexDirection: 'row' }}
		>
			<div style={{ flex: '2', height: '100%' }}>
				<Map
					selectedLocation={selectedLocation}
					setSelectedLocation={setSelectedLocation}
				/>
			</div>
			<div style={{ flex: '2', flexDirection: 'column' }}>
				<div style={{ display: 'flex' }}>
					<LocatioAnalysis />
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'flex-start',
					}}
				>
					<div className="flex:2">
						<CropAnalysis />
					</div>
					<div className="flex:2">
						<DiseaseAnalysis />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
