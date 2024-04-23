/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '../pages/NavBar';

const RequireAuth = () => {
	const [showExpandedSideBar, setShowExpandedSideBar] = useState();
	const location = useLocation();
	const activeTab = location?.pathname;

	useEffect(() => {
		(async () => {
			const hideSideBar = await localStorage.getItem('showExpandedSideBar');
			setShowExpandedSideBar(hideSideBar === 'true');
		})();
	}, []);

	return (
		<main className="bg-white">
			<NavBar
				activeTab={activeTab}
				showExpandedSideBar={showExpandedSideBar}
				setShowExpandedSideBar={setShowExpandedSideBar}
			/>
			<section className={`p-4 ${showExpandedSideBar ? 'ml-56' : 'ml-16'}`}>
				<div className="">
					<Outlet />
				</div>
			</section>
		</main>
	);
};

export default RequireAuth;
