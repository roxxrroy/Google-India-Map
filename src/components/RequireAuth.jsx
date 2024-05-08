/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../pages/NavBar';
import SearchIcon from '../icons/SearchIcon';

const RequireAuth = () => {
	const [showExpandedSideBar, setShowExpandedSideBar] = useState();
	const location = useLocation();
	const activeTab = location?.pathname;
	const [isNavBarVisible, setIsNavBarVisible] = useState(false);

	useEffect(() => {
		(async () => {
			const hideSideBar = await localStorage.getItem('showExpandedSideBar');
			setShowExpandedSideBar(hideSideBar === 'true');
		})();
	}, []);

	const toggleNavBar = () => {
		console.log('NavBar toggle clicked');
		setIsNavBarVisible(!isNavBarVisible);
	};

	return (
		<main className="bg-white">
			{/* <SearchIcon /> */}
			{/* <button onClick={toggleNavBar}>Hello</button>
			{isNavBarVisible && ( */}
			<NavBar
				activeTab={activeTab}
				showExpandedSideBar={showExpandedSideBar}
				setShowExpandedSideBar={setShowExpandedSideBar}
			/>
			{/* )} */}
			<section className={`${showExpandedSideBar ? 'ml-56' : 'ml-16'}`}>
				<div className="">
					<Outlet />
				</div>
			</section>
		</main>
	);
};

export default RequireAuth;
