import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Paper,
  Typography,
  Box,
  Stack,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  RadioGroup,
  Chip,
} from '@mui/material';
import type { Campaign, GameType, Profile } from '../../doc/CampaignType';

// Images des jeux
import wheelImage from '../assets/wheel.jpg';
import slotImage from '../assets/slot.png'; 
import mysteryImage from '../assets/mystery.png';
import cardImage from '../assets/card.png';

interface GameSelectionSectionProps {
  profile: Profile;
  disabled?: boolean;
}

const gameTypes = [
  {
    type: 'WHEEL' as GameType,
    title: 'ROUE DE LA FORTUNE',
    image: wheelImage,
    description: 'Jeu de la roue classique',
  },
  {
    type: 'MYSTERY' as GameType,
    title: 'LES BOÎTES MYSTÈRES',
    image: mysteryImage,
    description: 'Choisissez votre boîte mystère',
  },
  {
    type: 'SLOT_MACHINE' as GameType,
    title: 'MACHINE À SOUS',
    image: slotImage,
    description: 'Machine à sous interactive',
  },
  {
    type: 'CARD' as GameType,
    title: 'JEU DE CARTES',
    image: cardImage,
    description: 'Tirage de cartes',
  },
];

const GameSelectionSection: React.FC<GameSelectionSectionProps> = ({ disabled }) => {
  const { control } = useFormContext<Campaign>();

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* En-tête de section */}
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2 }}>
          <Box
            sx={{
              width: 8,
              bgcolor: 'primary.main',
              flexShrink: 0,
              minHeight: '100%'
            }}
          />
          <Box sx={{ flex: 1, py: 0.5 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              CHOIX DU JEU
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sélectionnez parmi 4 jeux interactifs pour engager vos utilisateurs et créer une expérience unique.
            </Typography>
            {disabled && (
              <Chip 
                label="Fonctionnalité PREMIUM" 
                color="secondary" 
                size="small" 
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </Box>

        {/* Sélection des jeux */}
        <Controller
          name="configuration.game_type"
          control={control}
          render={({ field }) => (
            <FormControl component="fieldset" disabled={disabled} sx={{ width: '100%' }}>
              <RadioGroup
                value={field.value}
                onChange={field.onChange}
                sx={{ width: '100%' }}
              >
                <Box 
                  sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 2,
                    mt: 1,
                  }}
                >
                  {gameTypes.map((game) => (
                    <Card
                      key={game.type}
                      sx={{
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        border: field.value === game.type ? '3px solid #1976d2' : 'none',
                        transition: 'all 0.2s ease-in-out',
                        opacity: disabled ? 0.6 : 1,
                        aspectRatio: '1',
                        position: 'relative',
                        overflow: 'visible',
                        '&:hover': {
                          transform: disabled ? 'none' : 'translateY(-2px)',
                        },
                      }}
                      onClick={() => !disabled && field.onChange(game.type)}
                    >
                      <CardMedia
                        component="img"
                        image={game.image}
                        alt={game.title}
                        sx={{ 
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      {field.value === game.type && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'primary.main',
                            color: 'white',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            zIndex: 1,
                          }}
                        >
                          ✓
                        </Box>
                      )}
                    </Card>
                  ))}
                </Box>
              </RadioGroup>
            </FormControl>
          )}
        />
      </Stack>
    </Paper>
  );
};

export default GameSelectionSection; 