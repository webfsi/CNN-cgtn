module.exports = {
	content: ['./**/*.html', './scripts/**/*.js'],
	theme: {
		screens: {
			tabXl: { raw: '(min-width: 999px) and (orientation: portrait)' },
			portrait: { raw: '(orientation: portrait)' }, //{ 'raw': '(max-height: 1099px) and (orientation: portrait)' },
			tab: { raw: '(max-height: 650px) and (max-width: 1220px) and (min-width: 1100px)' },
			'tab-p': { raw: '(min-width: 700px) and (orientation: portrait)' },
			'h-xs': { raw: '(max-height: 600px)' },
			xl: { max: '1280px' },
			md: { max: '1150px' },
			sm: { max: '1023px' },
			tb: { max: '899px' },
			xs: { max: '699px' },
			lndscp: { raw: '(orientation: landscape) and (max-width: 1023px)' }
		},
		extend: {
			margin: {
				20: '20px',
				30: '30px',
				40: '40px',
				50: '50px',
				60: '60px',
				75: '75px',
				100: '100px',
				140: '140px',
				150: '150px'
			},
			padding: {
				20: '20px',
				30: '30px',
				40: '40px',
				50: '50px',
				60: '60px',
				75: '75px',
				80: '80px',
				90: '90px',
				100: '100px',
				120: '120px',
				150: '150px'
			},
			colors: {
				orange: '#E2622B',
				'orange-bg': '#BC612D',
				'mud-grey': '#8A7E62',
				beige: '#E1DAD0',
				beige2: '#E8DBC4',
				brown: '#3A2115',
				brown2: '#993F18'
			},
			fontFamily: {
				script: ['"Portrait Script"']
			},
			translate: {
				'1/2-neg': '-50%'
			}
		}
	}
};
