import React, { useState } from 'react';
import {
  Typography,

  Button,
  Stack,
  useMediaQuery,
  useTheme,
  Box,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';


interface AlertsSectionProps {
  pinConfigured?: boolean;
  onConfigurePin?: () => void;
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ pinConfigured = false, onConfigurePin }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Stack spacing={2}>
      {/* En-tête avec bouton d'expansion */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          cursor: 'pointer',
          gap: 1,
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2, flex: 1 }}>
          <Box
            sx={{
              width: 8,
              bgcolor: 'warning.main',
              flexShrink: 0,
              minHeight: '100%'
            }}
          />
          <Box sx={{ flex: 1, py: 0.5 }}>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                color: 'text.primary', 
                mb: 1,
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                lineHeight: 1.2,
              }}
            >
              ALERTES ET NOTIFICATIONS
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontSize: isMobile ? '0.85rem' : '1rem',
                lineHeight: 1.4,
              }}
            >
              Vérifiez les alertes importantes pour votre campagne
            </Typography>
          </Box>
        </Box>
        <IconButton sx={{ mt: 0.5 }} size={isMobile ? 'small' : 'medium'}>
          {isExpanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      <Collapse in={isExpanded}>
        {/* Alerte Code PIN - Design exact comme l'exemple HTML */}
        {!pinConfigured && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff4c4',
              border: '1px solid #f6e27a',
              borderRadius: '8px',
              padding: isMobile ? '12px 16px' : '16px 24px',
              maxWidth: '100%',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 2 : 0,
            }}
          >
            {/* Contenu de l'alerte */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flex: 1,
              }}
            >
              {/* Icône */}
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  color: '#e0c200',
                  border: '1px solid #e6e6e6',
                  flexShrink: 0,
                }}
              >
                🔒
              </Box>
              
              {/* Contenu texte */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: isMobile ? 'center' : 'left',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    color: '#2c2c2c',
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    mb: 0.3,
                  }}
                >
                  Votre Code PIN n'est pas configuré
                </Typography>
                <Typography
                  sx={{
                    color: '#444',
                    fontSize: isMobile ? '0.8rem' : '14px',
                    lineHeight: 1.4,
                  }}
                >
                  Activez-le pour sécuriser l'authentification des paiements par vos clients.
                </Typography>
              </Box>
            </Box>

            {/* Bouton */}
            <Button
              onClick={onConfigurePin}
              variant="contained"
              sx={{
                bgcolor: '#f9c700',
                color: '#2c2c2c',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  bgcolor: '#e6b800',
                },
              }}
            >
              {isMobile ? 'CONFIGURER' : 'CONFIGURER MON CODE'}
            </Button>
          </Box>
        )}
      </Collapse>
    </Stack>
  );
};

export default AlertsSection; 