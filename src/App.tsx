import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import CampaignConfigurationPage from './components/CampaignConfigurationPage';
import Sidebar from './components/Sidebar';

const theme = createTheme({
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
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.8rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    subtitle1: {
      fontSize: '1.2rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.9rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 0,
          fontWeight: 500,
          fontSize: '1rem',
          padding: '10px 20px',
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
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            fontSize: '1rem',
          },
          '& .MuiInputLabel-root': {
            fontSize: '1rem',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          padding: '16px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1rem',
        },
        secondary: {
          fontSize: '0.9rem',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Sidebar />
        <Box sx={{ flex: 1, minHeight: '100vh', overflow: 'auto' }}>
          <CampaignConfigurationPage />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
