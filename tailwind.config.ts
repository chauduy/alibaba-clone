import type { Config } from 'tailwindcss';

export default {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: '#ff6a00',
                secondary: '#595959',
                black: '#000000DE'
            },
            screens: {
                xxs: '450px',
                xs: '550px',
                lg: '1025px'
            }
        }
    },
    plugins: []
} satisfies Config;
