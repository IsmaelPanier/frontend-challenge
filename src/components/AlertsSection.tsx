import React from 'react';
import {
  Typography,
  Alert,
  Button,
  Stack,
} from '@mui/material';
import { Lock } from '@mui/icons-material';


interface AlertsSectionProps {
  pinConfigured?: boolean;
  onConfigurePin?: () => void;
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ pinConfigured = false, onConfigurePin }) => {
  return (
    <Stack spacing={2}>
      {/* Alerte Code PIN - Ne s'affiche que si le PIN n'est pas configuré */}
      {!pinConfigured && (
        <Alert 
          severity="warning" 
          icon={
            <Lock 
              sx={{
                borderRadius: 0,
                border: 'none',
                padding: '8px',
                bgcolor: 'white',
                color: '#ff9800',
                fontSize: '1.2rem'
              }}
            />
          }
          action={
            <Button 
              color="inherit" 
              size="small"
              variant="contained"
              onClick={onConfigurePin}
              sx={{ 
                bgcolor: '#ff9800',
                color: 'white',
                fontWeight: 600,
                px: 2.5,
                py: 1,
                '&:hover': { 
                  bgcolor: '#f57c00',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              CONFIGURER MON CODE
            </Button>
          }
          sx={{
            bgcolor: '#fff8e1',
            color: '#e65100',
            border: 'none',
            borderRadius: 0,
            py: 2,
            px: 3,
            '& .MuiAlert-icon': {
              alignItems: 'center',
              mr: 2,
            },
            '& .MuiAlert-message': {
              flex: 1,
            },
            '& .MuiAlert-action': {
              pl: 2,
            }
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: '#e65100' }}>
            Votre Code PIN n'est pas configuré
          </Typography>
          <Typography variant="body2" sx={{ color: '#ef6c00' }}>
            Activez le pour sécuriser la récupération des cadeaux par vos clients.
          </Typography>
        </Alert>
      )}


    </Stack>
  );
};

export default AlertsSection; 