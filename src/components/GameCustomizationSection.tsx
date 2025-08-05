import React, { useState, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Paper,
  Typography,
  Box,
  Stack,

  Button,
  Card,
  CardContent,

  Alert,
  IconButton,
  useMediaQuery,
  useTheme,
  Collapse,
} from '@mui/material';
import {
  CloudUpload,
  Visibility,
  Delete,

  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import type { Campaign } from '../types/campaign';

interface GameCustomizationSectionProps {
  disabled?: boolean;
}

const GameCustomizationSection: React.FC<GameCustomizationSectionProps> = ({ disabled }) => {
  const { watch, setValue } = useFormContext<Campaign>();
  const [dragOver, setDragOver] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  const colors = watch('configuration.colors');
  const logoUri = watch('configuration.logo_uri');

  // Validation des couleurs hexadécimales
  const isValidHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  // Gestion du drag & drop pour le logo
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue('configuration.logo_uri', result);
        setLogoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  }, [setValue]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeLogo = () => {
    setValue('configuration.logo_uri', '');
    setLogoPreview('');
  };

  const previewColors = () => {
    alert(`Aperçu avec les couleurs:\nPrimaire: ${colors?.primary}\nSecondaire: ${colors?.secondary}`);
  };

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
                sx={{ 
                  fontWeight: 600, 
                  color: 'text.primary', 
                  mb: 1,
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                }}
              >
                PERSONNALISEZ VOTRE JEU
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: 1.4,
                }}
              >
                Importez votre logo et sélectionnez vos couleurs pour créer un jeu à l'image de votre
                marque. Offrez à vos clients une expérience unique, entièrement personnalisée.
              </Typography>
            </Box>
          </Box>
          <IconButton sx={{ mt: 0.5 }} size={isMobile ? 'small' : 'medium'}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={isExpanded}>
          <Stack spacing={isMobile ? 2 : 3}>
            {/* Alertes pour profil BASIC */}
            {disabled && (
              <Alert severity="info" sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                La personnalisation des couleurs est disponible avec le profil PREMIUM.
              </Alert>
            )}

            {/* Layout responsive : deux colonnes sur desktop, empilé sur mobile */}
            <Box sx={{ 
              display: 'flex', 
              gap: isMobile ? 0 : 3,
              flexDirection: isMobile ? 'column' : 'row',
            }}>
              {/* Section Logo */}
              <Box sx={{ 
                flex: 1,
                order: isMobile ? 2 : 1,
                mt: isMobile ? 3 : 0,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 4,
                      bgcolor: 'primary.main',
                      flexShrink: 0,
                      minHeight: '100%'
                    }}
                  />
                  <Box sx={{ flex: 1, py: 0.5 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600, 
                        color: 'text.primary',
                        fontSize: isMobile ? '1rem' : '1.1rem',
                      }}
                    >
                      Votre logo
                    </Typography>
                  </Box>
                </Box>

                {/* Zone de dépôt du logo */}
                <Card
                  sx={{
                    border: 'none',
                    bgcolor: dragOver ? 'action.hover' : 'background.paper',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.6 : 1,
                    minHeight: isMobile ? 200 : 280,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                  onDragOver={disabled ? undefined : handleDragOver}
                  onDragLeave={disabled ? undefined : handleDragLeave}
                  onDrop={disabled ? undefined : handleDrop}
                >
                  <CardContent sx={{ textAlign: 'center', p: isMobile ? 2 : 3 }}>
                    {logoUri || logoPreview ? (
                      <Box sx={{ position: 'relative' }}>
                        <img
                          src={logoUri || logoPreview}
                          alt="Logo"
                          style={{
                            maxWidth: isMobile ? '120px' : '150px',
                            maxHeight: isMobile ? '120px' : '150px',
                            objectFit: 'contain',
                          }}
                        />
                        {!disabled && (
                          <IconButton
                            onClick={removeLogo}
                            sx={{
                              position: 'absolute',
                              top: -10,
                              right: -10,
                              bgcolor: 'error.main',
                              color: 'white',
                              '&:hover': { bgcolor: 'error.dark' },
                              width: isMobile ? 28 : 32,
                              height: isMobile ? 28 : 32,
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    ) : (
                      <Stack spacing={2} alignItems="center">
                        <CloudUpload sx={{ 
                          fontSize: isMobile ? 36 : 48, 
                          color: 'grey.400' 
                        }} />
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ fontSize: isMobile ? '0.85rem' : '0.9rem' }}
                        >
                          Glissez votre logo ici ou
                        </Typography>
                        <Button
                          variant="contained"
                          component="label"
                          disabled={disabled}
                          startIcon={<CloudUpload />}
                          color="primary"
                          size={isMobile ? 'small' : 'medium'}
                          sx={{ textTransform: 'none' }}
                        >
                          {isMobile ? 'CHOISIR FICHIER' : 'SÉLECTIONNER UN FICHIER'}
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleFileSelect}
                          />
                        </Button>
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Box>

              {/* Section Couleurs */}
              <Box sx={{ 
                flex: 1,
                order: isMobile ? 1 : 2,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 4,
                      bgcolor: 'primary.main',
                      flexShrink: 0,
                      minHeight: '100%'
                    }}
                  />
                  <Box sx={{ 
                    flex: 1, 
                    py: 0.5, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    gap: 2,
                  }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        fontWeight: 600, 
                        color: 'text.primary',
                        fontSize: isMobile ? '1rem' : '1.1rem',
                      }}
                    >
                      Vos couleurs
                    </Typography>
                    <Button
                      variant="text"
                      endIcon={<Visibility />}
                      onClick={previewColors}
                      disabled={disabled}
                      color="primary"
                      size="small"
                      sx={{ textTransform: 'none' }}
                    >
                      {isMobile ? 'Aperçu' : 'Voir l\'aperçu'}
                    </Button>
                  </Box>
                </Box>

                {/* Conteneur couleurs aligné avec la barre verticale */}
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center',
                  minHeight: isMobile ? 200 : 280,
                  pl: 3, // Alignement avec la barre verticale
                }}>
                  {/* Sélecteur de couleurs aligné à gauche */}
                  <Box sx={{ 
                    display: 'flex', 
                    gap: isMobile ? 3 : 4, 
                    alignItems: 'center', 
                    mb: 2,
                  }}>
                    {/* Couleur primaire */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: isMobile ? 50 : 60,
                          height: isMobile ? 100 : 120,
                          bgcolor: colors.primary,
                          borderRadius: isMobile ? '25px' : '30px',
                          mb: 2,
                        }}
                      />
                      <Box
                        sx={{
                          bgcolor: 'grey.100',
                          border: 'none',
                          borderRadius: 0,
                          px: isMobile ? 1 : 2,
                          py: 0.5,
                          fontSize: isMobile ? '10px' : '12px',
                          fontWeight: 500,
                          color: 'text.secondary',
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          width: 'fit-content',
                        }}
                        onClick={() => !disabled && document.getElementById('primary-color-input')?.click()}
                      >
                        {colors.primary}
                      </Box>
                      <input
                        id="primary-color-input"
                        type="text"
                        value={colors.primary}
                        onChange={(e) => setValue('configuration.colors.primary', e.target.value)}
                        disabled={disabled}
                        style={{ display: 'none' }}
                      />
                    </Box>

                    {/* Couleur secondaire */}
                    <Box sx={{ textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: isMobile ? 50 : 60,
                          height: isMobile ? 100 : 120,
                          bgcolor: colors.secondary,
                          borderRadius: isMobile ? '25px' : '30px',
                          mb: 2,
                        }}
                      />
                      <Box
                        sx={{
                          bgcolor: 'grey.100',
                          border: 'none',
                          borderRadius: 0,
                          px: isMobile ? 1 : 2,
                          py: 0.5,
                          fontSize: isMobile ? '10px' : '12px',
                          fontWeight: 500,
                          color: 'text.secondary',
                          cursor: disabled ? 'not-allowed' : 'pointer',
                          width: 'fit-content',
                        }}
                        onClick={() => !disabled && document.getElementById('secondary-color-input')?.click()}
                      >
                        {colors.secondary}
                      </Box>
                      <input
                        id="secondary-color-input"
                        type="text"
                        value={colors.secondary}
                        onChange={(e) => setValue('configuration.colors.secondary', e.target.value)}
                        disabled={disabled}
                        style={{ display: 'none' }}
                      />
                    </Box>
                  </Box>

                  {/* Message d'aide - aligné à gauche */}
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      fontStyle: 'italic', 
                      mt: 1,
                      fontSize: isMobile ? '0.85rem' : '0.9rem',
                      textAlign: 'left',
                    }}
                  >
                    Personnalisez votre jeu en ajoutant jusqu'à deux couleurs
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Validation des couleurs */}
            {!disabled && (
              <Box>
                {!isValidHexColor(colors.primary) && (
                  <Alert severity="error" sx={{ 
                    mb: 1,
                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                  }}>
                    La couleur primaire doit être au format hexadécimal (ex: #FF0000)
                  </Alert>
                )}
                {!isValidHexColor(colors.secondary) && (
                  <Alert severity="error" sx={{ fontSize: isMobile ? '0.85rem' : '0.9rem' }}>
                    La couleur secondaire doit être au format hexadécimal (ex: #00FF00)
                  </Alert>
                )}
              </Box>
            )}
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
};

export default GameCustomizationSection; 