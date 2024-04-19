import React from 'react';

const CaretUpDownIcon = (props) => {
	const {
		height = 24,
		width = 24,
		color = 'black',
		fill = 'none',
		className = '',
		down = true,
	} = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${height} ${width}`}
			fill={fill}
			className={className}
		>
			{down ? (
				<path d="M18 9H6L12 15L18 9Z" fill={color} />
			) : (
				<path d="M6 15H18L12 9L6 15Z" fill={color} />
			)}
		</svg>
	);
};

export default CaretUpDownIcon;
