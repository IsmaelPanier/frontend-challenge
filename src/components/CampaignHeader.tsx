import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import {
  QrCode2,
  Save,
  VpnKey,
  MoreHoriz,
} from '@mui/icons-material';

interface CampaignHeaderProps {
  onOpenModal: (type: string) => void;
  onSave: () => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ onOpenModal, onSave }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isVerySmallMobile = useMediaQuery(theme.breakpoints.down(400));


  // Calcul responsive des tailles
  const getTitleSize = () => {
    if (isVerySmallMobile) return '1rem';
    if (isSmallMobile) return '1.2rem';
    if (isMobile) return '1.5rem';
    return '2rem';
  };

  const getEllipseStyles = () => {
    return {
      position: 'absolute',
      top: '0.1em',
      left: '-0.5em',
      width: '110%', // Largeur fixe pour bien épouser le texte
      height: '1.8em',
      border: `${isMobile ? '2px' : '3px'} solid #2D5BFF`,
      borderRadius: '50%',
      transform: 'rotate(-5deg)',
      zIndex: 1,
      pointerEvents: 'none',
    };
  };

  const getStarsStyles = () => {
    return {
      position: 'absolute',
      right: '-1em',
      bottom: '-0.2em', // Position corrigée comme dans le CSS
      fontSize: isVerySmallMobile ? '0.6rem' : isMobile ? '0.8rem' : '20px', // Taille fixe sur desktop
      color: 'orange',
      display: 'block',
      zIndex: 2,
    };
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        py: isMobile ? 0.5 : 1,
        minHeight: isMobile ? 56 : 64,
        px: isMobile ? 1 : 3,
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: isMobile ? 1 : 0,
      }}>
        {/* Ligne principale mobile/desktop */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%',
        }}>
          {/* Logo et titre responsive */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? 1 : 2,
            overflow: 'visible',
          }}>
            <Box
              sx={{
                position: 'relative',
                fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold',
                fontSize: getTitleSize(),
                color: '#2D5BFF',
                whiteSpace: 'nowrap',
                display: 'inline-block',
                minWidth: 'fit-content',
                pr: isVerySmallMobile ? '1.5em' : '2em', // Espace pour les étoiles ajusté
              }}
            >
              {/* Ellipse responsive */}
              <Box sx={getEllipseStyles()} />
              
              {/* Texte */}
              <Box
                component="span"
                sx={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'inline-block',
                }}
              >
                Ma Campagne
              </Box>
              
              {/* Étoiles avec caractères corrects */}
              <Box sx={getStarsStyles()}>
                ✻ ✻ ✻
              </Box>
            </Box>
          </Box>

          {/* Boutons principaux - toujours visibles sur desktop */}
          {!isMobile && (
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                onClick={() => onOpenModal('pin')}
                color="primary"
                sx={{ 
                  minWidth: 140,
                  borderLeft: '4px solid',
                  borderLeftColor: 'primary.main',
                  textTransform: 'none',
                }}
              >
                Mon Code PIN
              </Button>

              <Button
                variant="outlined"
                startIcon={<QrCode2 />}
                onClick={() => onOpenModal('qr')}
                color="warning"
                sx={{ 
                  minWidth: 140,
                  textTransform: 'none',
                }}
              >
                QR Code
              </Button>
              
              <Button
                variant="contained"
                onClick={onSave}
                color="primary"
                sx={{ 
                  minWidth: 120,
                  textTransform: 'none',
                }}
              >
                Sauvegarder
              </Button>

              <Button
                variant="text"
                startIcon={<MoreHoriz />}
                onClick={() => onOpenModal('more')}
                sx={{ 
                  minWidth: 80,
                  textTransform: 'none',
                  color: 'text.secondary',
                }}
              >
                Plus
              </Button>
            </Stack>
          )}

          {/* Boutons responsives mobile */}
          {isMobile && (
            <Stack direction="row" spacing={1} sx={{ ml: 2 }}>
              <IconButton
                onClick={() => onOpenModal('pin')}
                color="primary"
                sx={{ 
                  width: 42,
                  height: 42,
                  bgcolor: 'background.paper',
                  border: '2px solid',
                  borderColor: 'primary.main',
                }}
              >
                <VpnKey fontSize="small" />
              </IconButton>

              <IconButton
                onClick={() => onOpenModal('qr')}
                color="warning"
                sx={{ 
                  width: 42,
                  height: 42,
                  bgcolor: 'background.paper',
                  border: '2px solid',
                  borderColor: 'warning.main',
                }}
              >
                <QrCode2 fontSize="small" />
              </IconButton>
              
              <IconButton
                onClick={onSave}
                color="primary"
                sx={{ 
                  width: 42,
                  height: 42,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                <Save fontSize="small" />
              </IconButton>
              
              <IconButton
                onClick={() => onOpenModal('more')}
                sx={{ 
                  width: 42,
                  height: 42,
                  bgcolor: 'background.paper',
                  color: 'text.secondary',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <MoreHoriz fontSize="small" />
              </IconButton>
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CampaignHeader; 