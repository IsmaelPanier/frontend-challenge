import React, { useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Paper,
  Typography,
  Box,
  Stack,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  Button,
  useMediaQuery,
  useTheme,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

  Card,
  CardContent,
} from '@mui/material';
import {
  DragIndicator,
  Delete,
  Edit,

  Google,
  Instagram,
  Facebook,
  VideoLibrary,
  Warning,
  CheckCircle,
  ExpandMore,
  ExpandLess,
  ControlPoint,
} from '@mui/icons-material';
import type { Action, ActionType, Campaign } from '../types/campaign';
import { EditActionModal } from './modals';

const actionTypeConfig = {
  GOOGLE_REVIEW: {
    label: 'Avis Google',
    icon: <Google />,
    color: '#34a853' as const,
  },
  INSTAGRAM: {
    label: 'Instagram',
    icon: <Instagram />,
    color: '#e4405f' as const,
  },
  FACEBOOK: {
    label: 'Facebook', 
    icon: <Facebook />,
    color: '#1877f2' as const,
  },
  TIKTOK: {
    label: 'TikTok',
    icon: <VideoLibrary />,
    color: '#000000' as const,
  },
};

const ActionsSection: React.FC = () => {
  const { control, watch } = useFormContext<Campaign>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'configuration.actions',
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [selectedActionIndex, setSelectedActionIndex] = useState<number | null>(null);
  const actions = watch('configuration.actions') || [];

  // Vérifier les actions en double
  const duplicateActions = actions.filter((action, index) => 
    actions.findIndex(a => a.type === action.type) !== index
  );

  const handleDragStart = (index: number) => {
    if (!isMobile) {
      setDraggedIndex(index);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (!isMobile) {
      e.preventDefault();
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    if (!isMobile) {
      e.preventDefault();
      if (draggedIndex !== null && draggedIndex !== dropIndex) {
        move(draggedIndex, dropIndex);
      }
      setDraggedIndex(null);
    }
  };

  const openActionModal = () => {
    setIsActionModalOpen(true);
  };

  const closeActionModal = () => {
    setIsActionModalOpen(false);
  };

  const openEditModal = (action: Action, index: number) => {
    setSelectedAction(action);
    setSelectedActionIndex(index);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAction(null);
    setSelectedActionIndex(null);
  };

  const handleEditAction = (updatedAction: Action) => {
    if (selectedActionIndex !== null) {
      // Mettre à jour l'action dans le tableau
      const updatedActions = [...actions];
      updatedActions[selectedActionIndex] = {
        ...updatedAction,
        priority: selectedActionIndex + 1, // Maintenir la priorité
      };
      
      // Mettre à jour le formulaire en remplaçant l'action spécifique
      const newFields = updatedActions.map((action, index) => ({
        id: action.id,
        priority: index + 1,
        target: action.target,
        type: action.type,
      }));
      
      // Remplacer toutes les actions
      remove(); // Supprimer toutes les actions
      newFields.forEach(action => append(action)); // Ajouter les actions mises à jour
    }
  };

  const addAction = (type: ActionType) => {
    const newAction: Action = {
      id: Date.now().toString(),
      priority: actions.length + 1,
      target: type === 'GOOGLE_REVIEW' ? 'https://google.com/maps' : '@etablissement',
      type,
    };
    append(newAction);
    closeActionModal();
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
                ORGANISEZ VOS ACTIONS
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  lineHeight: 1.4,
                }}
              >
                Définissez l'ordre et les actions à réaliser par vos clients pour maintenir l'engagement.
              </Typography>
            </Box>
          </Box>
          <IconButton sx={{ mt: 0.5 }} size={isMobile ? 'small' : 'medium'}>
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={isExpanded}>
          <Stack spacing={isMobile ? 2 : 3}>
            {/* Alertes pour actions en double */}
            {duplicateActions.length > 0 && (
              <Alert severity="warning" icon={<Warning />} sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                Attention : vous avez des actions en double. Cela peut créer une confusion pour vos clients.
              </Alert>
            )}

            {/* Boutons d'ajout d'actions */}
            <Box>
              <Button
                variant="contained"
                startIcon={<ControlPoint />}
                onClick={openActionModal}
                color="primary"
                sx={{ textTransform: 'none' }}
              >
                Ajouter une action
              </Button>
            </Box>

            {/* Tableau des actions */}
            <TableContainer 
              sx={{ 
                overflowX: 'auto',
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
                <TableHead>
                  <TableRow>
                    <TableCell 
                      width="50"
                      sx={{ 
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Ordre
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Action
                    </TableCell>
                    <TableCell 
                      sx={{ 
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Cible
                    </TableCell>
                    <TableCell 
                      width="100"
                      sx={{ 
                        fontSize: isMobile ? '0.85rem' : '1rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields.map((field, index) => {
                    const action = actions[index];
                    const config = actionTypeConfig[action.type];
                    
                    return (
                      <TableRow
                        key={field.id}
                        draggable={!isMobile}
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        sx={{
                          cursor: isMobile ? 'default' : 'grab',
                          '&:active': { cursor: isMobile ? 'default' : 'grabbing' },
                          opacity: draggedIndex === index ? 0.5 : 1,
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {!isMobile && <DragIndicator color="action" />}
                            <Typography 
                              variant="body2"
                              sx={{ fontSize: isMobile ? '0.8rem' : '0.9rem' }}
                            >
                              {index + 1}
                            </Typography>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Chip
                            icon={config.icon}
                            label={config.label}
                            variant="filled"
                            size="small"
                            sx={{
                              bgcolor: config.color,
                              color: '#ffffff',
                              border: 'none !important',
                              outline: 'none !important',
                              fontSize: isMobile ? '0.7rem' : '0.8rem',
                              height: isMobile ? 24 : 28,
                              fontWeight: 600,
                              '& .MuiChip-icon': {
                                fontSize: isMobile ? '0.9rem' : '1rem',
                                color: '#ffffff',
                              },
                            }}
                          />
                        </TableCell>
                        
                        <TableCell sx={{ maxWidth: isMobile ? 120 : 200 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{
                              fontSize: isMobile ? '0.8rem' : '0.9rem',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {action.target}
                          </Typography>
                          {action.type === 'GOOGLE_REVIEW' && (
                            <Chip 
                              label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CheckCircle sx={{ fontSize: isMobile ? '0.7rem' : '0.875rem' }} />
                          vérifié
                        </Box>
                      } 
                              size="small" 
                              color="success" 
                              variant="outlined"
                              sx={{ 
                                ml: 1,
                                fontSize: isMobile ? '0.6rem' : '0.7rem',
                                height: isMobile ? 18 : 22,
                              }}
                            />
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <Stack direction="row" spacing={0.5} justifyContent="center">
                            <Button
                              variant="text"
                              startIcon={<Edit />}
                              color="primary"
                              size="small"
                              onClick={() => openEditModal(action, index)}
                              sx={{ textTransform: 'none' }}
                            >
                              Modifier
                            </Button>
                            <IconButton 
                              size="small" 
                              onClick={() => remove(index)}
                              color="error"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  
                  {/* Ligne d'ajout d'action */}
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 2, borderTop: fields.length > 0 ? '1px dashed #e0e0e0' : 'none' }}>
                      <Button
                        variant="text"
                        startIcon={<ControlPoint />}
                        onClick={openActionModal}
                        color="primary"
                        sx={{ textTransform: 'none' }}
                      >
                        {fields.length === 0 ? 'Ajouter votre première action' : 'Ajouter une action'}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Avertissement avec barre verticale orange */}
            <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2, mt: isMobile ? 2 : 3 }}>
              <Box
                sx={{
                  width: 4,
                  bgcolor: '#ff9800',
                  flexShrink: 0,
                  minHeight: '100%'
                }}
              />
              <Box sx={{ 
                flex: 1, 
                py: 1, 
                px: isMobile ? 1.5 : 2, 
                bgcolor: '#fff8e1', 
                borderRadius: 1 
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontStyle: 'italic', 
                    color: '#e65100',
                    fontSize: isMobile ? '0.85rem' : '0.9rem',
                    lineHeight: 1.4,
                  }}
                >
                  <strong>Une seule action = une seule participation</strong><br />
                  Vos clients ne joueront qu'une seule fois si vous ne proposez qu'une seule action
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Collapse>

        {/* Modal de sélection d'action */}
        <Dialog 
          open={isActionModalOpen} 
          onClose={closeActionModal} 
          maxWidth="md" 
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
            Choisir le type d'action
          </DialogTitle>
          <DialogContent sx={{ px: isMobile ? 2 : 3 }}>
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 3,
                fontSize: isMobile ? '0.85rem' : '0.9rem',
              }}
            >
              Sélectionnez le type d'action que vous souhaitez ajouter à votre campagne.
            </Typography>
            
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { 
                xs: 'repeat(1, 1fr)', 
                sm: 'repeat(2, 1fr)', 
                md: 'repeat(3, 1fr)' 
              }, 
              gap: 2 
            }}>
              {Object.entries(actionTypeConfig).map(([type, config]) => (
                <Card
                  key={type} 
                    sx={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      border: '2px solid transparent',
                      '&:hover': {
                        borderColor: config.color,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 4px 12px ${config.color}30`,
                      },
                    }}
                    onClick={() => addAction(type as ActionType)}
                  >
                    <CardContent sx={{ 
                      textAlign: 'center', 
                      py: isMobile ? 2 : 3,
                      px: isMobile ? 1.5 : 2,
                    }}>
                      <Box sx={{ 
                        mb: 2, 
                        color: config.color,
                        '& svg': { 
                          fontSize: isMobile ? '2rem' : '2.5rem' 
                        }
                      }}>
                        {config.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontSize: isMobile ? '0.9rem' : '1rem',
                          fontWeight: 600,
                          color: config.color,
                          mb: 1,
                        }}
                      >
                        {config.label}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: isMobile ? '0.75rem' : '0.8rem',
                          lineHeight: 1.4,
                        }}
                      >
                        {type === 'GOOGLE_REVIEW' && 'Demander un avis Google'}
                        {type === 'INSTAGRAM' && 'Suivre sur Instagram'}
                        {type === 'FACEBOOK' && 'Aimer la page Facebook'}
                        {type === 'TIKTOK' && 'Suivre sur TikTok'}
                      </Typography>
                    </CardContent>
                  </Card>
              ))}
                        </Box>
          </DialogContent>
          <DialogActions sx={{ 
            px: isMobile ? 2 : 3,
            pb: isMobile ? 2 : 2,
          }}>
                         <Button 
               onClick={closeActionModal} 
               size={isMobile ? 'small' : 'medium'}
               sx={{ textTransform: 'none' }}
             >
               Annuler
             </Button>
          </DialogActions>
        </Dialog>

        {/* Modal d'édition d'action */}
        <EditActionModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          action={selectedAction}
          onSave={handleEditAction}
        />
      </Stack>
    </Paper>
  );
};

export default ActionsSection; 