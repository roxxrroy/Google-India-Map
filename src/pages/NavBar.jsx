import React, { useEffect } from 'react';
import ChevronDoubleRightLeft from '../icons/ChevronDoubleRightLeft';
import Filter from '../components/Filter';

const NavBar = ({
	activeTab = '/',
	showExpandedSideBar,
	setShowExpandedSideBar,
}) => {
	useEffect(() => {
		(async () => {
			const hideSideBar = await localStorage.getItem('showExpandedSideBar');
			setShowExpandedSideBar(hideSideBar === 'true');
		})();
	}, []);

	return (
		<nav
			className={`h-screen fixed bg-red ${
				showExpandedSideBar ? 'right-0' : 'right-0'
			}`}
		>
			{/* <div
				className={`${
					showExpandedSideBar ? 'h-16 md:h-24' : 'h-16'
				} bg-white shadow-xl flex items-center space-x-2 py-3 mb-5`}
			>
				<img
					className={`${
						showExpandedSideBar ? 'h-full ml-4' : 'ml-2 h-16 w-12'
					} object-contain`}
					src={
						'https://www.bighaat.com/_next/image?url=%2Fimages%2Fbighaat-logo.png&w=384&q=75'
					}
					alt="avatar"
				/>
			</div> */}

			<div className="h-screen  w-full px-3">
				{showExpandedSideBar && (
					<ul className="space-y-2">
						<Filter />
					</ul>
				)}
			</div>

			<div
				className="absolute top-0 right-0 bg-slate-300 rounded-l-md p-1"
				onClick={() => {
					setShowExpandedSideBar(!showExpandedSideBar);
					localStorage.setItem('showExpandedSideBar', !showExpandedSideBar);
				}}
			>
				<ChevronDoubleRightLeft
					direction={showExpandedSideBar ? 'left' : 'right'}
					color="black"
					className="h-4 w-4"
				/>
			</div>
		</nav>
	);
};

export default NavBar;
