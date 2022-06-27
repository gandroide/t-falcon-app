import { DefaultTheme } from 'styled-components';

// export const lightTheme: DefaultTheme = {
//   palette: {
//     background: "#fff",
//     text: "#000"
//   }
// }

// export const darkTheme: DefaultTheme = {
//   palette: {
//     background: "#000",
//     text: "#fff"
//   }
// }

export const defaultTheme: DefaultTheme = {
  borderRadius: '4px',
  palette: {
    common: {
      black: '#222',
      white: '#F9FAFB',
      gray: '#b7b7b7'
    },
    blue: {
      light: '#60A5FA',
      default: '#2563EB',
      dark: '#1E40AF'
    },
    red: {
      light: '#F87171',
      default: '#DC2626',
      dark: '#991B1B'
    },
    green: {
      light: '#34D399',
      default: '#085E3B',
      dark: '#065F46'
    },
    typography: {
      light: '#A3A3A3',
      default: '#222',
      dark: '#171717'
    }
  },
  breakpoints: {
    sm: `(min-width: 576px)`,
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  },
  typography: {
    h1: '4rem',
    h2: '3rem',
    h3: '2rem',
    text: '1.3rem'
  },
  spacing: {
    sm: '0.75rem',
    md: '1.5rem',
    lg: '2.5rem'
  }
};
