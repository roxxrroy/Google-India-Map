import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Map from './pages/Map';
import './styles.css';
import RequireAuth from './components/RequireAuth';

function App() {
	const [selectedLocation, setSelectedLocation] = useState({
		lat: 25.629115,
		lng: 80.9116366,
	});

	return (
		<BrowserRouter>
			<Routes>
				<Route path="map" element={<RequireAuth />}>
					<Route
						path="india"
						element={
							<Map
								selectedLocation={selectedLocation}
								setSelectedLocation={setSelectedLocation}
							/>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
