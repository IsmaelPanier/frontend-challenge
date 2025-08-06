import React, { memo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  IconButton,
  Alert,
  Box,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Close,
  Lock,
  Lightbulb,
  CheckCircle,
  Error,
} from '@mui/icons-material';
import { usePinCode } from '../../hooks';

interface PinCodeModalProps {
  open: boolean;
  onClose: () => void;
}

const PinCodeModal: React.FC<PinCodeModalProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const {
    pinCode,
    setPinCode,
    confirmPinCode,
    setConfirmPinCode,
    isModifyingPin,
    currentPin,
    savePinCode,
    initializePinModal,
    resetPinForm,
  } = usePinCode();

  React.useEffect(() => {
    if (open) {
      initializePinModal();
    }
  }, [open, initializePinModal]);

  const handleSave = () => {
    const result = savePinCode(pinCode, confirmPinCode);
    if (result.success) {
      alert(result.message);
      onClose();
      resetPinForm();
    } else {
      alert(result.message);
    }
  };

  const handleClose = () => {
    onClose();
    resetPinForm();
  };

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
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontSize: isMobile ? '1.1rem' : '1.25rem',
        px: isMobile ? 2 : 3,
        py: isMobile ? 1.5 : 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Lock color="primary" sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
          Configuration du Code PIN
        </Box>
        <IconButton onClick={handleClose} size={isMobile ? 'small' : 'medium'}>
          <Close />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
        <Stack spacing={isMobile ? 2 : 3} sx={{ mt: 2 }}>
          {/* Affichage du PIN actuel */}
          {currentPin && (
            <Alert severity="success">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle sx={{ fontSize: '1rem' }} />
                <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  Code PIN actuel configuré : ****{currentPin.slice(-2)}
                </Typography>
              </Box>
            </Alert>
          )}
          
          <Alert severity="info">
            <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
              {isModifyingPin 
                ? 'Modifiez votre code PIN ci-dessous. Il sécurise la récupération des cadeaux par vos clients.'
                : 'Le code PIN sécurise la récupération des cadeaux par vos clients. Choisissez un code de 4 à 6 chiffres facile à retenir.'
              }
            </Typography>
          </Alert>
          
          <TextField
            label={isModifyingPin ? "Nouveau Code PIN" : "Code PIN"}
            type="password"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Ex: 5678"
            helperText="Entre 4 et 6 chiffres"
            error={pinCode.length > 0 && pinCode.length < 4}
            fullWidth
            autoFocus
            size={isMobile ? 'small' : 'medium'}
          />
          
          <TextField
            label="Confirmer le Code PIN"
            type="password"
            value={confirmPinCode}
            onChange={(e) => setConfirmPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Répétez le même code"
            helperText="Confirmez votre code PIN"
            error={confirmPinCode.length > 0 && confirmPinCode !== pinCode}
            fullWidth
            size={isMobile ? 'small' : 'medium'}
          />

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Lightbulb sx={{ fontSize: '1rem', color: 'info.main', mt: 0.25 }} />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: isMobile ? '0.85rem' : '0.9rem' }}
            >
              <strong>Conseil :</strong> Évitez les codes trop évidents comme 0000, 1111, ou 1234.
            </Typography>
          </Box>
          
          {/* Validation en temps réel */}
          {pinCode.length >= 4 && confirmPinCode.length >= 4 && (
            <Alert severity={pinCode === confirmPinCode ? "success" : "error"}>
              {pinCode === confirmPinCode 
                ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: '1rem' }} />
                    <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                      Les codes PIN correspondent
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Error sx={{ fontSize: '1rem' }} />
                    <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                      Les codes PIN ne correspondent pas
                    </Typography>
                  </Box>
                )
              }
            </Alert>
          )}
        </Stack>
      </DialogContent>
      
      <DialogActions sx={{ 
        px: isMobile ? 2 : 3,
        pb: isMobile ? 2 : 2,
        gap: 1,
      }}>
        <Button onClick={handleClose} size={isMobile ? 'small' : 'medium'}>
          Annuler
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={pinCode.length < 4 || confirmPinCode.length < 4 || pinCode !== confirmPinCode}
          size={isMobile ? 'small' : 'medium'}
        >
          {isModifyingPin ? 'Modifier le PIN' : 'Configurer le PIN'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(PinCodeModal); 