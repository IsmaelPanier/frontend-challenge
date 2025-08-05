import React, { useState, useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
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
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Alert,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Restaurant,
  LocalBar,
  Percent,
  Close,
  Casino,

  EmojiEvents,
  Warning,
  Info,

} from '@mui/icons-material';
import type { Campaign, Gift, GiftType } from '../../doc/CampaignType';



const giftTypeConfig = {
  EAT: {
    label: 'Nourriture',
    icon: <Restaurant />,
    color: '#4caf50',
  },
  DRINK: {
    label: 'Boisson',
    icon: <LocalBar />,
    color: '#2196f3',
  },
  DISCOUNT: {
    label: 'Réduction',
    icon: <Percent />,
    color: '#ff9800',
  },
  LOSS: {
    label: 'Perte',
    icon: <Close />,
    color: '#f44336',
  },
};

const RewardsSection: React.FC = () => {
  const { control, watch, setValue } = useFormContext<Campaign>();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'configuration.gifts',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [isHundredPercentWinning, setIsHundredPercentWinning] = useState(false);

  const gifts = watch('configuration.gifts') || [];

  // Vérifier s'il y a au moins un gain illimité pour le mode "100% Gagnant"
  const hasUnlimitedGift = gifts.some(gift => gift.initial_limit === -1 && gift.type !== 'LOSS');
  const hasLossGift = gifts.some(gift => gift.type === 'LOSS');

  useEffect(() => {
    if (isHundredPercentWinning) {
      // Si 100% gagnant, retirer les pertes
      const newGifts = gifts.filter(gift => gift.type !== 'LOSS');
      setValue('configuration.gifts', newGifts);
      
      // S'assurer qu'au moins un gain est illimité
      if (!hasUnlimitedGift) {
        const firstGift = newGifts[0];
        if (firstGift) {
          const updatedGift = { ...firstGift, initial_limit: -1, limit: -1 };
          const updatedGifts = [updatedGift, ...newGifts.slice(1)];
          setValue('configuration.gifts', updatedGifts);
        }
      }
    } else {
      // Si pas 100% gagnant, ajouter une perte si elle n'existe pas
      if (!hasLossGift) {
        const lossGift: Gift = {
          id: Date.now().toString(),
          icon: '', // L'icône sera déterminée par le type
          initial_limit: -1,
          limit: -1,
          name: 'Perdu ! Tentez votre chance une prochaine fois',
          type: 'LOSS',
        };
        append(lossGift);
      }
    }
  }, [isHundredPercentWinning, gifts, hasUnlimitedGift, hasLossGift, setValue, append]);

  const openAddModal = () => {
    setEditingGift(null);
    setIsModalOpen(true);
  };

  const openEditModal = (gift: Gift, index: number) => {
    setEditingGift({ ...gift, index } as Gift & { index: number });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingGift(null);
  };

  const saveGift = (giftData: Partial<Gift>) => {
    if (editingGift && 'index' in editingGift) {
      // Modifier un gain existant
      const index = (editingGift as any).index;
      update(index, { ...editingGift, ...giftData });
    } else {
      // Ajouter un nouveau gain
      const newGift: Gift = {
        id: Date.now().toString(),
        icon: '', // L'icône sera déterminée par le type lors de l'affichage
        initial_limit: giftData.initial_limit || 1,
        limit: giftData.limit || giftData.initial_limit || 1,
        name: giftData.name || '',
        type: giftData.type || 'EAT',
      };
      append(newGift);
    }
    closeModal();
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* En-tête */}
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
              AJOUTEZ ET CONFIGUREZ VOS GAINS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Définissez les récompenses que vos clients pourront gagner. Offrez des cadeaux attractifs pour augmenter l'engagement et fidéliser votre clientèle.
            </Typography>
          </Box>
        </Box>

        {/* Switch 100% Gagnant */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={isHundredPercentWinning}
                onChange={(e) => setIsHundredPercentWinning(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmojiEvents sx={{ color: 'primary.main' }} />
                Jeu 100% Gagnant
              </Box>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Tous les joueurs gagnent quelque chose
                </Typography>
              </Box>
            }
          />
          <Chip 
            icon={<Casino />}
            label={isHundredPercentWinning ? 'Activé' : 'Désactivé'} 
            color={isHundredPercentWinning ? 'success' : 'default'}
            variant="outlined"
          />
        </Box>

        {/* Alertes */}
        {isHundredPercentWinning && !hasUnlimitedGift && (
          <Alert severity="warning" icon={<Warning />}>
            Pour un jeu 100% gagnant, au moins une récompense doit être en quantité illimitée.
          </Alert>
        )}

        {!isHundredPercentWinning && !hasLossGift && (
          <Alert severity="info" icon={<Info />}>
            Une option "Perte" sera automatiquement ajoutée pour les jeux non-gagnants.
          </Alert>
        )}

        {/* Bouton d'ajout */}
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={openAddModal}
            sx={{ mb: 2 }}
          >
            Ajouter une récompense
          </Button>
        </Box>

        {/* Tableau des gains */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Récompense</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="center">Quantité initiale</TableCell>
                <TableCell align="center">Quantité restante</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field, index) => {
                const gift = gifts[index];
                const config = giftTypeConfig[gift.type];
                
                return (
                  <TableRow key={field.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          width: 32,
                          height: 32,
                          borderRadius: 0,
                          bgcolor: `${giftTypeConfig[gift.type].color}15`,
                          border: 'none'
                        }}>
                          {React.cloneElement(giftTypeConfig[gift.type].icon, {
                            sx: { 
                              fontSize: '1.2rem',
                              color: giftTypeConfig[gift.type].color 
                            }
                          })}
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {gift.name}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    
                    <TableCell>
                      <Chip
                        icon={config.icon}
                        label={config.label}
                        size="small"
                        sx={{
                          bgcolor: `${config.color}15`,
                          color: config.color,
                          border: 'none',
                        }}
                      />
                    </TableCell>
                    
                    <TableCell align="center">
                      <Typography variant="body2">
                        {gift.initial_limit === -1 ? '∞' : gift.initial_limit}
                      </Typography>
                    </TableCell>
                    
                    <TableCell align="center">
                      <Typography 
                        variant="body2"
                        color={gift.limit === 0 ? 'error' : 'text.primary'}
                      >
                        {gift.limit === -1 ? '∞' : gift.limit}
                      </Typography>
                    </TableCell>
                    
                    <TableCell align="center">
                      <Stack direction="row" spacing={0.5} justifyContent="center">
                        <IconButton 
                          size="small" 
                          onClick={() => openEditModal(gift, index)}
                          title="Modifier"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => remove(index)}
                          title="Supprimer"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {fields.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      Aucune récompense configurée. Ajoutez votre première récompense ci-dessus.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      {/* Modal d'ajout/édition */}
      <GiftModal
        open={isModalOpen}
        onClose={closeModal}
        onSave={saveGift}
        gift={editingGift}
        isHundredPercentWinning={isHundredPercentWinning}
      />
    </Paper>
  );
};

interface GiftModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (gift: Partial<Gift>) => void;
  gift: Gift | null;
  isHundredPercentWinning: boolean;
}

const GiftModal: React.FC<GiftModalProps> = ({ open, onClose, onSave, gift, isHundredPercentWinning }) => {
  const [formData, setFormData] = useState<Partial<Gift>>({
    name: '',
    type: 'EAT',
    icon: '', // L'icône sera automatiquement définie selon le type
    initial_limit: 1,
    limit: 1,
  });

  useEffect(() => {
    if (gift) {
      setFormData(gift);
    } else {
      setFormData({
        name: '',
        type: 'EAT',
        icon: '', // L'icône sera automatiquement définie selon le type
        initial_limit: 1,
        limit: 1,
      });
    }
  }, [gift]);

  const handleSave = () => {
    onSave(formData);
  };

  const handleLimitChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      initial_limit: value,
      limit: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {gift ? 'Modifier la récompense' : 'Ajouter une récompense'}
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label="Nom de la récompense"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            fullWidth
            placeholder="Ex: Café offert, 10% de réduction..."
          />

          <TextField
            label="Type de récompense"
            select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as GiftType }))}
            fullWidth
          >
            {Object.entries(giftTypeConfig).map(([type, config]) => (
              <MenuItem key={type} value={type} disabled={type === 'LOSS' && isHundredPercentWinning}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {config.icon}
                  {config.label}
                </Box>
              </MenuItem>
            ))}
          </TextField>



          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Quantité disponible
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                type="number"
                value={formData.initial_limit === -1 ? '' : formData.initial_limit}
                onChange={(e) => {
                  const value = e.target.value === '' ? -1 : parseInt(e.target.value);
                  handleLimitChange(value);
                }}
                placeholder="Nombre"
                size="small"
                disabled={formData.initial_limit === -1}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.initial_limit === -1}
                    onChange={(e) => handleLimitChange(e.target.checked ? -1 : 1)}
                  />
                }
                label="Illimité"
              />
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button onClick={handleSave} variant="contained" disabled={!formData.name}>
          {gift ? 'Modifier' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RewardsSection; 