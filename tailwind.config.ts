import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            backgroundColor: {
                'ambrosia': '#ff6666',
                'ambrosia-100': '#ff3366',
            },
            textColor: {
                'ambrosia': '#ff6666',
                'ambrosia-100': '#ff3366',
            }
        },
    },
    plugins: [],
}
export default config
