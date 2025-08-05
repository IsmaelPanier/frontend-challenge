import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Box,
  Container,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  IconButton,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Close,
  Lock,
  QrCode2,
  Download,
  Share,
  Settings,
  Help,
  Feedback,
  Lightbulb,
  CheckCircle,
  Error,

} from '@mui/icons-material';
import type { Campaign, Profile } from '../../doc/CampaignType';
import CampaignHeader from '../components/CampaignHeader';
import AlertsSection from '../components/AlertsSection';
import ActionsSection from '../components/ActionsSection';
import GameSelectionSection from '../components/GameSelectionSection';
import GameCustomizationSection from '../components/GameCustomizationSection';
import RewardsSection from './RewardsSection';
import RetrievalConditionsSection from './RetrievalConditionsSection';

// Mock data par défaut
const defaultCampaign: Campaign = {
  id: '1',
  profile: 'PREMIUM' as Profile,
  configuration: {
    actions: [],
    colors: {
      primary: '#1976d2',
      secondary: '#ff9800',
    },
    disabled: false,
    game_type: 'WHEEL',
    gifts: [],
    retrievalConditions: [],
    logo_uri: '',
    pin_code: '', // Code PIN de la campagne
  },
  created_at: new Date().toISOString(),
  created_by: 'user@example.com',
  enabled: true,
  label: 'Ma Campagne',
  placeId: 'place123',
  updated_at: new Date().toISOString(),
  updated_by: 'user@example.com',
};

