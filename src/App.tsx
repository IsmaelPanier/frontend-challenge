import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Drawer, useMediaQuery, IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import CampaignConfigurationPage from './components/CampaignConfigurationPage';
import Sidebar from './components/Sidebar';
import { theme } from './theme';

function App() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const sidebarWidth = 320;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', bgcolor: 'background.default', position: 'relative' }}>
        
        {/* Menu hamburger mobile */}
        {isMobile && (
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              top: 16,
              left: 16,
              zIndex: 1300,
              bgcolor: 'background.paper',
              boxShadow: 2,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Sidebar Desktop */}
        {!isMobile && (
          <Box
            sx={{
              width: sidebarWidth,
              flexShrink: 0,
            }}
          >
            <Sidebar />
          </Box>
        )}

        {/* Sidebar Mobile (Drawer) */}
        {isMobile && (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileDrawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile
            }}
            sx={{
              '& .MuiDrawer-paper': {
                width: sidebarWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <Sidebar onItemClick={() => setMobileDrawerOpen(false)} />
          </Drawer>
        )}

        {/* Contenu principal */}
        <Box 
          sx={{ 
            flex: 1, 
            minHeight: '100vh', 
            overflow: 'auto',
            marginLeft: isMobile ? 0 : 0, // Pas de marge car la sidebar est déjà dans un Box
            width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
          }}
        >
          <CampaignConfigurationPage />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
