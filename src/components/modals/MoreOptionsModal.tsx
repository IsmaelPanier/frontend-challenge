import React, { memo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Close,
  Settings,
  Help,
  Feedback,
} from '@mui/icons-material';

interface MoreOptionsModalProps {
  open: boolean;
  onClose: () => void;
}

const MoreOptionsModal: React.FC<MoreOptionsModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSettingsClick = () => {
    alert('Configuration des paramètres...');
    // Ici on pourrait ouvrir une autre modale ou naviguer vers une page
  };

  const handleHelpClick = () => {
    alert('Ouverture de l\'aide...');
    // Ici on pourrait ouvrir une page d'aide ou documentation
  };

  const handleFeedbackClick = () => {
    alert('Formulaire de feedback...');
    // Ici on pourrait ouvrir un formulaire de feedback
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          margin: isMobile ? '16px' : '32px',
          maxHeight: isMobile ? 'calc(100% - 32px)' : 'calc(100% - 64px)',
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontSize: isMobile ? '1.1rem' : '1.25rem',
        px: isMobile ? 2 : 3,
        py: isMobile ? 1.5 : 2,
      }}>
        <Typography variant="h6" sx={{ fontSize: isMobile ? '1.1rem' : '1.25rem' }}>
          Options supplémentaires
        </Typography>
        <IconButton onClick={onClose} size={isMobile ? 'small' : 'medium'}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: isMobile ? 1 : 2 }}>
        <List>
          <ListItem 
            component="button" 
            onClick={handleSettingsClick}
            sx={{
              borderRadius: 1,
              mb: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ListItemIcon>
              <Settings color="primary" sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Paramètres avancés"
              secondary="Configuration des options avancées de la campagne"
              primaryTypographyProps={{
                fontSize: isMobile ? '0.95rem' : '1rem',
              }}
              secondaryTypographyProps={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
              }}
            />
          </ListItem>
          
          <ListItem 
            component="button" 
            onClick={handleHelpClick}
            sx={{
              borderRadius: 1,
              mb: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ListItemIcon>
              <Help color="info" sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Aide et documentation"
              secondary="Guide d'utilisation et FAQ"
              primaryTypographyProps={{
                fontSize: isMobile ? '0.95rem' : '1rem',
              }}
              secondaryTypographyProps={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
              }}
            />
          </ListItem>

          <ListItem 
            component="button" 
            onClick={handleFeedbackClick}
            sx={{
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ListItemIcon>
              <Feedback color="success" sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Feedback"
              secondary="Partagez vos commentaires et suggestions"
              primaryTypographyProps={{
                fontSize: isMobile ? '0.95rem' : '1rem',
              }}
              secondaryTypographyProps={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
              }}
            />
          </ListItem>
        </List>
      </DialogContent>
      
      <DialogActions sx={{ 
        px: isMobile ? 2 : 3,
        pb: isMobile ? 2 : 2,
      }}>
        <Button 
          onClick={onClose} 
          variant="contained"
          size={isMobile ? 'small' : 'medium'}
          fullWidth={isMobile}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(MoreOptionsModal); 