import type { Config } from 'tailwindcss'
import { colors } from './configs/themes'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: { ...colors },
    fontSize: {
      'heading-1': [
        '44px',
        {
          lineHeight: '56px',
          fontWeight: 600,
        },
      ],
      'heading-2': [
        '40px',
        {
          lineHeight: '48px',
          fontWeight: 600,
        },
      ],
      'heading-3': [
        '36px',
        {
          lineHeight: '44px',
          fontWeight: 500,
        },
      ],
      'heading-4': [
        '32px',
        {
          lineHeight: '40px',
          fontWeight: 500,
        },
      ],
      'heading-5': [
        '28px',
        {
          lineHeight: '36px',
          fontWeight: 500,
        },
      ],
      'heading-6': [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: 500,
        },
      ],
      'heading-7': [
        '18px',
        {
          lineHeight: '24px',
          fontWeight: 500,
        },
      ],
      'button-1': [
        '18px',
        {
          lineHeight: '24px',
          fontWeight: 500,
        },
      ],
      'button-2': [
        '14px',
        {
          lineHeight: '16px',
          fontWeight: 500,
        },
      ],
      'subtitle-1': [
        '16px',
        {
          lineHeight: '16px',
          fontWeight: 500,
        },
      ],
      'subtitle-2': [
        '14px',
        {
          lineHeight: '14px',
          fontWeight: 500,
        },
      ],
      'body-1': [
        '16px',
        {
          lineHeight: '16px',
          fontWeight: 400,
        },
      ],
      'body-2': [
        '14px',
        {
          lineHeight: '14px',
          fontWeight: 400,
        },
      ],
      'caption-1': [
        '12px',
        {
          lineHeight: '12px',
          fontWeight: 400,
        },
      ],
      'caption-2': [
        '10px',
        {
          lineHeight: '10px',
          fontWeight: 400,
        },
      ],
      'caption-3': [
        '8px',
        {
          lineHeight: '8px',
          fontWeight: 400,
        },
      ],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
