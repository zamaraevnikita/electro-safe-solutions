
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#0284C7', // sky-600 - industrial blue
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: '#64748B', // slate-500 - steel gray
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#F1F5F9', // slate-100
					foreground: '#475569' // slate-600
				},
				accent: {
					DEFAULT: '#E2E8F0', // slate-200
					foreground: '#334155' // slate-700
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Industrial color palette
				steel: {
					50: '#F8FAFC',
					100: '#F1F5F9',
					200: '#E2E8F0',
					300: '#CBD5E1',
					400: '#94A3B8',
					500: '#64748B',
					600: '#475569',
					700: '#334155',
					800: '#1E293B',
					900: '#0F172A'
				},
				electric: {
					50: '#F0F9FF',
					100: '#E0F2FE',
					200: '#BAE6FD',
					300: '#7DD3FC',
					400: '#38BDF8',
					500: '#0EA5E9',
					600: '#0284C7',
					700: '#0369A1',
					800: '#075985',
					900: '#0C4A6E'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-in': 'slide-in 0.5s ease-out'
			},
			fontFamily: {
				'industrial': ['Inter', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
