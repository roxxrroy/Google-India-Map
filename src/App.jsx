import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Map from './pages/Map';
import './styles.css';
import RequireAuth from './components/RequireAuth';
import { dataContext } from './context/context';
import Home from './pages/Home';
import { Provider, useDispatch } from 'react-redux';
import store from './redux/store';

function App() {
	const [selectedLocation, setSelectedLocation] = useState({
		lat: 25.629115,
		lng: 80.9116366,
	});
	// Assume you have some initial data
	const [data, setData] = useState([]);

	return (
		<>
			<Provider store={store}>
				{/* <dataContext.Provider value={{ data, setData }}> */}
				<BrowserRouter>
					<Routes>
						<Route path="map/" element={<RequireAuth />}>
							<Route
								path="home"
								element={
									<Home
										selectedLocation={selectedLocation}
										setSelectedLocation={setSelectedLocation}
									/>
								}
							/>
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
				{/* </dataContext.Provider> */}
			</Provider>
		</>
	);
}

export default App;
