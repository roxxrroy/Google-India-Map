const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/**/*.{js,jsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				primary: '#298E4D',
				secondary: '#FA9527',
				labelColor: '#7D7D7D',
				placeHolderText: '#E0E1E8',
				border1: '#D9DFDB',
				border2: '#E0E1E8',
				dropDownPlaceholderText: '#9F9F9F',
				halfGreen: '#4EAA6F',
				summerGreen: '#8BB69A',
				tableRowBg: '#EAEFEB',
				cardBg: '#F3F3F9',
				disableColor: '#EBECF1',
				gradientEndGreen: '#A8C35D',
				//ChartsColors

				//CropVaieties
				DarkPurple: '#614E86',

				//CropStages
				darkBlue: '#405189',
				lightBlue: '#299CDB',
				darkOrange: '#E25A5A',
				orange: '#F7B84B',
				green: '#0AB39C',

				//SowingWindow
				lightPurple: '#9F7AEF',
				lightGreen3: '#AFF07B',
				biscuit: '#F28E7B',

				//ExpectedHarvest
				DarkBiscuit: '#F06548',
				Violet: '#5D45F4',
				LightestGreen: '#37E5B1',
				SkyBlue: '#45C1FF',
				LightGrey: '#EFF3FF',

				//Chemicalcomposition
				lightGreen2: '#69E5A7',
				darkYellow: '#EFC801',
				orange2: '#EFA401',
				darkOrange2: '#F67521',
				red: '#FE0000',

				//IPMAdherence
				ipmNo: '#FBC999',
				ipmYes: '#0F8DCA',

				//Non-IPMAdherence
				nonIpmNo: '#BFBFBF',
				nonIpmYes: '#5CA3A7',

				mainBackground: '#cbd5e1', // Revisit these
				componentBgColor: '#9ca3af',
				Azure: '#0088FE',
				CaribbeanGreen: '#C40025',
				RipeMango: '#286CFF',
				MangoTango: '#FF8042',
				Bistre: '#3C2317',
				TealBlue: '#256D85',
				DarkVanilla: '#D0B8A8',
				FluorescentBlue: '#31E1F7',
				IntenseGray: '#6A6767',
				HyperGray: '#959A96',
				LightBlueGray: '#A3AABE',
				LavenderRed: '#935385',
				ChinaRed: '#AD2B10',
				ClayRed: '#A6615D',
				RedOrange: '#FF3F00',
				OrchidRed: '#AD878D',
				MandarinOrange: '#DA7157',
				SkyOrange: '#F79802',
				RoyalOrange: '#D67732',
				BlusihPurple: '#8661A5',
				PeachyPurple: '#BF868F',
				SweetPotatoPurple: '#A86993',
				TwilightPurple: '#66648B',
				WashedOutPurple: '#89839C',
				LightGreen: '#31E1F7',
				VictoriaBlue: '#554994',
				BrinkPink: '#FA7070',
				PatinaGreen: '#5A8F7B',
				ElephantGreen: '#0F3D3E',
				ShamrockGreen: '#3DCC91',
				KoromikoOrange: '#FFB366',
				YellowishOrange: '#FFBB28',
				BittersweetRed: '#FF7373',
			},
			fontFamily: {
				OpenSans: ['Open Sans', 'sans-serif'],
			},
			fontSize: {
				sm: '0.8rem',
				base: '1rem',
				xl: '1.25rem',
				'2xl': '1.563rem',
				'3xl': '1.953rem',
				'4xl': '2.441rem',
				'5xl': '3.052rem',
			},
		},
	},
	plugins: [
		plugin(({ addBase }) => {
			addBase({
				'html::-webkit-scrollbar': {
					width: '10px',
				},
				'html::-webkit-scrollbar-thumb': {
					backgroundColor: 'darkgray',
					borderRadius: '8px',
				},
				'html::-webkit-scrollbar-track-piece': {
					backgroundColor: '#f0f0f0',
				},
				'.scrollbar::-webkit-scrollbar': {
					width: '5px',
				},
				'.scrollbar::-webkit-scrollbar-thumb': {
					backgroundColor: 'darkgray',
					borderRadius: '2px',
				},
				'.scrollbar::-webkit-scrollbar-track-piece': {
					backgroundColor: '#cbd5e1',
				},
			});
		}),
	],
};
