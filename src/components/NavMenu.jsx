import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const NavMenu = ({
	className = '',
	btnChildren,
	btnClassName = '',
	itemsClassName = '',
	navMenuItems = [],
}) => (
	<Menu as="div" className={`relative ${className}`}>
		<Menu.Button
			className={`inline-flex justify-center items-center ${btnClassName}`}
		>
			{btnChildren && btnChildren}
		</Menu.Button>

		<Transition
			as={Fragment}
			enter="transition ease-in duration-100"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-out duration-75"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
		>
			<Menu.Items
				className={`absolute w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform translate-y-0 ${itemsClassName}`}
			>
				<div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-200">
					{navMenuItems.map((item) => (
						<Menu.Item key={item?.id}>
							{({ active }) => (
								<button
									type="button"
									className={`${
										active ? 'bg-halfGreen text-white' : 'text-gray-900'
									} group flex w-full items-center rounded-md px-2 py-2 text-sm ${
										item?.btnClassName
									}`}
									onClick={() =>
										(item?.onClickAction && item?.onClickAction()) || {}
									}
								>
									{active
										? item?.activeIcon && item?.activeIcon
										: item?.inActiveIcon && item?.inActiveIcon}
									{item?.label}
								</button>
							)}
						</Menu.Item>
					))}
				</div>
			</Menu.Items>
		</Transition>
	</Menu>
);

export default NavMenu;
