import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1280, // Changement de 900 à 1280px
      lg: 1920,
      xl: 2560,
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: 16,
    h4: {
      fontWeight: 600,
      fontSize: '2.1rem',
      '@media (max-width:1280px)': {
        fontSize: '1.8rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.6rem',
      },
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.8rem',
      '@media (max-width:1280px)': {
        fontSize: '1.5rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.3rem',
      },
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.5rem',
      '@media (max-width:1280px)': {
        fontSize: '1.3rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    subtitle1: {
      fontSize: '1.2rem',
      lineHeight: 1.6,
      '@media (max-width:1280px)': {
        fontSize: '1.1rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
      '@media (max-width:1280px)': {
        fontSize: '1rem',
      },
      '@media (max-width:600px)': {
        fontSize: '0.95rem',
      },
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.5,
      '@media (max-width:1280px)': {
        fontSize: '0.95rem',
      },
      '@media (max-width:600px)': {
        fontSize: '0.85rem',
      },
    },
    caption: {
      fontSize: '0.9rem',
      '@media (max-width:1280px)': {
        fontSize: '0.85rem',
      },
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 500,
          fontSize: '1rem',
          padding: '10px 20px',
          '@media (max-width:600px)': {
            fontSize: '0.9rem',
            padding: '8px 16px',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: 'none',
          border: 'none',
          padding: '24px',
          '@media (max-width:600px)': {
            padding: '16px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            fontSize: '1rem',
            '@media (max-width:600px)': {
              fontSize: '0.9rem',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '1rem',
            '@media (max-width:600px)': {
              fontSize: '0.9rem',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '16px',
          '@media (max-width:600px)': {
            fontSize: '0.9rem',
            padding: '8px',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1rem',
          '@media (max-width:600px)': {
            fontSize: '0.9rem',
          },
        },
        secondary: {
          fontSize: '0.9rem',
          '@media (max-width:600px)': {
            fontSize: '0.8rem',
          },
        },
      },
    },
  },
}); 