import React from 'react';

const Loading = (props) => {
	const {
		height = 40,
		width = 40,
		color = 'black',
		className = '',
		strokeWidth = 3.5,
		fullScreenMode = false,
		msg = '',
	} = props;
	return (
		<div
			className={
				fullScreenMode
					? 'w-full h-screen flex flex-col justify-center items-center'
					: ''
			}
		>
			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${height} ${width}`}
				xmlns="http://www.w3.org/2000/svg"
				className={className}
			>
				<g
					transform="translate(1 1)"
					stroke={color}
					strokeWidth={strokeWidth}
					fill="none"
					fillRule="evenodd"
				>
					<circle strokeOpacity={0.2} cx={18} cy={18} r={18} />
					<path d="M36 18c0-9.94-8.06-18-18-18">
						<animateTransform
							attributeName="transform"
							type="rotate"
							from="0 18 18"
							to="360 18 18"
							dur="1s"
							repeatCount="indefinite"
						/>
					</path>
				</g>
			</svg>
			{msg && <p1>{msg}</p1>}
		</div>
	);
};

export default Loading;
