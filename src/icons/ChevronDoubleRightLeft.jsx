import * as React from 'react';

const ChevronDoubleRightLeft = (props) => {
	const {
		height = 24,
		width = 24,
		color = 'black',
		fill = 'none',
		strokeWidth = 1.5,
		className = '',
		direction = 'right',
	} = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill={fill}
			viewBox={`0 0 ${height} ${width}`}
			strokeWidth={strokeWidth}
			stroke={color}
			className={className}
		>
			{direction === 'right' ? (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
				/>
			) : (
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
				/>
			)}
		</svg>
	);
};

export default ChevronDoubleRightLeft;
