import React, { useState, useEffect } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Paper,
  Typography,
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Switch,
  TextField,
  Collapse,
  IconButton,
  Chip,
  Button,
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Add,
  ShoppingCart,
  Person,
  Delete,
  Lightbulb,
  GpsFixed,
} from '@mui/icons-material';
import type { Campaign, Conditions } from '../../doc/CampaignType';

const RetrievalConditionsSection: React.FC = () => {
  const { control, watch, setValue } = useFormContext<Campaign>();
  const { append, remove } = useFieldArray({
    control,
    name: 'configuration.retrievalConditions',
  });

  const [isExpanded, setIsExpanded] = useState(true);
  const [allGifts, setAllGifts] = useState(false);
  const [hasMinimumPurchase, setHasMinimumPurchase] = useState(false);
  const [minimumAmount, setMinimumAmount] = useState<number>(10);
  const [isModified, setIsModified] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');

  // Charger les données depuis localStorage au démarrage
  React.useEffect(() => {
    const savedCampaign = localStorage.getItem('campaign');
    if (savedCampaign) {
      try {
        const parsedCampaign = JSON.parse(savedCampaign);
        setValue('configuration.gifts', parsedCampaign.configuration.gifts);
        setValue('configuration.retrievalConditions', parsedCampaign.configuration.retrievalConditions);
        setLastSaved(new Date(parsedCampaign.updated_at).toLocaleString());
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      }
    }
  }, [setValue]);

  // Détecter les modifications
  React.useEffect(() => {
    const subscription = watch(() => {
      setIsModified(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const gifts = watch('configuration.gifts') || [];
  const conditions = watch('configuration.retrievalConditions') || [];

  // Synchroniser les conditions avec les gains
  useEffect(() => {
    const currentConditions = conditions;
    const giftIds = gifts.map((gift: any) => gift.id);
    
    // Supprimer les conditions pour les gains qui n'existent plus
    const validConditions = currentConditions.filter((condition: any) => 
      giftIds.includes(condition.id) || condition.id === 'global'
    );
    
    // Ajouter des conditions pour les nouveaux gains
    const newConditions = [...validConditions];
    
    gifts.forEach((gift: any) => {
      if (!newConditions.find((c: any) => c.id === gift.id)) {
        newConditions.push({
          id: gift.id,
          name: gift.name,
          value: 'Aucune condition spécifique',
        });
      }
    });

    // Mettre à jour uniquement si les conditions ont changé
    if (JSON.stringify(newConditions) !== JSON.stringify(currentConditions)) {
      setValue('configuration.retrievalConditions', newConditions);
    }
  }, [gifts, conditions, setValue]);

  // Gérer l'interrupteur "Pour tous les gains"
  useEffect(() => {
    if (allGifts) {
      // Créer ou mettre à jour la condition globale
      const globalCondition = conditions.find((c: any) => c.id === 'global');
      if (!globalCondition) {
        const newGlobalCondition: Conditions = {
          id: 'global',
          name: 'Condition pour tous les gains',
          value: hasMinimumPurchase ? `Achat minimum de ${minimumAmount}€` : 'Aucune condition',
        };
        setValue('configuration.retrievalConditions', [...conditions, newGlobalCondition]);
      }
    } else {
      // Supprimer la condition globale
      const updatedConditions = conditions.filter((c: any) => c.id !== 'global');
      setValue('configuration.retrievalConditions', updatedConditions);
    }
  }, [allGifts, hasMinimumPurchase, minimumAmount, conditions, setValue]);

  // Mettre à jour la condition globale quand le montant change
  useEffect(() => {
    if (allGifts) {
      const globalCondition = conditions.find((c: any) => c.id === 'global');
      if (globalCondition) {
        const updatedCondition = {
          ...globalCondition,
          value: hasMinimumPurchase ? `Achat minimum de ${minimumAmount}€` : 'Aucune condition',
        };
        const updatedConditions = conditions.map((c: any) => 
          c.id === 'global' ? updatedCondition : c
        );
        setValue('configuration.retrievalConditions', updatedConditions);
      }
    }
  }, [hasMinimumPurchase, minimumAmount]);

  const updateConditionValue = (conditionId: string, value: string) => {
    const updatedConditions = conditions.map((condition: any) => 
      condition.id === conditionId ? { ...condition, value } : condition
    );
    setValue('configuration.retrievalConditions', updatedConditions);
  };

  const addCustomCondition = () => {
    const newCondition: Conditions = {
      id: `custom_${Date.now()}`,
      name: 'Condition personnalisée',
      value: '',
    };
    append(newCondition);
  };

  const onSubmit = (data: Campaign) => {
    try {
      const updatedData = {
        ...data,
        updated_at: new Date().toISOString(),
        updated_by: 'user@example.com',
      };
      
      localStorage.setItem('campaign', JSON.stringify(updatedData));
      setIsModified(false);
      setLastSaved(new Date().toLocaleString());
      
      // Feedback visuel amélioré
      alert(`✅ Campagne "${data.label}" sauvegardée avec succès !`);
      console.log('✅ Données sauvegardées:', updatedData);
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error);
      alert('❌ Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* En-tête avec bouton d'expansion */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            cursor: 'pointer',
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
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                DÉFINISSEZ LES CONDITIONS POUR RÉCUPÉRER LES CADEAUX
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Paramétrez les critères d'achat et les conditions récupération pour renforcer l'impact de votre campagne avec vos cadeaux.
              </Typography>
            </Box>
          </Box>
          <IconButton sx={{ mt: 0.5 }}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        {lastSaved && (
          <Box sx={{ p: 1, bgcolor: 'success.50', textAlign: 'center' }}>
            <Typography variant="caption" color="success.dark">
              Dernière sauvegarde : {lastSaved}
              {isModified && ' (modifications non sauvegardées)'}
            </Typography>
          </Box>
        )}

        <Collapse in={isExpanded}>
          <Stack spacing={3}>
            {/* Conditions personnalisées par gain */}
            <Box>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <GpsFixed sx={{ fontSize: '1rem', color: 'primary.main' }} />
                Conditions par gain
              </Box>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Vous pouvez définir des conditions spécifiques de récupération pour chaque gain gagné.
              </Typography>
              
              {/* Switch pour tous les gains */}
              <Box sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={allGifts}
                      onChange={(e: any) => setAllGifts(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        Pour tous les gains
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Appliquer la même condition à tous les gains
                      </Typography>
                    </Box>
                  }
                />

                {/* Condition d'achat minimal */}
                <Collapse in={allGifts}>
                  <Box sx={{ mt: 2, ml: 4 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={hasMinimumPurchase}
                          onChange={(e: any) => setHasMinimumPurchase(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ShoppingCart fontSize="small" />
                          <Typography variant="body2">
                            Sous condition d'achat minimal
                          </Typography>
                        </Box>
                      }
                    />
                    
                    <Collapse in={hasMinimumPurchase}>
                      <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <TextField
                            type="number"
                            value={minimumAmount}
                            onChange={(e: any) => setMinimumAmount(Number(e.target.value))}
                            size="small"
                            sx={{ width: 120 }}
                            inputProps={{ min: 0, step: 0.5 }}
                          />
                          <Typography variant="body2">€ minimum d'achat</Typography>
                        </Box>
                        <Box sx={{ mt: 1.5 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            Montant à atteindre
                          </Typography>
                          <Typography variant="caption" color="text.disabled" sx={{ fontStyle: 'italic' }}>
                            Ex : 10€ d'achat minimum pour récupérer le gain
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  </Box>
                </Collapse>
              </Box>
            </Box>

            {/* Tableau des conditions */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Conditions personnalisées par gain
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<Add />}
                  onClick={addCustomCondition}
                >
                  Ajouter condition
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Gain</TableCell>
                      <TableCell>Condition</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {conditions.map((condition: any, index: number) => {
                      const relatedGift = gifts.find((gift: any) => gift.id === condition.id);
                      const isGlobalCondition = condition.id === 'global';
                      const isCustomCondition = condition.id.startsWith('custom_');
                      
                      return (
                        <TableRow key={condition.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              {isGlobalCondition ? (
                                <>
                                  <Typography sx={{ fontSize: '1.2rem' }}>🌟</Typography>
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                      Tous les gains
                                    </Typography>
                                    <Chip 
                                      label="Global" 
                                      size="small" 
                                      color="primary" 
                                      variant="outlined"
                                    />
                                  </Box>
                                </>
                              ) : isCustomCondition ? (
                                <>
                                  <Person color="action" />
                                  <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                      {condition.name}
                                    </Typography>
                                    <Chip 
                                      label="Personnalisée" 
                                      size="small" 
                                      color="secondary" 
                                      variant="outlined"
                                    />
                                  </Box>
                                </>
                              ) : relatedGift ? (
                                <>
                                  <Typography sx={{ fontSize: '1.2rem' }}>
                                    {relatedGift.icon}
                                  </Typography>
                                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {relatedGift.name}
                                  </Typography>
                                </>
                              ) : (
                                <Typography variant="body2" color="text.secondary">
                                  Gain supprimé
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          
                          <TableCell>
                            <TextField
                              value={condition.value}
                              onChange={(e: any) => updateConditionValue(condition.id, e.target.value)}
                              size="small"
                              fullWidth
                              placeholder="Ex: Présenter la carte de fidélité..."
                              disabled={isGlobalCondition}
                            />
                          </TableCell>
                          
                          <TableCell>
                            {(isCustomCondition || (!relatedGift && !isGlobalCondition)) && (
                              <IconButton 
                                size="small" 
                                color="error"
                                onClick={() => remove(index)}
                                title="Supprimer"
                              >
                                <Delete />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    
                    {conditions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                          <Typography variant="body2" color="text.secondary">
                            Aucune condition configurée. Les conditions seront créées automatiquement en fonction de vos gains.
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* Information */}
                          <Box sx={{ p: 2, bgcolor: 'info.50', borderRadius: 0, border: 'none' }}>
              <Typography variant="body2" color="info.dark">
                                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Lightbulb sx={{ fontSize: '1rem', color: 'info.main', mt: 0.25 }} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Conseil :</strong> Définissez des conditions claires et attrayantes pour encourager
                    </Typography>
                  </Box> 
                vos clients à revenir et à faire des achats supplémentaires. Les conditions peuvent inclure 
                un montant d'achat minimum, la présentation d'une carte de fidélité, ou toute autre exigence 
                spécifique à votre établissement.
              </Typography>
            </Box>
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
};

export default RetrievalConditionsSection; 