const CampaignConfigurationPage: React.FC = () => {
  const methods = useForm<Campaign>({
    defaultValues: defaultCampaign,
    mode: 'onChange',
  });

  // États pour les modales
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [confirmPinCode, setConfirmPinCode] = useState('');
  const [isModifyingPin, setIsModifyingPin] = useState(false);

  const { handleSubmit, watch, setValue, getValues } = methods;
  const watchedData = watch();
  
  // Récupérer le PIN actuel de la campagne
  const currentPin = watchedData.configuration?.pin_code || '';

  // Charger les données sauvegardées au démarrage
  React.useEffect(() => {
    const savedCampaign = localStorage.getItem('campaign');
    if (savedCampaign) {
      try {
        const parsedCampaign = JSON.parse(savedCampaign);
        methods.reset(parsedCampaign);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    }
  }, [methods]);

  const onSubmit = (data: Campaign) => {
    console.log('Données de la campagne:', data);
    localStorage.setItem('campaign', JSON.stringify(data));
    alert('Campagne sauvegardée !');
  };

  const handleOpenModal = (type: string) => {
    switch (type) {
      case 'pin':
        // Initialiser les champs selon si on modifie ou configure pour la première fois
        if (currentPin) {
          setIsModifyingPin(true);
          setPinCode('');
          setConfirmPinCode('');
        } else {
          setIsModifyingPin(false);
          setPinCode('');
          setConfirmPinCode('');
        }
        setPinModalOpen(true);
        break;
      case 'qr':
        setQrModalOpen(true);
        break;
      case 'more':
        setMoreModalOpen(true);
        break;
      default:
        console.log(`Modal type "${type}" not implemented`);
    }
  };

  const handleSavePinCode = () => {
    // Validation
    if (pinCode.length < 4 || pinCode.length > 6) {
      alert('❌ Le code PIN doit contenir entre 4 et 6 chiffres');
      return;
    }
    
    if (pinCode !== confirmPinCode) {
      alert('❌ Les codes PIN ne correspondent pas');
      return;
    }
    
    // Éviter les codes trop évidents
    const forbiddenCodes = ['0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999', '1234', '4321'];
    if (forbiddenCodes.includes(pinCode)) {
      alert('❌ Ce code PIN est trop évident. Choisissez un code plus sécurisé.');
      return;
    }
    
    // Sauvegarder le PIN dans la configuration de la campagne
    setValue('configuration.pin_code', pinCode);
    
    // Sauvegarder immédiatement dans localStorage pour persistance
    const currentData = getValues();
    const updatedData = {
      ...currentData,
      configuration: {
        ...currentData.configuration,
        pin_code: pinCode
      },
      updated_at: new Date().toISOString(),
    };
    localStorage.setItem('campaign', JSON.stringify(updatedData));
    
    alert(`✅ Code PIN ${isModifyingPin ? 'modifié' : 'configuré'} avec succès !`);
    setPinModalOpen(false);
    setPinCode('');
    setConfirmPinCode('');
    setIsModifyingPin(false);
  };

  return (
    <FormProvider {...methods}>
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        {/* En-tête */}
        <CampaignHeader 
          onOpenModal={handleOpenModal}
          onSave={handleSubmit(onSubmit)}
        />

        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Stack spacing={3}>
            {/* Section des alertes */}
            <AlertsSection 
              pinConfigured={!!currentPin}
              onConfigurePin={() => handleOpenModal('pin')}
            />

            <Divider sx={{ my: 2 }} />

            {/* Section Organisation des Actions */}
            <ActionsSection />

            <Divider sx={{ my: 2 }} />

            {/* Section Choix du Jeu */}
            <GameSelectionSection 
              profile={watchedData.profile}
              disabled={watchedData.profile === 'BASIC'}
            />

            <Divider sx={{ my: 2 }} />

            {/* Section Personnalisation du Jeu */}
            <GameCustomizationSection 
              disabled={watchedData.profile === 'BASIC'}
            />

            <Divider sx={{ my: 2 }} />

            {/* Section Configuration des Récompenses */}
            <RewardsSection />

            <Divider sx={{ my: 2 }} />

            {/* Section Conditions de Récupération */}
            <RetrievalConditionsSection />
          </Stack>
        </Container>

        {/* Modale Code PIN */}
        <Dialog open={pinModalOpen} onClose={() => setPinModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Lock color="primary" />
              Configuration du Code PIN
            </Box>
            <IconButton onClick={() => setPinModalOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              {/* Affichage du PIN actuel */}
              {currentPin && (
                <Alert severity="success">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: '1rem' }} />
                    Code PIN actuel configuré : ****{currentPin.slice(-2)}
                  </Box>
                </Alert>
              )}
              
              <Alert severity="info">
                {isModifyingPin 
                  ? 'Modifiez votre code PIN ci-dessous. Il sécurise la récupération des cadeaux par vos clients.'
                  : 'Le code PIN sécurise la récupération des cadeaux par vos clients. Choisissez un code de 4 à 6 chiffres facile à retenir.'
                }
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
              />

              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <Lightbulb sx={{ fontSize: '1rem', color: 'info.main', mt: 0.25 }} />
                <Typography variant="body2" color="text.secondary">
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
                        Les codes PIN correspondent
                      </Box>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Error sx={{ fontSize: '1rem' }} />
                        Les codes PIN ne correspondent pas
                      </Box>
                    )
                  }
                </Alert>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPinModalOpen(false)}>Annuler</Button>
            <Button 
              onClick={handleSavePinCode} 
              variant="contained"
              disabled={pinCode.length < 4 || confirmPinCode.length < 4 || pinCode !== confirmPinCode}
            >
              {isModifyingPin ? 'Modifier le PIN' : 'Configurer le PIN'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modale QR Code */}
        <Dialog open={qrModalOpen} onClose={() => setQrModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <QrCode2 color="secondary" />
              QR Code de la Campagne
            </Box>
            <IconButton onClick={() => setQrModalOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Stack spacing={3} sx={{ mt: 2 }}>
              {/* Simulation QR Code */}
              <Box
                sx={{
                  width: 200,
                  height: 200,
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
                <Typography variant="caption" sx={{ bgcolor: 'white', p: 1, borderRadius: 1 }}>
                  QR Code
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" textAlign="center">
                Ce QR code permet à vos clients d'accéder directement à votre campagne de jeu.
              </Typography>

              <Alert severity="success">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: '1rem' }} />
                  QR Code généré pour la campagne "{watchedData.label}"
                </Box>
              </Alert>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button startIcon={<Download />} onClick={() => alert('Téléchargement du QR Code...')}>
              Télécharger
            </Button>
            <Button startIcon={<Share />} onClick={() => alert('Partage du QR Code...')}>
              Partager
            </Button>
            <Button onClick={() => setQrModalOpen(false)} variant="contained">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>

        {/* Modale Options supplémentaires */}
        <Dialog open={moreModalOpen} onClose={() => setMoreModalOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Options supplémentaires</Typography>
            <IconButton onClick={() => setMoreModalOpen(false)}>
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <List>
              <ListItem component="button" onClick={() => alert('Configuration des paramètres...')}>
                <ListItemIcon>
                  <Settings color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Paramètres avancés"
                  secondary="Configuration des options avancées de la campagne"
                />
              </ListItem>
              
              <ListItem component="button" onClick={() => alert('Ouverture de l\'aide...')}>
                <ListItemIcon>
                  <Help color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary="Aide et documentation"
                  secondary="Guide d'utilisation et FAQ"
                />
              </ListItem>

              <ListItem component ="button" onClick={() => alert('Formulaire de feedback...')}>
                <ListItemIcon>
                  <Feedback color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Feedback"
                  secondary="Partagez vos commentaires et suggestions"
                />
              </ListItem>
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMoreModalOpen(false)} variant="contained">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </FormProvider>
  );
};

export default CampaignConfigurationPage; 