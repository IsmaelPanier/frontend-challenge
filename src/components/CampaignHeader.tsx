import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import {
  QrCode2,
} from '@mui/icons-material';

interface CampaignHeaderProps {
  onOpenModal: (type: string) => void;
  onSave: () => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ onOpenModal, onSave }) => {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        {/* Logo et titre */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              position: 'relative',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              fontSize: '2rem',
              color: '#2D5BFF',
            }}
          >
            {/* Ellipse */}
            <Box
              sx={{
                position: 'absolute',
                top: '0.1em',
                left: '-0.5em',
                width: '100%',
                height: '1.8em',
                border: '3px solid #2D5BFF',
                borderRadius: '50%',
                transform: 'rotate(-5deg)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />
            
            {/* Texte */}
            <Box
              component="span"
              sx={{
                position: 'relative',
                zIndex: 2,
              }}
            >
              Ma Campagne
            </Box>
            
            {/* Étoiles */}
            <Box
              sx={{
                position: 'absolute',
                right: '-2em',
                bottom: '-1.2em',
                fontSize: '1.25rem',
                color: 'orange',
              }}
            >
              ✻ ✻ ✻
            </Box>
          </Box>
        </Box>

        {/* Boutons de navigation */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="contained"
            onClick={() => onOpenModal('pin')}
            sx={{ 
              fontSize: '1rem', 
              px: 4,
              py: 1.2,
              minWidth: 140,
              bgcolor: 'white',
              color: '#1a1a1a',
              border: 'none',
              borderLeft: '4px solid #6366f1',
              borderRadius: 0,
              whiteSpace: 'nowrap',
              '&:hover': {
                bgcolor: '#f5f5f5',
                borderLeft: '4px solid #6366f1',
              },
            }}
          >
            Mon Code PIN
          </Button>
          
          <Button
            variant="contained"
            startIcon={<QrCode2 />}
            onClick={() => onOpenModal('qr')}
            sx={{ 
              fontSize: '1rem', 
              px: 4,
              py: 1.2,
              minWidth: 120,
              bgcolor: '#ff9800',
              color: 'white',
              borderRadius: 0,
              '&:hover': {
                bgcolor: '#f57c00',
              },
            }}
          >
            QR Code
          </Button>

          <Button
            variant="contained"
            onClick={onSave}
            sx={{
              bgcolor: '#1976d2',
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
              px: 4,
              py: 1.2,
              minWidth: 160,
              borderRadius: 0,
              '&:hover': {
                bgcolor: '#1565c0',
              },
            }}
          >
            SAUVEGARDER
          </Button>

          <Button
            variant="contained"
            onClick={() => onOpenModal('more')}
            sx={{ 
              width: 48,
              height: 48,
              minWidth: 48,
              background: 'linear-gradient(135deg, #f8f9ff 0%, #e8ecff 100%)',
              border: '2px solid #e6e9ff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.5,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.08)',
              '&:hover': {
                background: 'linear-gradient(135deg, #f0f4ff 0%, #dde4ff 100%)',
                borderColor: '#d4deff',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 16px rgba(79, 70, 229, 0.12)',
              },
              '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 2px 8px rgba(79, 70, 229, 0.08)',
              },
            }}
          >
            <Box 
              sx={{ 
                width: 6, 
                height: 6, 
                borderRadius: '50%', 
                bgcolor: '#4f46e5',
                transition: 'all 0.3s ease',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', opacity: 1 },
                  '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                  '100%': { transform: 'scale(1)', opacity: 1 },
                },
              }} 
            />
            <Box 
              sx={{ 
                width: 6, 
                height: 6, 
                borderRadius: '50%', 
                bgcolor: '#4f46e5',
                transition: 'all 0.3s ease',
                animation: 'pulse 2s infinite',
                animationDelay: '0.3s',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', opacity: 1 },
                  '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                  '100%': { transform: 'scale(1)', opacity: 1 },
                },
              }} 
            />
            <Box 
              sx={{ 
                width: 6, 
                height: 6, 
                borderRadius: '50%', 
                bgcolor: '#4f46e5',
                transition: 'all 0.3s ease',
                animation: 'pulse 2s infinite',
                animationDelay: '0.6s',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', opacity: 1 },
                  '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                  '100%': { transform: 'scale(1)', opacity: 1 },
                },
              }} 
            />
          </Button>
        </Stack>
      </Toolbar>


    </AppBar>
  );
};

export default CampaignHeader; 