import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import Loading from '../icons/Loading';
import CheckIcon from '../icons/CheckIcon';
import ChevronUpDownIcon from '../icons/ChevronUpDownIcon';

const Select = ({
	className = 'w-40',
	optionsClassName = '',
	btnClassName = '',
	selectedValue,
	setSelectedValue,
	selectOptions = [],
	isLoading = false,
	disabled = false,
	defaultSelectedValue = [],
	multiple = false,
}) => (
	<Listbox
		className={className}
		value={selectedValue}
		onChange={(val) => {
			let modVal = val;
			if (multiple && val.length > 1) {
				modVal = val.filter((i) => i.id !== '0000-0000-0000-0000');
			} else if (multiple && val.length === 0) {
				modVal = defaultSelectedValue;
			}
			if (setSelectedValue) setSelectedValue(modVal);
		}}
		disabled={disabled}
		multiple={multiple}
	>
		<div className="relative mt-1">
			<Listbox.Button
				className={`relative w-full bg-white cursor-default rounded-md py-2 px-3 border-border1 border text-dropDownPlaceholderText text-left shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm ${btnClassName} ${
					disabled ? 'bg-white' : ''
				}`}
			>
				{isLoading ? (
					<Loading height={20} width={20} />
				) : (
					<>
						<span className="block truncate">
							{multiple
								? (selectedValue && selectedValue.length ? selectedValue : [])
										.map((value) => value.label)
										.join(', ')
								: selectedValue?.label}
						</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-secondary"
								aria-hidden="true"
							/>
						</span>
					</>
				)}
			</Listbox.Button>
			{selectOptions.length > 1 ? (
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					onBlur={(e) => {
						e.preventDefault();
					}}
				>
					<Listbox.Options
						className={`absolute !z-[99999] mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${optionsClassName}`}
					>
						{selectOptions.map((item) => (
							<Listbox.Option
								key={item.id}
								className={({ active }) =>
									`relative cursor-default select-none py-2 px-4 ${
										active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
									}`
								}
								value={item}
								disabled={item.isDisabled || false}
							>
								{({ selected }) => (
									<div className="flex relative">
										<span
											className={`block truncate ${
												selected ? 'font-medium' : 'font-normal'
											}`}
										>
											{item.label}
										</span>
										{selected ? (
											<span className="absolute right-0 flex items-center">
												<CheckIcon
													className="h-5 w-5 "
													aria-hidden="true"
													color="#FA9527"
												/>
											</span>
										) : null}
									</div>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			) : null}
		</div>
	</Listbox>
);

export default Select;
