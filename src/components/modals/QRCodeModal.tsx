import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Alert,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Close,
  QrCode2,
  Download,
  Share,
  CheckCircle,
} from '@mui/icons-material';
import type { Campaign } from '../../types/campaign';

interface QRCodeModalProps {
  open: boolean;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { watch } = useFormContext<Campaign>();
  const watchedData = watch();

  const handleDownload = () => {
    alert('Téléchargement du QR Code...');
    // Ici on pourrait implémenter la logique de téléchargement
  };

  const handleShare = () => {
    alert('Partage du QR Code...');
    // Ici on pourrait implémenter la logique de partage
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <QrCode2 color="secondary" sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
          QR Code de la Campagne
        </Box>
        <IconButton onClick={onClose} size={isMobile ? 'small' : 'medium'}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
        <Stack spacing={isMobile ? 2 : 3} sx={{ mt: 2 }}>
          {/* Simulation QR Code */}
          <Box
            sx={{
              width: isMobile ? 160 : 200,
              height: isMobile ? 160 : 200,
              bgcolor: 'white',
              border: 'none',
              borderRadius: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              backgroundImage: `
                repeating-linear-gradient(0deg, black, black 2px, white 2px, white 4px),
                repeating-linear-gradient(90deg, black, black 2px, white 2px, white 4px)
              `,
              backgroundSize: '8px 8px',
            }}
          >
            <Typography 
              variant="caption" 
              sx={{ 
                bgcolor: 'white', 
                p: 1, 
                borderRadius: 1,
                fontSize: isMobile ? '0.7rem' : '0.8rem',
              }}
            >
              QR Code
            </Typography>
          </Box>

          <Typography 
            variant="body2" 
            color="text.secondary" 
            textAlign="center"
            sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
          >
            Ce QR code permet à vos clients d'accéder directement à votre campagne de jeu.
          </Typography>

          <Alert severity="success">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircle sx={{ fontSize: '1rem' }} />
              <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                QR Code généré pour la campagne "{watchedData.label}"
              </Typography>
            </Box>
          </Alert>
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ 
        px: isMobile ? 2 : 3,
        pb: isMobile ? 2 : 2,
        flexDirection: isMobile ? 'column' : 'row',
        gap: 1,
      }}>
        <Button 
          startIcon={<Download />} 
          onClick={handleDownload}
          size={isMobile ? 'small' : 'medium'}
          fullWidth={isMobile}
        >
          Télécharger
        </Button>
        <Button 
          startIcon={<Share />} 
          onClick={handleShare}
          size={isMobile ? 'small' : 'medium'}
          fullWidth={isMobile}
        >
          Partager
        </Button>
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

export default memo(QRCodeModal); 