import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Paper,
  Typography,
  Box,
  Stack,
  Card,
  CardMedia,
  FormControl,
  RadioGroup,
  Chip,
  useMediaQuery,
  useTheme,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import type { Campaign, GameType, Profile } from '../types/campaign';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // < 1280px
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 1280px
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Paper sx={{ p: isMobile ? 2 : 3 }}>
      <Stack spacing={isMobile ? 2 : 3}>
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
                bgcolor: 'primary.main',
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
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                }}
              >
                CHOIX DU JEU
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: 1.4,
                }}
              >
                Sélectionnez parmi 4 jeux interactifs pour engager vos utilisateurs et créer une expérience unique.
              </Typography>
              {disabled && (
                <Chip 
                  label="Fonctionnalité PREMIUM" 
                  color="secondary" 
                  size="small" 
                  sx={{ 
                    mt: 1,
                    fontSize: isMobile ? '0.7rem' : '0.8rem',
                  }}
                />
              )}
            </Box>
          </Box>
          <IconButton sx={{ mt: 0.5 }} size={isMobile ? 'small' : 'medium'}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={isExpanded}>
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
                      gridTemplateColumns: 
                        isSmallMobile ? 'repeat(1, 1fr)' :  // Mobile très petit: 1 colonne
                        isTablet ? 'repeat(2, 1fr)' :       // Tablette: 2 colonnes  
                        isMobile ? 'repeat(2, 1fr)' :       // Mobile standard: 2 colonnes
                        'repeat(4, 1fr)',                   // Desktop: 4 colonnes
                      gap: isMobile ? 1 : 2,
                      mt: 1,
                      width: '100%',
                    }}
                  >
                    {gameTypes.map((game) => (
                      <Card
                        key={game.type}
                        sx={{
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          border: field.value === game.type ? 
                            `${isMobile ? '2px' : '3px'} solid #1976d2` : 'none',
                          transition: 'all 0.2s ease-in-out',
                          opacity: disabled ? 0.6 : 1,
                          aspectRatio: isSmallMobile ? '4/3' : isMobile ? '1' : '1',
                          position: 'relative',
                          overflow: 'hidden',
                          p: 0,
                          m: 0,
                          width: '100%',
                          minHeight: isSmallMobile ? 'auto' : isMobile ? '120px' : '150px',
                          boxSizing: 'border-box',
                          '&:hover': {
                            transform: disabled ? 'none' : isMobile ? 'none' : 'translateY(-2px)',
                            boxShadow: disabled ? 'none' : '0 4px 12px rgba(0,0,0,0.1)',
                          },
                          '& .MuiCardMedia-root': {
                            margin: 0,
                            padding: 0,
                            width: '100%',
                            height: '100%',
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
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            m: 0,
                            p: 0,
                            border: 'none',
                            outline: 'none',
                          }}
                        />

                        {/* Indicateur de sélection - responsive */}
                        {field.value === game.type && (
                          <Box
                            sx={{
                              position: 'absolute',
                              top: isSmallMobile ? 6 : isMobile ? 8 : 4,
                              right: isSmallMobile ? 6 : isMobile ? 8 : 4,
                              bgcolor: 'primary.main',
                              color: 'white',
                              borderRadius: '50%',
                              width: isSmallMobile ? 24 : isMobile ? 28 : 24,
                              height: isSmallMobile ? 24 : isMobile ? 28 : 24,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: isSmallMobile ? '12px' : isMobile ? '16px' : '14px',
                              fontWeight: 'bold',
                              zIndex: 2,
                              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                              border: '2px solid white',
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
        </Collapse>
      </Stack>
    </Paper>
  );
};

export default GameSelectionSection; 