import React, { useState, useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Paper,
  Typography,
  Box,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Alert,
  IconButton,
} from '@mui/material';
import {
  CloudUpload,
  Visibility,
  Delete,
  Palette,
} from '@mui/icons-material';
import type { Campaign } from '../../doc/CampaignType';

interface GameCustomizationSectionProps {
  disabled?: boolean;
}

const GameCustomizationSection: React.FC<GameCustomizationSectionProps> = ({ disabled }) => {
  const { control, watch, setValue, formState: { errors } } = useFormContext<Campaign>();
  const [dragOver, setDragOver] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('');

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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setValue('configuration.logo_uri', result);
        setLogoPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    console.log('Aperçu des couleurs:', colors);
    alert(`Aperçu avec les couleurs:\nPrimaire: ${colors.primary}\nSecondaire: ${colors.secondary}`);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={3}>
        {}
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
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              PERSONNALISEZ VOTRE JEU
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Importez votre logo et sélectionnez vos couleurs pour créer un jeu à l'image de votre
              marque. Offrez à vos clients une expérience unique, entièrement personnalisée.
            </Typography>
          </Box>
        </Box>

        {/* Alertes pour profil BASIC */}
        {disabled && (
          <Alert severity="info">
            La personnalisation des couleurs est disponible avec le profil PREMIUM.
          </Alert>
        )}

        {/* Deux colonnes principales */}
        <Box sx={{ display: 'flex', gap: 3 }}>
          {/* Colonne gauche - Logo */}
          <Box sx={{ flex: 1 }}>
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
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
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
                 minHeight: 280,
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
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                {logoUri || logoPreview ? (
                  <Box sx={{ position: 'relative' }}>
                    <img
                      src={logoUri || logoPreview}
                      alt="Logo"
                      style={{
                        maxWidth: '150px',
                        maxHeight: '150px',
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
                          width: 32,
                          height: 32,
                        }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                ) : (
                  <Stack spacing={2} alignItems="center">
                    <CloudUpload sx={{ fontSize: 48, color: 'grey.400' }} />
                    <Typography variant="body2" color="text.secondary">
                      Glissez votre logo ici ou
                    </Typography>
                    <Button
                      variant="contained"
                      component="label"
                      disabled={disabled}
                      startIcon={<CloudUpload />}
                    >
                      SÉLECTIONNER UN FICHIER
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

          {/* Colonne droite - Couleurs */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 4,
                  bgcolor: 'primary.main',
                  flexShrink: 0,
                  minHeight: '100%'
                }}
              />
                                            <Box sx={{ flex: 1, py: 0.5, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                 <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                   Vos couleurs
                 </Typography>
                 <Button
                   variant="outlined"
                   startIcon={<Visibility />}
                   onClick={previewColors}
                   disabled={disabled}
                   size="small"
                 >
                   Voir l'aperçu
                 </Button>
               </Box>
            </Box>

                                       {/* Sélecteur de couleurs */}
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Couleurs visuelles */}
              <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                {/* Couleur primaire */}
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 120,
                      bgcolor: colors.primary,
                      borderRadius: '30px',
                      mb: 2,
                      mx: 'auto',
                    }}
                  />
                  <Box
                    sx={{
                      bgcolor: 'grey.100',
                      border: 'none',
                      borderRadius: 0,
                      px: 2,
                      py: 0.5,
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'text.secondary',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      width: 'fit-content',
                      mx: 'auto',
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
                      width: 60,
                      height: 120,
                      bgcolor: colors.secondary,
                      borderRadius: '30px',
                      mb: 2,
                      mx: 'auto',
                    }}
                  />
                  <Box
                    sx={{
                      bgcolor: 'grey.100',
                      border: 'none',
                      borderRadius: 0,
                      px: 2,
                      py: 0.5,
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'text.secondary',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      width: 'fit-content',
                      mx: 'auto',
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

              {/* Message d'aide - repositionné plus près */}
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic', mt: 1 }}>
                Personnalisez votre jeu en ajoutant jusqu'à deux couleurs
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Validation des couleurs */}
        {!disabled && (
          <Box>
            {!isValidHexColor(colors.primary) && (
              <Alert severity="error" sx={{ mb: 1 }}>
                La couleur primaire doit être au format hexadécimal (ex: #FF0000)
              </Alert>
            )}
            {!isValidHexColor(colors.secondary) && (
              <Alert severity="error">
                La couleur secondaire doit être au format hexadécimal (ex: #00FF00)
              </Alert>
            )}
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default GameCustomizationSection; 