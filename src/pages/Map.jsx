import React, { useState, useRef, useCallback, useContext } from 'react';
import {
	GoogleMap,
	useLoadScript,
	MarkerF,
	InfoWindowF,
} from '@react-google-maps/api';
import StatePolygons from '../components/StatePolygon';
import DistrictPolygons from '../components/DistrictPolygon';
import IndiaPolygon from '../components/IndiaPolygon';
import { dataContext } from '../context/context';

const Map = ({ selectedLocation }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: '',
	});

	const [activeStateId, setActiveStateId] = useState(null);
	const [activeDistrict, setActiveDistrict] = useState(null);
	const [activeMarker, setActiveMarker] = useState(null);
	const [IsState, setIsState] = useState(false);
	console.log('IsState', IsState);
	const handleActiveMarker = (marker) => {
		if (marker === activeMarker) {
			return;
		}
		setActiveMarker(marker);
	};

	const filteredData = useContext(dataContext);
	const data = filteredData?.data;
	console.log('filterData in map', data);
	const mapRef = useRef();

	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const onStateClick = useCallback((state) => {
		console.log('state ---->', state);
		setActiveStateId(state.properties.id);
		const bounds = new window.google.maps.LatLngBounds();
		state.geometry.coordinates[0].forEach((coord) => {
			bounds.extend(new window.google.maps.LatLng(coord[1], coord[0]));
		});
		mapRef.current.fitBounds(bounds);
	}, []);

	const onDistrictClick = useCallback((district) => {
		//setIsState(true);
		console.log('district ---->', district);
		setActiveDistrict(district);
		const bounds = new window.google.maps.LatLngBounds();
		district.geometry.coordinates[0].forEach((coord) => {
			bounds.extend(new window.google.maps.LatLng(coord[1], coord[0]));
		});
		mapRef.current.fitBounds(bounds);
	}, []);

	if (loadError) return 'Error';
	if (!isLoaded) return 'Loading Maps...';

	// to show markers on Map containing details of that area
	const markers = data.map((item) => ({
		id: item?._id,
		cropname: item?.cropname,
		disease: item?.diseasename,
		district: item?.district,
		state: item?.state,
		position: { lat: parseFloat(item?.lat), lng: parseFloat(item?.lon) },
	}));

	return (
		<div style={{ width: '50vw', height: '100vh', overflow: 'hidden' }}>
			{IsState ? (
				<div className="absolute right-0 top-3 z-[9]">
					<button
						type="button"
						onClick={() => {
							setIsState(false);
						}}
						className="flex items-center w-9 h-9 justify-center bg-white p-2 text-white rounded-lg border border-gray-400"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#4EAA6F"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M3 9l9-7 9 7v8a2 2 0 0 1-2 2h-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6H5a2 2 0 0 1-2-2z" />
							<polyline points="9 22 9 12 15 12 15 22" />
						</svg>
					</button>
				</div>
			) : null}
			<GoogleMap
				mapContainerStyle={{
					width: '100%',
					height: '100%',
				}}
				mapContainerClassName="map-container"
				center={selectedLocation}
				zoom={4.5}
				onLoad={onMapLoad}
				options={{
					zoomControl: true,
					//tilt: 0,
					gestureHandling: 'auto',
					//mapTypeId: 'satellite',
				}}
			>
				{/* <StatePolygons
					onStateClick={onStateClick}
					activeStateId={activeStateId}
					dataToShow={data}
				/> */}
				{IsState ? (
					<DistrictPolygons
						onDistrictClick={onDistrictClick}
						// activeStateId={activeStateId}
						dataToShow={data}
					/>
				) : (
					<>
						<IndiaPolygon
							dataToShow={data}
							activeStateId={activeStateId}
							setIsState={setIsState}
						/>
						{/* <HorizontalBarChart /> */}
					</>
				)}
				{markers.map((marker) => (
					<MarkerF
						key={marker?.id}
						position={marker?.position}
						onClick={() => handleActiveMarker(marker?.id)}
						icon={{
							//url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBMaWNlbnNlOiBNSVQuIE1hZGUgYnkgV2lsbCBLZWxseTogaHR0cHM6Ly93d3cud2lsbC1rZWxseS5jby51ay8gLS0+Cjxzdmcgd2lkdGg9IjUwcHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPg==',
							url: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBMaWNlbnNlOiBBcGFjaGUuIE1hZGUgYnkgYnl0ZWRhbmNlOiBodHRwczovL2dpdGh1Yi5jb20vYnl0ZWRhbmNlL0ljb25QYXJrIC0tPgo8c3ZnIHdpZHRoPSIxMHB4IiBoZWlnaHQ9IjEwcHgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIiIGZpbGwtb3BhY2l0eT0iMC4wMSIvPgo8cGF0aCBkPSJNMjQgMzNDMjguOTcwNiAzMyAzMyAyOC45NzA2IDMzIDI0QzMzIDE5LjAyOTQgMjguOTcwNiAxNSAyNCAxNUMxOS4wMjk0IDE1IDE1IDE5LjAyOTQgMTUgMjRDMTUgMjguOTcwNiAxOS4wMjk0IDMzIDI0IDMzWiIgZmlsbD0iI0ZGQTUwMCIgc3Ryb2tlPSIjRkZBNTAwIiBzdHJva2Utd2lkdGg9IjQiLz4KPC9zdmc+',
							//scaledSize: new window.google.maps.Size(10, 10),
						}}
					>
						{activeMarker === marker?.id ? (
							<InfoWindowF onCloseClick={() => setActiveMarker(null)}>
								<div>
									<p>{marker?.cropname}</p>
									<p>{marker?.disease}</p>
									<p>{marker?.district}</p>
									<p>{marker?.state}</p>
								</div>
							</InfoWindowF>
						) : null}
					</MarkerF>
				))}
			</GoogleMap>
		</div>
	);
};

export default Map;
