import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Stack,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useMediaQuery,
  useTheme,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Switch,
  FormControlLabel,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
  Info,
  } from '@mui/icons-material';

// Types pour les gains et conditions personnalisées
interface GiftCondition {
  id: string;
  giftName: string;
  condition: string;
  minAmount?: number;
}

const RetrievalConditionsSection: React.FC = () => {

  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCondition, setEditingCondition] = useState<GiftCondition | null>(null);
  const [selectedGift, setSelectedGift] = useState('');
  const [conditionType, setConditionType] = useState('none');
  const [minAmount, setMinAmount] = useState('');
  
  // Switches pour les conditions générales
  const [forAllWins, setForAllWins] = useState(true);
  const [requiresPurchase, setRequiresPurchase] = useState(false);

  // Gains disponibles
  const availableGifts = [
    { id: '1', name: 'Frite' },
    { id: '2', name: 'Sac Jacquemus' },
    { id: '3', name: 'Café offert' },
    { id: '4', name: 'Dessert gratuit' },
  ];

  // Conditions personnalisées par gain
  const [giftConditions, setGiftConditions] = useState<GiftCondition[]>([
    {
      id: '1',
      giftName: 'Frite',
      condition: 'Aucune',
    },
    {
      id: '2', 
      giftName: 'Sac Jacquemus',
      condition: 'Achat minimum de 10€',
      minAmount: 10,
    },
  ]);

  const openAddModal = (giftName?: string) => {
    if (giftName) {
      setSelectedGift(giftName);
    } else {
      setSelectedGift('');
    }
    setConditionType('none');
    setMinAmount('');
    setEditingCondition(null);
    setIsModalOpen(true);
  };

  const openEditModal = (condition: GiftCondition) => {
    setSelectedGift(condition.giftName);
    setConditionType(condition.condition === 'Aucune' ? 'none' : 'minimum');
    setMinAmount(condition.minAmount?.toString() || '');
    setEditingCondition(condition);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCondition(null);
  };

  const saveCondition = () => {
    const conditionText = conditionType === 'none' ? 'Aucune' : `Achat minimum de ${minAmount}€`;
    
    if (editingCondition) {
      // Modifier condition existante
      const updatedConditions = giftConditions.map(c =>
        c.id === editingCondition.id
          ? {
              ...c,
              condition: conditionText,
              minAmount: conditionType === 'minimum' ? parseFloat(minAmount) : undefined,
            }
          : c
      );
      setGiftConditions(updatedConditions);
    } else {
      // Ajouter nouvelle condition
      const newCondition: GiftCondition = {
        id: Date.now().toString(),
        giftName: selectedGift,
        condition: conditionText,
        minAmount: conditionType === 'minimum' ? parseFloat(minAmount) : undefined,
      };
      setGiftConditions([...giftConditions, newCondition]);
    }
    closeModal();
  };

  const deleteCondition = (id: string) => {
    setGiftConditions(giftConditions.filter(c => c.id !== id));
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
                gutterBottom 
                sx={{ 
                  fontWeight: 600, 
                  color: 'text.primary', 
                  mb: 1,
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                }}
              >
                CONDITIONS DE RÉCUPÉRATION
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: 1.4,
                }}
              >
                Définissez les conditions que vos clients doivent remplir pour récupérer leurs gains. Configurez les montants minimums d'achat et autres exigences.
              </Typography>
            </Box>
          </Box>
          <IconButton sx={{ mt: 0.5 }} size={isMobile ? 'small' : 'medium'}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={isExpanded}>
          <Stack spacing={{
            xs: 2,      // Mobile
            sm: 2.5,    // Tablette
            md: 3,      // Desktop responsive
            lg: 3.5,    // Large
            xl: 4,      // Extra large
          }}>
            
            {/* Container pour les switches */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '40%',
              alignSelf: 'flex-start',
            }}>
              
              {/* Configuration sans condition */}
            <Box sx={{ width: '100%' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={forAllWins}
                    onChange={(e) => setForAllWins(e.target.checked)}
                    size={isMobile ? 'small' : 'medium'}
                  />
                }
                label={
                  <Box>
                    <Typography 
                      sx={{ 
                        fontSize: isMobile ? '0.95rem' : '1rem',
                        fontWeight: 500,
                      }}
                    >
                      Pas de condition
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        fontSize: isMobile ? '0.8rem' : '0.85rem',
                        mt: 0.5,
                        lineHeight: 1.3,
                      }}
                    >
                      Les clients peuvent récupérer leurs gain sans aucun achat.
                    </Typography>
                  </Box>
                }
                labelPlacement="end"
                sx={{ 
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-start',
                  ml: 0,
                  mr: 0,
                  width: '100%',
                  '& .MuiFormControlLabel-label': {
                    ml: 1,
                  },
                }}
              />
            </Box>

            {/* Configuration condition d'achat - au même niveau */}
            <Box sx={{ width: '100%' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={requiresPurchase}
                    onChange={(e) => setRequiresPurchase(e.target.checked)}
                    size={isMobile ? 'small' : 'medium'}
                  />
                }
                label={
                  <Box>
                    <Typography 
                      sx={{ 
                        fontSize: isMobile ? '0.9rem' : '0.95rem',
                        color: 'text.primary',
                      }}
                    >
                      Sous condition d'achat minimal
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        fontSize: isMobile ? '0.8rem' : '0.85rem',
                        mt: 0.5,
                        lineHeight: 1.3,
                      }}
                    >
                      Exigez un montant minimum d'achat en boutique pour permettre la récupération du gain.
                    </Typography>
                  </Box>
                }
                labelPlacement="end"
                sx={{ 
                  flexDirection: 'row-reverse',
                  justifyContent: 'flex-start',
                  ml: 0,
                  mr: 0,
                  width: '100%',
                  '& .MuiFormControlLabel-label': {
                    ml: 1,
                  },
                }}
              />
            </Box>
            
            </Box>

            {/* Titre de la section tableau */}
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 600, 
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: 'text.primary',
                mt: {
                  xs: 2,      // Mobile
                  sm: 2.5,    // Tablette
                  md: 3,      // Desktop
                  lg: 3.5,    // Large
                  xl: 4,      // Extra large
                },
              }}
            >
              Conditions personnalisées par gain
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                fontSize: isMobile ? '0.85rem' : '0.9rem',
                mb: {
                  xs: 1.5,    // Mobile
                  sm: 2,      // Tablette
                  md: 2.5,    // Desktop
                  lg: 2.5,    // Large
                  xl: 3,      // Extra large
                },
              }}
            >
              Vous pouvez définir une condition spécifique sur un ou plusieurs gains.
            </Typography>

            {/* Tableau des conditions avec bordures */}
            <TableContainer 
              sx={{ 
                overflowX: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                '&::-webkit-scrollbar': {
                  height: 6,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: 3,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#555',
                },
              }}
            >
              <Table sx={{ minWidth: isMobile ? 500 : 'auto' }}>
                <TableHead sx={{ bgcolor: 'grey.50' }}>
                  <TableRow>
                    <TableCell sx={{ 
                      fontSize: isMobile ? '0.85rem' : '1rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      py: isMobile ? 1.5 : 2,
                      borderRight: '1px solid',
                      borderRightColor: 'divider',
                    }}>
                      Gain
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: isMobile ? '0.85rem' : '1rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      py: isMobile ? 1.5 : 2,
                      borderRight: '1px solid',
                      borderRightColor: 'divider',
                    }}>
                      Condition
                      <Tooltip 
                        title="Définissez les conditions que vos clients doivent remplir pour récupérer leurs gains."
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: '#000000',
                              color: '#ffffff',
                              fontSize: '0.8rem',
                              maxWidth: 300,
                              padding: '8px 12px',
                              borderRadius: '6px',
                              '& .MuiTooltip-arrow': {
                                color: '#000000',
                              },
                            },
                          },
                        }}
                      >
                        <IconButton 
                          size="small" 
                          sx={{ 
                            ml: 1,
                            color: '#2D5BFF',
                            '&:hover': {
                              bgcolor: 'rgba(45, 91, 255, 0.08)',
                            },
                          }}
                        >
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell 
                      align="center"
                      sx={{ 
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        py: isMobile ? 1.5 : 2,
                      }}
                    >
                      Action
                      <Tooltip 
                        title="Actions disponibles pour gérer et modifier les conditions de récupération des gains."
                        arrow
                        componentsProps={{
                          tooltip: {
                            sx: {
                              bgcolor: '#000000',
                              color: '#ffffff',
                              fontSize: '0.8rem',
                              maxWidth: 300,
                              padding: '8px 12px',
                              borderRadius: '6px',
                              '& .MuiTooltip-arrow': {
                                color: '#000000',
                              },
                            },
                          },
                        }}
                      >
                        <IconButton 
                          size="small" 
                          sx={{ 
                            ml: 1,
                            color: '#2D5BFF',
                            '&:hover': {
                              bgcolor: 'rgba(45, 91, 255, 0.08)',
                            },
                          }}
                        >
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {giftConditions.map((condition) => (
                    <TableRow key={condition.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
                      <TableCell sx={{ 
                        py: isMobile ? 1.5 : 2,
                        borderRight: '1px solid',
                        borderRightColor: 'divider',
                      }}>
                        <Typography 
                          variant="body2"
                          sx={{
                            fontSize: isMobile ? '0.8rem' : '0.9rem',
                            fontWeight: 500,
                          }}
                        >
                          {condition.giftName}
                        </Typography>
                      </TableCell>
                      
                      <TableCell sx={{ 
                        py: isMobile ? 1.5 : 2,
                        borderRight: '1px solid',
                        borderRightColor: 'divider',
                      }}>
                        <Typography 
                          variant="body2"
                          sx={{
                            fontSize: isMobile ? '0.8rem' : '0.9rem',
                            color: condition.condition === 'Aucune' ? 'text.secondary' : 'text.primary',
                          }}
                        >
                          {condition.condition}
                        </Typography>
                      </TableCell>
                      
                      <TableCell align="center" sx={{ py: isMobile ? 1.5 : 2 }}>
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          {condition.condition === 'Aucune' ? (
                            <Button
                              variant="text"
                              startIcon={<Add />}
                              onClick={() => openAddModal(condition.giftName)}
                              color="primary"
                              size="small"
                              sx={{ textTransform: 'none' }}
                            >
                              Ajouter une condition
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="text"
                                startIcon={<Edit />}
                                onClick={() => openEditModal(condition)}
                                color="primary"
                                size="small"
                                sx={{ textTransform: 'none' }}
                              >
                                Modifier
                              </Button>
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => deleteCondition(condition.id)}
                                sx={{
                                  padding: isMobile ? '4px' : '6px',
                                }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {giftConditions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            fontSize: isMobile ? '0.9rem' : '1rem',
                          }}
                        >
                          Aucune condition personnalisée configurée.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Collapse>

        {/* Modal d'ajout/édition de condition */}
        <Dialog 
          open={isModalOpen} 
          onClose={closeModal} 
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
            fontSize: isMobile ? '1.1rem' : '1.25rem',
            pb: isMobile ? 1 : 2,
          }}>
            {editingCondition ? 'Modifier la condition' : 'Ajouter une condition'}
          </DialogTitle>
          <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
            <Stack spacing={isMobile ? 2 : 3} sx={{ mt: 1 }}>
              <TextField
                label="Gain"
                select
                value={selectedGift}
                onChange={(e) => setSelectedGift(e.target.value)}
                fullWidth
                size={isMobile ? 'small' : 'medium'}
                disabled={!!editingCondition}
              >
                {availableGifts.map((gift) => (
                  <MenuItem key={gift.id} value={gift.name}>
                    {gift.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Type de condition"
                select
                value={conditionType}
                onChange={(e) => setConditionType(e.target.value)}
                fullWidth
                size={isMobile ? 'small' : 'medium'}
              >
                <MenuItem value="none">Aucune condition</MenuItem>
                <MenuItem value="minimum">Achat minimum requis</MenuItem>
              </TextField>

              {conditionType === 'minimum' && (
                <TextField
                  label="Montant minimum"
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="Ex: 10"
                  size={isMobile ? 'small' : 'medium'}
                  fullWidth
                  InputProps={{
                    endAdornment: <Typography variant="body2">€</Typography>
                  }}
                />
              )}
            </Stack>
          </DialogContent>
          <DialogActions sx={{ 
            px: isMobile ? 2 : 3,
            pb: isMobile ? 2 : 2,
            gap: 1,
          }}>
            <Button 
              onClick={closeModal} 
              size={isMobile ? 'small' : 'medium'}
              sx={{ textTransform: 'none' }}
            >
              Annuler
            </Button>
            <Button 
              onClick={saveCondition} 
              variant="contained"
              color="primary"
              disabled={!selectedGift || (conditionType === 'minimum' && (!minAmount || parseFloat(minAmount) <= 0))}
              size={isMobile ? 'small' : 'medium'}
              sx={{ textTransform: 'none' }}
            >
              {editingCondition ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Paper>
  );
};

export default RetrievalConditionsSection; 