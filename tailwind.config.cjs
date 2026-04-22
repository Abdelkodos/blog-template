/** @type {import('tailwindcss').Config} */

const logigroup = {
	// ─── Core Brand ───────────────────────────────────────────────
	navy: {
		DEFAULT: '#0A1628',
		80: '#1A2D4A',
		60: '#2A4570',
		40: '#3A5D96',
		20: '#6A8CBF',
	},
	blue: {
		DEFAULT: '#0B5FE8',
		light: '#3A7FFF',
		pale: '#E8F0FE',
		dark: '#0848B8',
	},
	orange: {
		DEFAULT: '#F5620F',
		light: '#FF8A50',
		pale: '#FFF0E8',
		dark: '#C44C0A',
	},

	// ─── Neutrals ─────────────────────────────────────────────────
	gray: {
		100: '#F7F8FA',
		200: '#EAECF0',
		300: '#D0D5DD',
		400: '#9AA3B0',
		500: '#6E7B8A',
		600: '#5C6B7A',
		700: '#3D4D5C',
		800: '#2D3748',
		900: '#1A2332',
	},

	// ─── Semantic ─────────────────────────────────────────────────
	success: {
		DEFAULT: '#3B6D11',
		bg: '#EAF3DE',
		border: '#639922',
	},
	warning: {
		DEFAULT: '#BA7517',
		bg: '#FAEEDA',
		border: '#EF9F27',
	},
	danger: {
		DEFAULT: '#A32D2D',
		bg: '#FCEBEB',
		border: '#E24B4A',
	},
	info: {
		DEFAULT: '#0B5FE8',
		bg: '#E8F0FE',
		border: '#3A7FFF',
	},
};

