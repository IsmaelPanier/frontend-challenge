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
} from '@mui/material';
import {
  DragIndicator,
  Delete,
  Edit,
  Add,
  Google,
  Instagram,
  Facebook,
  VideoLibrary,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import type { Action, ActionType, Campaign } from '../../doc/CampaignType';

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
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const actions = watch('configuration.actions') || [];

  // Vérifier les actions en double
  const duplicateActions = actions.filter((action, index) => 
    actions.findIndex(a => a.type === action.type) !== index
  );

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      move(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const addAction = (type: ActionType) => {
    const newAction: Action = {
      id: Date.now().toString(),
      priority: actions.length + 1,
      target: type === 'GOOGLE_REVIEW' ? 'https://google.com/maps' : '@etablissement',
      type,
    };
    append(newAction);
  };

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
              ORGANISEZ VOS ACTIONS
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Définissez l'ordre et les actions à réaliser par vos clients pour maintenir l'engagement.
            </Typography>
          </Box>
        </Box>

        {/* Alertes pour actions en double */}
        {duplicateActions.length > 0 && (
          <Alert severity="warning" icon={<Warning />}>
            Attention : vous avez des actions en double. Cela peut créer une confusion pour vos clients.
          </Alert>
        )}

        {/* Boutons d'ajout d'actions */}
        <Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => addAction('GOOGLE_REVIEW')}
            sx={{ 
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              px: 3,
              py: 1.5,
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Ajouter une action
          </Button>
        </Box>

        {/* Tableau des actions */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="50">Ordre</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Cible</TableCell>
                <TableCell width="100">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((field, index) => {
                const action = actions[index];
                const config = actionTypeConfig[action.type];
                
                return (
                  <TableRow
                    key={field.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    sx={{
                      cursor: 'grab',
                      '&:active': { cursor: 'grabbing' },
                      opacity: draggedIndex === index ? 0.5 : 1,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DragIndicator color="action" />
                        <Typography variant="body2">{index + 1}</Typography>
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
                    
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {action.target}
                      </Typography>
                      {action.type === 'GOOGLE_REVIEW' && (
                        <Chip 
                          label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CheckCircle sx={{ fontSize: '0.875rem' }} />
                      vérifié
                    </Box>
                  } 
                          size="small" 
                          color="success" 
                          variant="outlined"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </TableCell>
                    
                    <TableCell>
                      <Stack direction="row" spacing={0.5}>
                        <IconButton 
                          size="small" 
                          disabled={action.type !== 'GOOGLE_REVIEW'}
                          title="Modifier"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton 
                          size="small" 
                          onClick={() => remove(index)}
                          color="error"
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
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                      Aucune action configurée. Ajoutez votre première action ci-dessus.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Avertissement avec barre verticale orange */}
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 2, mt: 3 }}>
          <Box
            sx={{
              width: 4,
              bgcolor: '#ff9800',
              flexShrink: 0,
              minHeight: '100%'
            }}
          />
          <Box sx={{ flex: 1, py: 1, px: 2, bgcolor: '#fff8e1', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#e65100' }}>
              <strong>Une seule action = une seule participation</strong><br />
              Vos clients ne joueront qu'une seule fois si vous ne proposez qu'une seule action
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ActionsSection; 