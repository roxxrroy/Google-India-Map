import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChevronDoubleRightLeft from '../icons/ChevronDoubleRightLeft';
import Filter from '../components/Filter';
import Select from '../components/Select';

const NavBar = ({
	activeTab = '/',
	showExpandedSideBar,
	setShowExpandedSideBar,
}) => {
	const { cId } = useParams();
	const navigate = useNavigate();
	// const filters = useGetFilters();

	useEffect(() => {
		(async () => {
			const hideSideBar = await localStorage.getItem('showExpandedSideBar');
			setShowExpandedSideBar(hideSideBar === 'true');
		})();
	}, []);

	return (
		<nav
			className={`h-screen fixed bg-primary ${
				showExpandedSideBar ? 'w-56' : 'w-16'
			}`}
		>
			<div
				className={`${
					showExpandedSideBar ? 'h-16 md:h-24' : 'h-16'
				} bg-white shadow-xl flex items-center space-x-2 py-3 mb-5`}
			>
				<img
					className={`${
						showExpandedSideBar ? 'h-full ml-4' : 'ml-2 h-16 w-12'
					} object-contain`}
					src={
						'https://www.google.com/images/branding/lockups/2x/lockup_maps_color_131x24dp.png'
					}
					alt="avatar"
				/>
			</div>

			<div className="h-screen w-full px-3">
				<ul className="space-y-2">
					{/* <li className="space-y-4">
						<Link
							to={`${cId}/dashboard`}
							className={`${linksClassName} ${
								(activeTab || '').includes('dashboard')
									? 'bg-halfGreen hover:bg-primary'
									: ''
							}`}
							title={showExpandedSideBar ? '' : 'Dashboard'}
						>
							<DashboardIcon className="h-5 w-5" fill="white" />
							{showExpandedSideBar && <span className="ml-2.5">Dashboard</span>}
						</Link>
					</li> */}
					<Filter />
				</ul>
			</div>

			{/* <div
				className={`absolute bottom-8 cursor-pointer rounded-lg text-white ${
					showExpandedSideBar ? 'mx-2' : ''
				}`}
			>
				<div
					className={`flex justify-center items-center rounded-md ${
						showExpandedSideBar
							? 'px-2 py-2 bg-halfGreen hover:bg-halfGreen'
							: 'px-2 py-1'
					} z-10`}
				></div>
			</div> */}

			<div
				className="absolute bottom-0 right-0 bg-slate-300 rounded-l-md p-1"
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
