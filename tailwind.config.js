/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // shadcn CSS variable tokens
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Figma design tokens — magenta palette
        magenta: {
          1:  '#fffdff',
          3:  '#fdeffd',
          4:  '#fee7fe',
          7:  '#fbcffb',
          8:  '#f9bef9',
          9:  '#f8b1f8',
          10: '#f68df6',
          11: '#e156e1',
          12: '#c530c5',
          13: '#9f269f',
          14: '#791a79',
          15: '#561056',
          16: '#340634',
        },
        text: {
          primary:   '#303030',
          secondary: '#616161',
        },
        border: {
          DEFAULT: '#e3e3e3',
        },
        red: {
          badge: '#e51c00',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl:   '16px',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        card:    '0px 7px 10px 0px rgba(0,0,0,0.05)',
        modal:   '0 20px 60px rgba(0,0,0,0.15)',
        dropdown:'0 4px 24px rgba(0,0,0,0.12)',
        sm:      '0 1px 3px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        sans:    ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'modal-in': {
          from: { opacity: '0', transform: 'scale(0.95) translateY(8px)' },
          to:   { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'modal-in':   'modal-in 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in':    'fade-in 150ms ease-out',
        'slide-down': 'slide-down 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
