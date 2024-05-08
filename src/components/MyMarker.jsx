import React from 'react';

const MyMarker = ({ text, tooltip }) => {
	console.log('text', text);
	console.log('tooltip', tooltip);
	// /console.log('$hover', $hover);
	const handleClick = () => {
		console.log(`You clicked on ${tooltip}`);
	};

	return (
		<div className={'circle hover'} onClick={handleClick}>
			<span className="circleText" title={tooltip}>
				{text}
			</span>
		</div>
	);
};

export default MyMarker;
