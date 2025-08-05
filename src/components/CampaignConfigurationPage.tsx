import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Box,
  Container,
  Stack,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { Campaign, Profile } from '../types/campaign';
import CampaignHeader from './CampaignHeader';
import AlertsSection from './AlertsSection';
import ActionsSection from './ActionsSection';
import GameSelectionSection from './GameSelectionSection';
import GameCustomizationSection from './GameCustomizationSection';
import RewardsSection from './RewardsSection';
import RetrievalConditionsSection from './RetrievalConditionsSection';
import { PinCodeModal, QRCodeModal, MoreOptionsModal } from './modals';

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // États pour les modales
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [moreModalOpen, setMoreModalOpen] = useState(false);

  const { handleSubmit, watch } = methods;
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

  return (
    <FormProvider {...methods}>
      <Box sx={{ 
        width: '100%', 
        minHeight: '100vh',
        pt: isMobile ? 7 : 0, // Espace pour le menu hamburger mobile
      }}>
        {/* En-tête */}
        <CampaignHeader 
          onOpenModal={handleOpenModal}
          onSave={handleSubmit(onSubmit)}
        />

        {/* Contenu principal */}
        <Container 
          maxWidth="lg" 
          sx={{ 
            py: isMobile ? 2 : 3,
            px: isMobile ? 1 : 3,
          }}
        >
          <Stack spacing={isMobile ? 2 : 3}>
            {/* Section des alertes */}
            <AlertsSection 
              pinConfigured={!!currentPin}
              onConfigurePin={() => handleOpenModal('pin')}
            />

            <Divider sx={{ my: isMobile ? 1 : 2 }} />

            {/* Section Organisation des Actions */}
            <ActionsSection />

            <Divider sx={{ my: isMobile ? 1 : 2 }} />

            {/* Section Choix du Jeu */}
            <GameSelectionSection 
              profile={watchedData.profile}
              disabled={watchedData.profile === 'BASIC'}
            />

            <Divider sx={{ my: isMobile ? 1 : 2 }} />

            {/* Section Personnalisation du Jeu */}
            <GameCustomizationSection 
              disabled={watchedData.profile === 'BASIC'}
            />

            <Divider sx={{ my: isMobile ? 1 : 2 }} />

            {/* Section Configuration des Récompenses */}
            <RewardsSection />

            <Divider sx={{ my: isMobile ? 1 : 2 }} />

            {/* Section Conditions de Récupération */}
            <RetrievalConditionsSection />
          </Stack>
        </Container>

        {/* Nouvelles modales séparées */}
        <PinCodeModal 
          open={pinModalOpen} 
          onClose={() => setPinModalOpen(false)} 
        />
        
        <QRCodeModal 
          open={qrModalOpen} 
          onClose={() => setQrModalOpen(false)} 
        />
        
        <MoreOptionsModal 
          open={moreModalOpen} 
          onClose={() => setMoreModalOpen(false)} 
        />
      </Box>
    </FormProvider>
  );
};

export default CampaignConfigurationPage; 