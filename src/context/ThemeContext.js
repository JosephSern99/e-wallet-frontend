// import { createContext } from 'react';

// // Create the context
// export const ThemeContext = createContext();

// // Theme configurations
// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#2563eb', // Blue 600
//       light: '#60a5fa', // Blue 400
//       dark: '#1d4ed8', // Blue 700
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#7c3aed', // Violet 600
//       light: '#a78bfa', // Violet 400
//       dark: '#6d28d9', // Violet 700
//       contrastText: '#ffffff',
//     },
//     success: {
//       main: '#10b981', // Emerald 500
//       light: '#34d399', // Emerald 400
//       dark: '#059669', // Emerald 600
//     },
//     error: {
//       main: '#ef4444', // Red 500
//       light: '#f87171', // Red 400
//       dark: '#dc2626', // Red 600
//     },
//     warning: {
//       main: '#f59e0b', // Amber 500
//       light: '#fbbf24', // Amber 400
//       dark: '#d97706', // Amber 600
//     },
//     info: {
//       main: '#0ea5e9', // Sky 500
//       light: '#38bdf8', // Sky 400
//       dark: '#0284c7', // Sky 600
//     },
//     background: {
//       default: '#f9fafb', // Gray 50
//       paper: '#ffffff',
//     },
//     text: {
//       primary: '#111827', // Gray 900
//       secondary: '#6b7280', // Gray 500
//     },
//   },
//   typography: {
//     fontFamily: [
//       'Inter',
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//     ].join(','),
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           fontWeight: 500,
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
//           borderRadius: 12,
//         },
//       },
//     },
//   },
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#3b82f6', // Blue 500
//       light: '#60a5fa', // Blue 400
//       dark: '#2563eb', // Blue 600
//       contrastText: '#ffffff',
//     },
//     secondary: {
//       main: '#8b5cf6', // Violet 500
//       light: '#a78bfa', // Violet 400
//       dark: '#7c3aed', // Violet 600
//       contrastText: '#ffffff',
//     },
//     success: {
//       main: '#10b981', // Emerald 500
//       light: '#34d399', // Emerald 400
//       dark: '#059669', // Emerald 600
//     },
//     error: {
//       main: '#ef4444', // Red 500
//       light: '#f87171', // Red 400
//       dark: '#dc2626', // Red 600
//     },
//     warning: {
//       main: '#f59e0b', // Amber 500
//       light: '#fbbf24', // Amber 400
//       dark: '#d97706', // Amber 600
//     },
//     info: {
//       main: '#0ea5e9', // Sky 500
//       light: '#38bdf8', // Sky 400
//       dark: '#0284c7', // Sky 600
//     },
//     background: {
//       default: '#111827', // Gray 900
//       paper: '#1f2937', // Gray 800
//     },
//     text: {
//       primary: '#f9fafb', // Gray 50
//       secondary: '#d1d5db', // Gray 300
//     },
//   },
//   typography: {
//     fontFamily: [
//       'Inter',
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//     ].join(','),
//   },
//   shape: {
//     borderRadius: 8,
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: 'none',
//           fontWeight: 500,
//         },
//       },
//     },
//     MuiCard: {
//       styleOverrides: {
//         root: {
//           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
//           borderRadius: 12,
//         },
//       },
//     },
//   },
// });

// // export { lightTheme, darkTheme, MuiThemeProvider as ThemeProvider };