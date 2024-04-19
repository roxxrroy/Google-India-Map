import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
//import WorldMap from './pages/WorldMap';
import Map from './pages/Map';
import './styles.css';

function App() {
	const [selectedLocation, setSelectedLocation] = useState({
		lat: 25.629115,
		lng: 80.9116366,
	});
	console.log('selectedLocation', selectedLocation);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						// <WorldMap
						// 	selectedLocation={selectedLocation}
						// 	setSelectedLocation={setSelectedLocation}
						// />
						<Map
							selectedLocation={selectedLocation}
							setSelectedLocation={setSelectedLocation}
						/>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
