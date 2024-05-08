import * as React from 'react';
const SearchIcon = (props) => (
	<svg
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 32 32"
		enableBackground="new 0 0 32 32"
		xmlSpace="preserve"
		{...props}
	>
		<circle
			fill="none"
			stroke="#000000"
			strokeWidth={2}
			strokeMiterlimit={10}
			cx={3.5}
			cy={3.5}
			r={0.5}
		/>
		<line
			fill="none"
			stroke="#000000"
			strokeWidth={2}
			strokeMiterlimit={10}
			x1={4}
			y1={8}
			x2={4}
			y2={8}
		/>
	</svg>
);
export default SearchIcon;
