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
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Delete,
  Edit,
  ExpandLess,
  ExpandMore,
  Info,
  ConfirmationNumber,
} from '@mui/icons-material';
import { useRewards } from '../hooks';
import type { RewardGift } from '../types/campaign';

const RewardsSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<RewardGift | null>(null);
  const [giftName, setGiftName] = useState('');
  const [giftCategory, setGiftCategory] = useState('');
  const [giftStock, setGiftStock] = useState('');

  const {
    gifts,
    availableCategories,
    getCategoryColor,
    getStockColor,
    addGift,
    updateGift,
    deleteGift,
    validateGift
  } = useRewards();

  const openAddModal = () => {
    setGiftName('');
    setGiftCategory('');
    setGiftStock('');
    setEditingGift(null);
    setIsModalOpen(true);
  };

  const openEditModal = (gift: RewardGift) => {
    setGiftName(gift.name);
    setGiftCategory(gift.category);
    setGiftStock(gift.stock.toString());
    setEditingGift(gift);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGift(null);
  };

  const saveGift = () => {
    const validation = validateGift(giftName, giftCategory, giftStock);
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    const giftData = {
      name: giftName,
      category: giftCategory,
      stock: parseInt(giftStock),
    };

    if (editingGift) {
      updateGift(editingGift.id, giftData);
    } else {
      addGift(giftData);
    }
    closeModal();
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
                AJOUTER ET CONFIGUREZ VOS GAINS
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: 1.4,
                }}
              >
                Indiquez les récompenses que vos clients pourront gagner. Offrez des cadeaux attractifs pour augmenter leur engagement et leurs fidélités.
              </Typography>
            </Box>
          </Box>
          <IconButton sx={{ mt: 0.5 }} size={isMobile ? 'small' : 'medium'}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={isExpanded}>
          <Stack spacing={isMobile ? 2 : 3}>
            
            {/* Bouton d'ajout */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button
                variant="contained"
                endIcon={<ConfirmationNumber />}
                size={isMobile ? 'small' : 'medium'}
                sx={{ 
                  textTransform: 'none',
                  bgcolor: 'orange',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#e65100',
                  },
                }}
              >
                Lancer le tirage au sort
                
              </Button>
              <Button
                variant="contained"
                endIcon={<Add />}
                onClick={openAddModal}
                color="primary"
                size={isMobile ? 'small' : 'medium'}
                sx={{ textTransform: 'none' }}
              >
                Ajouter un gain
              </Button>
            </Box>



            {/* Tableau des gains avec bordures */}
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
              <Table sx={{ minWidth: isMobile ? 600 : 'auto' }}>
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
                      Nom du gain
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: isMobile ? '0.85rem' : '1rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      py: isMobile ? 1.5 : 2,
                      borderRight: '1px solid',
                      borderRightColor: 'divider',
                    }}>
                      Catégorie
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: isMobile ? '0.85rem' : '1rem',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      py: isMobile ? 1.5 : 2,
                      borderRight: '1px solid',
                      borderRightColor: 'divider',
                    }}>
                      Nombre du stock
                      <Tooltip 
                        title="Diversifiez vos gains pour maintenir l'engagement. Surveillez régulièrement vos stocks."
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
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gifts.map((gift) => (
                    <TableRow key={gift.id} sx={{ '&:hover': { bgcolor: 'action.hover' } }}>
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
                          {gift.name}
                        </Typography>
                      </TableCell>
                      
                      <TableCell sx={{ 
                        py: isMobile ? 1.5 : 2,
                        borderRight: '1px solid',
                        borderRightColor: 'divider',
                      }}>
                        <Chip
                          label={gift.category}
                          color={getCategoryColor(gift.category) as 'success' | 'primary' | 'info' | 'warning' | 'secondary' | 'default'}
                          variant="filled"
                          size={isMobile ? 'small' : 'medium'}
                          sx={{
                            fontSize: isMobile ? '0.7rem' : '0.8rem',
                            height: isMobile ? 24 : 32,
                            border: 'none !important',
                            outline: 'none !important',
                          }}
                        />
                      </TableCell>
                      
                      <TableCell sx={{ 
                        py: isMobile ? 1.5 : 2,
                        borderRight: '1px solid',
                        borderRightColor: 'divider',
                      }}>
                        <Chip
                          label={`${gift.stock} unités`}
                          color={getStockColor(gift.stock) as 'success' | 'warning' | 'error'}
                          variant="filled"
                          size={isMobile ? 'small' : 'medium'}
                          sx={{
                            fontSize: isMobile ? '0.7rem' : '0.8rem',
                            height: isMobile ? 24 : 32,
                            fontWeight: 600,
                            border: 'none !important',
                            outline: 'none !important',
                          }}
                        />
                      </TableCell>
                      
                      <TableCell align="center" sx={{ py: isMobile ? 1.5 : 2 }}>
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                                                      <Button
                              variant="text"
                              startIcon={<Edit />}
                              onClick={() => openEditModal(gift)}
                              color="primary"
                              size="small"
                              sx={{ textTransform: 'none' }}
                            >
                              Modifier
                            </Button>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => deleteGift(gift.id)}
                            sx={{
                              padding: isMobile ? '4px' : '6px',
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                  
                  {gifts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{
                            fontSize: isMobile ? '0.9rem' : '1rem',
                          }}
                        >
                          Aucun gain configuré. Ajoutez votre premier gain pour commencer.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Collapse>

        {/* Modal d'ajout/édition de gain */}
        <Dialog 
          open={isModalOpen} 
          onClose={closeModal} 
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
            {editingGift ? 'Modifier le gain' : 'Ajouter un gain'}
          </DialogTitle>
          <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
            <Stack spacing={isMobile ? 2 : 3} sx={{ mt: 1 }}>
              <TextField
                label="Nom du gain"
                value={giftName}
                onChange={(e) => setGiftName(e.target.value)}
                fullWidth
                size={isMobile ? 'small' : 'medium'}
                placeholder="Ex: Frite gratuite"
              />

              <TextField
                label="Catégorie"
                select
                value={giftCategory}
                onChange={(e) => setGiftCategory(e.target.value)}
                fullWidth
                size={isMobile ? 'small' : 'medium'}
              >
                {availableCategories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Nombre en stock"
                type="number"
                value={giftStock}
                onChange={(e) => setGiftStock(e.target.value)}
                placeholder="Ex: 50"
                size={isMobile ? 'small' : 'medium'}
                fullWidth
                InputProps={{
                  endAdornment: <Typography variant="body2">unités</Typography>
                }}
              />
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
              onClick={saveGift} 
              variant="contained"
              color="primary"
              disabled={!giftName || !giftCategory || !giftStock || parseInt(giftStock) < 0}
              size={isMobile ? 'small' : 'medium'}
              sx={{ textTransform: 'none' }}
            >
              {editingGift ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Paper>
  );
};

export default RewardsSection; 