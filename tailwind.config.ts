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
                primary: '#156241'
            },
            screens: {
                lg: '1025px'
            }
        },
        fontFamily: {
            regular: ['SoDoSansSansRegular', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
            semibold: [
                'SoDoSansSansSemiBold',
                'Helvetica Neue',
                'Helvetica',
                'Arial',
                'sans-serif'
            ],
            bold: ['SoDoSansSansBold', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif']
        }
    },
    plugins: []
} satisfies Config;
