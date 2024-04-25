import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Map from './pages/Map';
import './styles.css';
import RequireAuth from './components/RequireAuth';
import { dataContext } from './context/context';

function App() {
	const [selectedLocation, setSelectedLocation] = useState({
		lat: 25.629115,
		lng: 80.9116366,
	});
	// Assume you have some initial data
	const [data, setData] = useState([]);

	return (
		<dataContext.Provider value={{ data, setData }}>
			<BrowserRouter>
				<Routes>
					<Route path="map/" element={<RequireAuth />}>
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
		</dataContext.Provider>
	);
}

export default App;
