import React from 'react';

const CheckIcon = (props) => {
	const {
		height = 24,
		width = 24,
		color = 'black',
		fill = 'none',
		className = '',
	} = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={fill}
			viewBox={`0 0 ${height} ${width}`}
			className={className}
		>
			<path
				d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
				fill={color}
			/>
		</svg>
	);
};

export default CheckIcon;