module.exports = {
	content: [
		'./src/**/*.{astro,js,jsx,ts,tsx,html,md,mdx}',
	],

	theme: {
		// ── Fonts ──────────────────────────────────────────────────
		fontFamily: {
			display: ['Outfit', 'system-ui', 'sans-serif'],
			body: ['DM Sans', 'system-ui', 'sans-serif'],
			mono: ['JetBrains Mono', 'Courier New', 'monospace'],
		},

		// ── Font sizes (rem) ───────────────────────────────────────
		fontSize: {
			'2xs': ['0.625rem', { lineHeight: '1rem' }],         // 10px
			xs: ['0.6875rem', { lineHeight: '1.125rem' }],    // 11px
			sm: ['0.75rem', { lineHeight: '1.25rem' }],       // 12px
			base: ['0.8125rem', { lineHeight: '1.5rem' }],      // 13px
			md: ['0.875rem', { lineHeight: '1.6rem' }],       // 14px
			lg: ['1rem', { lineHeight: '1.6rem' }],           // 16px
			xl: ['1.125rem', { lineHeight: '1.5rem' }],       // 18px
			'2xl': ['1.375rem', { lineHeight: '1.3' }],       // 22px
			'3xl': ['1.75rem', { lineHeight: '1.2' }],        // 28px
			'4xl': ['2rem', { lineHeight: '1.15' }],          // 32px
			'5xl': ['2.5rem', { lineHeight: '1.1' }],         // 40px
			'6xl': ['3rem', { lineHeight: '1.05' }],          // 48px
		},

		// ── Font weights ───────────────────────────────────────────
		fontWeight: {
			light: '300',
			normal: '400',
			medium: '500',
			semibold: '600',
			bold: '700',
		},

		// ── Letter spacing ─────────────────────────────────────────
		letterSpacing: {
			tight: '-0.02em',
			normal: '0',
			wide: '0.02em',
			wider: '0.04em',
			widest: '0.1em',
			caps: '0.12em',
		},

		// ── Border radius ──────────────────────────────────────────
		borderRadius: {
			none: '0',
			sm: '4px',
			DEFAULT: '6px',
			md: '6px',
			lg: '12px',
			xl: '16px',
			'2xl': '24px',
			full: '9999px',
		},

		// ── Spacing (extends default Tailwind 4px base) ────────────
		spacing: {
			px: '1px',
			0: '0',
			0.5: '2px',
			1: '4px',
			1.5: '6px',
			2: '8px',
			2.5: '10px',
			3: '12px',
			3.5: '14px',
			4: '16px',
			5: '20px',
			6: '24px',
			7: '28px',
			8: '32px',
			9: '36px',
			10: '40px',
			11: '44px',
			12: '48px',
			14: '56px',
			16: '64px',
			18: '72px',
			20: '80px',
			24: '96px',
			28: '112px',
			32: '128px',
		},

		// ── Box shadow ─────────────────────────────────────────────
		boxShadow: {
			none: 'none',
			sm: '0 1px 4px rgba(10, 22, 40, 0.06)',
			DEFAULT: '0 2px 12px rgba(10, 22, 40, 0.08)',
			md: '0 4px 20px rgba(10, 22, 40, 0.10)',
			lg: '0 8px 32px rgba(10, 22, 40, 0.12)',
			xl: '0 16px 48px rgba(10, 22, 40, 0.16)',
			blue: '0 4px 16px rgba(11, 95, 232, 0.30)',
			orange: '0 4px 16px rgba(245, 98, 15, 0.30)',
			navy: '0 4px 16px rgba(10, 22, 40, 0.40)',
			focus: '0 0 0 3px rgba(11, 95, 232, 0.15)',
		},

		extend: {
			// ── Colors ─────────────────────────────────────────────
			colors: {
				navy: logigroup.navy,
				blue: logigroup.blue,
				orange: logigroup.orange,
				lgray: logigroup.gray,
				success: logigroup.success,
				warning: logigroup.warning,
				danger: logigroup.danger,
				info: logigroup.info,

				// Semantic shorthands for backgrounds
				surface: '#FFFFFF',
				muted: '#F7F8FA',
				border: '#EAECF0',
			},

			// ── Transitions ────────────────────────────────────────
			transitionDuration: {
				fast: '150ms',
				DEFAULT: '200ms',
				slow: '300ms',
			},

			transitionTimingFunction: {
				smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
				spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
			},

			// ── Keyframes & animations ─────────────────────────────
			keyframes: {
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(8px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'slide-in': {
					'0%': { opacity: '0', transform: 'translateX(-8px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' },
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' },
				},
				'pulse-blue': {
					'0%, 100%': { boxShadow: '0 0 0 0 rgba(11, 95, 232, 0.4)' },
					'50%': { boxShadow: '0 0 0 6px rgba(11, 95, 232, 0)' },
				},
			},

			animation: {
				'fade-up': 'fade-up 0.3s ease-out both',
				'fade-in': 'fade-in 0.25s ease-out both',
				'slide-in': 'slide-in 0.25s ease-out both',
				'scale-in': 'scale-in 0.2s ease-out both',
				'pulse-blue': 'pulse-blue 1.8s ease-in-out infinite',
			},

			// ── Grid ───────────────────────────────────────────────
			gridTemplateColumns: {
				'auto-sm': 'repeat(auto-fit, minmax(160px, 1fr))',
				'auto-md': 'repeat(auto-fit, minmax(220px, 1fr))',
				'auto-lg': 'repeat(auto-fit, minmax(300px, 1fr))',
			},

			// ── Z-index ────────────────────────────────────────────
			zIndex: {
				dropdown: '100',
				sticky: '200',
				overlay: '300',
				modal: '400',
				toast: '500',
			},
		},
	},

	plugins: [
		// ── Component plugin ─────────────────────────────────────
		function ({ addComponents, addUtilities, theme }) {
			const fontDisplay = Array.isArray(theme('fontFamily.display'))
				? fontDisplay
				: theme('fontFamily.display');
			const fontBody = Array.isArray(theme('fontFamily.body'))
				? fontBody
				: theme('fontFamily.body');

			// Buttons
			addComponents({
				'.btn': {
					display: 'inline-flex',
					alignItems: 'center',
					gap: '6px',
					fontFamily: fontDisplay,
					fontSize: theme('fontSize.base[0]'),
					fontWeight: theme('fontWeight.medium'),
					letterSpacing: theme('letterSpacing.wide'),
					lineHeight: '1',
					padding: '9px 20px',
					borderRadius: theme('borderRadius.DEFAULT'),
					border: '1.5px solid transparent',
					cursor: 'pointer',
					transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
					whiteSpace: 'nowrap',
					textDecoration: 'none',
					'&:disabled': {
						opacity: '0.4',
						cursor: 'not-allowed',
						pointerEvents: 'none',
					},
				},
				'.btn-sm': { padding: '6px 14px', fontSize: theme('fontSize.xs[0]') },
				'.btn-lg': { padding: '13px 28px', fontSize: theme('fontSize.md[0]'), borderRadius: theme('borderRadius.lg') },
				'.btn-xl': { padding: '16px 36px', fontSize: theme('fontSize.lg[0]'), borderRadius: theme('borderRadius.lg') },
				'.btn-icon': { width: '36px', height: '36px', padding: '0', justifyContent: 'center' },

				'.btn-primary': {
					background: theme('colors.blue.DEFAULT'),
					color: '#fff',
					borderColor: theme('colors.blue.DEFAULT'),
					'&:hover': {
						background: theme('colors.blue.light'),
						borderColor: theme('colors.blue.light'),
						transform: 'translateY(-1px)',
						boxShadow: theme('boxShadow.blue'),
					},
					'&:active': { transform: 'translateY(0)', boxShadow: 'none' },
				},
				'.btn-orange': {
					background: theme('colors.orange.DEFAULT'),
					color: '#fff',
					borderColor: theme('colors.orange.DEFAULT'),
					'&:hover': {
						background: theme('colors.orange.light'),
						borderColor: theme('colors.orange.light'),
						transform: 'translateY(-1px)',
						boxShadow: theme('boxShadow.orange'),
					},
					'&:active': { transform: 'translateY(0)' },
				},
				'.btn-dark': {
					background: theme('colors.navy.DEFAULT'),
					color: '#fff',
					borderColor: theme('colors.navy.DEFAULT'),
					'&:hover': {
						background: theme('colors.navy.80'),
						transform: 'translateY(-1px)',
						boxShadow: theme('boxShadow.navy'),
					},
				},
				'.btn-outline': {
					background: 'transparent',
					color: theme('colors.blue.DEFAULT'),
					borderColor: theme('colors.blue.DEFAULT'),
					'&:hover': {
						background: theme('colors.blue.pale'),
					},
				},
				'.btn-ghost': {
					background: 'transparent',
					color: theme('colors.lgray.600'),
					borderColor: theme('colors.lgray.200'),
					'&:hover': {
						background: theme('colors.lgray.100'),
						color: theme('colors.navy.DEFAULT'),
					},
				},
				'.btn-ghost-white': {
					background: 'rgba(255,255,255,0.08)',
					color: '#fff',
					borderColor: 'rgba(255,255,255,0.2)',
					'&:hover': {
						background: 'rgba(255,255,255,0.14)',
					},
				},

				// Cards
				'.card': {
					background: '#fff',
					borderRadius: theme('borderRadius.lg'),
					border: `1px solid ${theme('colors.lgray.200')}`,
					padding: '1.25rem',
					transition: 'box-shadow 200ms ease, transform 200ms ease',
					'&:hover': {
						boxShadow: theme('boxShadow.lg'),
						transform: 'translateY(-2px)',
					},
				},
				'.card-dark': {
					background: theme('colors.navy.DEFAULT'),
					borderColor: theme('colors.navy.DEFAULT'),
				},
				'.card-flat': {
					'&:hover': { transform: 'none', boxShadow: theme('boxShadow.DEFAULT') },
				},

				// Badges
				'.badge': {
					display: 'inline-flex',
					alignItems: 'center',
					fontFamily: fontDisplay,
					fontSize: theme('fontSize.xs[0]'),
					fontWeight: theme('fontWeight.medium'),
					padding: '3px 10px',
					borderRadius: theme('borderRadius.full'),
					letterSpacing: theme('letterSpacing.wide'),
				},
				'.badge-blue': { background: theme('colors.blue.pale'), color: theme('colors.blue.DEFAULT') },
				'.badge-navy': { background: theme('colors.navy.DEFAULT'), color: '#fff' },
				'.badge-orange': { background: theme('colors.orange.pale'), color: theme('colors.orange.DEFAULT') },
				'.badge-gray': { background: theme('colors.lgray.200'), color: theme('colors.lgray.600') },
				'.badge-success': { background: theme('colors.success.bg'), color: theme('colors.success.DEFAULT') },
				'.badge-warning': { background: theme('colors.warning.bg'), color: theme('colors.warning.DEFAULT') },
				'.badge-danger': { background: theme('colors.danger.bg'), color: theme('colors.danger.DEFAULT') },

				// Badge with live dot
				'.badge-dot::before': {
					content: '""',
					display: 'inline-block',
					width: '6px',
					height: '6px',
					borderRadius: '50%',
					background: 'currentColor',
					marginRight: '5px',
				},

				// Form elements
				'.input': {
					fontFamily: fontBody,
					fontSize: theme('fontSize.base[0]'),
					color: theme('colors.lgray.800'),
					background: '#fff',
					border: `1.5px solid ${theme('colors.lgray.200')}`,
					borderRadius: theme('borderRadius.DEFAULT'),
					padding: '9px 12px',
					width: '100%',
					outline: 'none',
					transition: 'border-color 200ms ease, box-shadow 200ms ease',
					'&::placeholder': { color: theme('colors.lgray.400') },
					'&:hover': { borderColor: theme('colors.lgray.300') },
					'&:focus': {
						borderColor: theme('colors.blue.DEFAULT'),
						boxShadow: theme('boxShadow.focus'),
					},
				},
				'.input-error': {
					borderColor: theme('colors.danger.border'),
					'&:focus': {
						borderColor: theme('colors.danger.border'),
						boxShadow: '0 0 0 3px rgba(226, 75, 74, 0.12)',
					},
				},
				'.label': {
					fontFamily: fontDisplay,
					fontSize: theme('fontSize.sm[0]'),
					fontWeight: theme('fontWeight.medium'),
					color: theme('colors.lgray.600'),
					letterSpacing: theme('letterSpacing.wide'),
					display: 'block',
					marginBottom: '5px',
				},
				'.hint': {
					fontSize: theme('fontSize.xs[0]'),
					color: theme('colors.lgray.400'),
					marginTop: '4px',
				},
				'.error-msg': {
					fontSize: theme('fontSize.xs[0]'),
					color: theme('colors.danger.DEFAULT'),
					marginTop: '4px',
				},

				// Alert
				'.alert': {
					borderRadius: theme('borderRadius.DEFAULT'),
					padding: '12px 14px',
					display: 'flex',
					gap: '10px',
					alignItems: 'flex-start',
					borderLeft: '3px solid transparent',
				},
				'.alert-info': { background: theme('colors.info.bg'), borderLeftColor: theme('colors.info.DEFAULT') },
				'.alert-success': { background: theme('colors.success.bg'), borderLeftColor: theme('colors.success.DEFAULT') },
				'.alert-warning': { background: theme('colors.warning.bg'), borderLeftColor: theme('colors.warning.DEFAULT') },
				'.alert-danger': { background: theme('colors.danger.bg'), borderLeftColor: theme('colors.danger.DEFAULT') },

				// Section label (overline pill)
				'.overline': {
					display: 'inline-block',
					fontFamily: fontDisplay,
					fontSize: theme('fontSize.xs[0]'),
					fontWeight: theme('fontWeight.semibold'),
					letterSpacing: theme('letterSpacing.caps'),
					textTransform: 'uppercase',
					color: theme('colors.blue.DEFAULT'),
					background: theme('colors.blue.pale'),
					padding: '3px 10px',
					borderRadius: theme('borderRadius.full'),
				},

				// Stat card
				'.stat-card': {
					background: '#fff',
					borderRadius: theme('borderRadius.lg'),
					border: `1px solid ${theme('colors.lgray.200')}`,
					padding: '1.2rem',
				},

				// Chip/tag
				'.chip': {
					display: 'inline-flex',
					alignItems: 'center',
					gap: '5px',
					fontFamily: fontDisplay,
					fontSize: theme('fontSize.xs[0]'),
					fontWeight: theme('fontWeight.medium'),
					padding: '4px 10px',
					borderRadius: theme('borderRadius.sm'),
					border: `1px solid ${theme('colors.lgray.200')}`,
					background: '#fff',
					color: theme('colors.lgray.600'),
					cursor: 'pointer',
					transition: 'all 150ms ease',
					'&:hover, &.selected': {
						borderColor: theme('colors.blue.DEFAULT'),
						color: theme('colors.blue.DEFAULT'),
						background: theme('colors.blue.pale'),
					},
				},

				// Progress bar
				'.progress-track': {
					height: '5px',
					background: theme('colors.lgray.200'),
					borderRadius: theme('borderRadius.full'),
					overflow: 'hidden',
				},
				'.progress-fill': {
					height: '100%',
					borderRadius: theme('borderRadius.full'),
					background: theme('colors.blue.DEFAULT'),
					transition: 'width 600ms ease',
				},

				// Toggle/switch
				'.toggle-track': {
					position: 'relative',
					display: 'inline-flex',
					width: '40px',
					height: '22px',
					background: theme('colors.lgray.200'),
					borderRadius: theme('borderRadius.full'),
					cursor: 'pointer',
					transition: 'background 200ms ease',
					'&::after': {
						content: '""',
						position: 'absolute',
						top: '3px',
						left: '3px',
						width: '16px',
						height: '16px',
						background: '#fff',
						borderRadius: '50%',
						boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
						transition: 'transform 200ms ease',
					},
				},
				'.toggle-checked > .toggle-track': {
					background: theme('colors.blue.DEFAULT'),
					'&::after': { transform: 'translateX(18px)' },
				},

				// Pagination button
				'.page-btn': {
					width: '32px',
					height: '32px',
					borderRadius: theme('borderRadius.DEFAULT'),
					border: `1px solid ${theme('colors.lgray.200')}`,
					background: '#fff',
					fontFamily: fontDisplay,
					fontSize: theme('fontSize.sm[0]'),
					fontWeight: theme('fontWeight.medium'),
					color: theme('colors.lgray.600'),
					display: 'inline-flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'pointer',
					transition: 'all 150ms ease',
					'&:hover': { borderColor: theme('colors.blue.DEFAULT'), color: theme('colors.blue.DEFAULT') },
					'&.active': { background: theme('colors.blue.DEFAULT'), borderColor: theme('colors.blue.DEFAULT'), color: '#fff' },
					'&.disabled': { opacity: '0.35', cursor: 'default', pointerEvents: 'none' },
				},

				// Table
				'.data-table': {
					width: '100%',
					borderCollapse: 'collapse',
					fontSize: theme('fontSize.base[0]'),
					'& th': {
						fontFamily: fontDisplay,
						fontSize: theme('fontSize.2xs[0]'),
						fontWeight: theme('fontWeight.semibold'),
						letterSpacing: theme('letterSpacing.widest'),
						textTransform: 'uppercase',
						color: theme('colors.lgray.400'),
						background: theme('colors.lgray.100'),
						padding: '10px 14px',
						textAlign: 'left',
						borderBottom: `1px solid ${theme('colors.lgray.200')}`,
					},
					'& td': {
						padding: '11px 14px',
						color: theme('colors.lgray.800'),
						borderBottom: `0.5px solid ${theme('colors.lgray.200')}`,
					},
					'& tbody tr:last-child td': { borderBottom: 'none' },
					'& tbody tr:hover td': { background: theme('colors.lgray.100') },
				},

				// Toast
				'.toast': {
					display: 'inline-flex',
					alignItems: 'center',
					gap: '10px',
					background: theme('colors.navy.DEFAULT'),
					color: '#fff',
					borderRadius: theme('borderRadius.DEFAULT'),
					padding: '10px 14px',
					fontSize: theme('fontSize.base[0]'),
					fontFamily: fontDisplay,
					boxShadow: theme('boxShadow.lg'),
					maxWidth: '320px',
				},

				// Navbar
				'.navbar': {
					background: theme('colors.navy.DEFAULT'),
					display: 'flex',
					alignItems: 'center',
					padding: '0 1.5rem',
					height: '56px',
					gap: '1.5rem',
				},

				// Divider
				'.divider': {
					height: '1px',
					background: theme('colors.lgray.200'),
				},
			});

			// Utility classes
			addUtilities({
				// Text styles
				'.text-display': {
					fontFamily: fontDisplay,
				},
				'.text-body': {
					fontFamily: fontBody,
				},
				'.text-caps': {
					fontFamily: fontDisplay,
					fontSize: theme('fontSize.xs[0]'),
					fontWeight: theme('fontWeight.semibold'),
					letterSpacing: theme('letterSpacing.caps'),
					textTransform: 'uppercase',
					color: theme('colors.blue.DEFAULT'),
				},

				// Hover lift
				'.hover-lift': {
					transition: 'transform 200ms ease, box-shadow 200ms ease',
					'&:hover': {
						transform: 'translateY(-2px)',
						boxShadow: theme('boxShadow.lg'),
					},
				},

				// Truncate multiline
				'.line-clamp-2': {
					overflow: 'hidden',
					display: '-webkit-box',
					'-webkit-line-clamp': '2',
					'-webkit-box-orient': 'vertical',
				},
				'.line-clamp-3': {
					overflow: 'hidden',
					display: '-webkit-box',
					'-webkit-line-clamp': '3',
					'-webkit-box-orient': 'vertical',
				},
			});
		},
	],
};