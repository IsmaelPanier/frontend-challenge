import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Google,
  Instagram,
  Facebook,
  VideoLibrary,
} from '@mui/icons-material';
import type { Action, ActionType } from '../../types/campaign';

const actionTypeConfig = {
  GOOGLE_REVIEW: {
    label: 'Avis Google',
    icon: <Google />,
    color: '#34a853' as const,
    placeholder: 'https://google.com/maps/...',
  },
  INSTAGRAM: {
    label: 'Instagram',
    icon: <Instagram />,
    color: '#e4405f' as const,
    placeholder: '@nom_etablissement',
  },
  FACEBOOK: {
    label: 'Facebook', 
    icon: <Facebook />,
    color: '#1877f2' as const,
    placeholder: '@nom_page_facebook',
  },
  TIKTOK: {
    label: 'TikTok',
    icon: <VideoLibrary />,
    color: '#000000' as const,
    placeholder: '@nom_compte_tiktok',
  },
};

interface EditActionModalProps {
  open: boolean;
  onClose: () => void;
  action: Action | null;
  onSave: (updatedAction: Action) => void;
}

const EditActionModal: React.FC<EditActionModalProps> = ({
  open,
  onClose,
  action,
  onSave,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState<Partial<Action>>({
    type: 'GOOGLE_REVIEW',
    target: '',
  });

  useEffect(() => {
    if (action) {
      setFormData({
        type: action.type,
        target: action.target,
      });
    }
  }, [action]);

  const handleSave = () => {
    if (action && formData.type && formData.target) {
      const updatedAction: Action = {
        ...action,
        type: formData.type,
        target: formData.target,
      };
      onSave(updatedAction);
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      type: 'GOOGLE_REVIEW',
      target: '',
    });
    onClose();
  };

  const selectedConfig = formData.type ? actionTypeConfig[formData.type] : null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          margin: isMobile ? '16px' : '32px',
          maxHeight: isMobile ? 'calc(100% - 32px)' : 'calc(100% - 64px)',
          borderRadius: '16px',
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle sx={{ 
        fontSize: isMobile ? '1.1rem' : '1.25rem',
        pb: isMobile ? 1 : 2,
      }}>
        Modifier l'action
      </DialogTitle>
      
      <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 2,
              fontSize: isMobile ? '0.85rem' : '0.9rem',
            }}
          >
            Modifiez les paramètres de votre action.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Type d'action */}
          <FormControl fullWidth>
            <InputLabel sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
              Type d'action
            </InputLabel>
            <Select
              value={formData.type || ''}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as ActionType })}
              label="Type d'action"
              sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
            >
              {Object.entries(actionTypeConfig).map(([type, config]) => (
                <MenuItem key={type} value={type} sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: config.color }}>
                      {config.icon}
                    </Box>
                    {config.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Cible */}
          <TextField
            fullWidth
            label="Cible"
            value={formData.target || ''}
            onChange={(e) => setFormData({ ...formData, target: e.target.value })}
            placeholder={selectedConfig?.placeholder || ''}
            helperText={`Exemple: ${selectedConfig?.placeholder || ''}`}
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: isMobile ? '0.9rem' : '1rem',
              },
              '& .MuiInputBase-input': {
                fontSize: isMobile ? '0.9rem' : '1rem',
              },
              '& .MuiFormHelperText-root': {
                fontSize: isMobile ? '0.75rem' : '0.8rem',
              },
            }}
          />

          {/* Aperçu */}
          {selectedConfig && formData.target && (
            <Box sx={{ 
              p: 2, 
              bgcolor: 'grey.50', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.200',
            }}>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mb: 1,
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontWeight: 600,
                }}
              >
                Aperçu :
              </Typography>
              <Chip
                icon={selectedConfig.icon}
                label={selectedConfig.label}
                variant="filled"
                size="small"
                sx={{
                  bgcolor: selectedConfig.color,
                  color: '#ffffff',
                  fontSize: isMobile ? '0.7rem' : '0.8rem',
                  height: isMobile ? 24 : 28,
                  fontWeight: 600,
                  '& .MuiChip-icon': {
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    color: '#ffffff',
                  },
                }}
              />
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  mt: 1,
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  fontStyle: 'italic',
                }}
              >
                Cible : {formData.target}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ 
        px: isMobile ? 2 : 3,
        pb: isMobile ? 2 : 2,
      }}>
        <Button 
          onClick={handleClose} 
          size={isMobile ? 'small' : 'medium'}
          sx={{ textTransform: 'none' }}
        >
          Annuler
        </Button>
        <Button 
          onClick={handleSave}
          variant="contained"
          disabled={!formData.type || !formData.target}
          size={isMobile ? 'small' : 'medium'}
          sx={{ textTransform: 'none' }}
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditActionModal; 