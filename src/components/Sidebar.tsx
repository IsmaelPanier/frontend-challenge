import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import {
  Dashboard,
  Campaign,
  People,
  Tv,
  Sms,
  Star,
  Help,
  AccountCircle,
  Logout,
  Store,
} from '@mui/icons-material';

const Sidebar: React.FC = () => {
  const menuItems = [
    { text: 'Tous les enseignes', icon: <Store />, active: false, badge: null },
    { text: 'Mon tableau de bord', icon: <Dashboard />, active: false, badge: 'à venir' },
    { text: 'Ma Campagne', icon: <Campaign />, active: true, badge: null },
    { text: 'Récapitulatif des Utilisateurs', icon: <People />, active: false, badge: 'à venir' },
    { text: 'Supports de diffusion', icon: <Tv />, active: false, badge:  'à venir' },
    { text: 'Campagnes SMS', icon: <Sms />, active: false, badge:  'à venir' },
    { text: 'Gestion des Avis Google', icon: <Star />, active: false, badge:  'à venir' },
    { text: 'Mon Centre d\'aide', icon: <Help />, active: false, badge:  'à venir' },
  ];

  return (
    <Box
      sx={{
        width: 320,
        minHeight: '100vh',
        bgcolor: 'white',
        borderRight: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#6366f1',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          SM
        </Avatar>
        <Typography variant="h5" sx={{ fontWeight: 600, color: '#1a1a1a' }}>
          JEUX
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ px: 1, py: 1 }}>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              component="button"
              sx={{
                mb: 0.5,
                borderRadius: 1,
                bgcolor: item.active ? '#e3f2fd' : 'transparent',
                color: item.active ? '#1976d2' : '#666666',
                '&:hover': {
                  bgcolor: item.active ? '#e3f2fd' : '#f5f5f5',
                },
                cursor: 'pointer',
                border: 'none',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <ListItemIcon
                sx={{
                  color: item.active ? '#1976d2' : '#666666',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: '16px',
                  fontWeight: item.active ? 600 : 400,
                }}
              />
              {item.badge && (
                <Chip
                  label={item.badge}
                  size="small"
                  sx={{
                    fontSize: '11px',
                    height: '20px',
                    bgcolor: '#e3f2fd',
                    color: '#1976d2',
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>

                 {/* Promotional Card */}
         <Box sx={{ mx: 3, my: 4 }}>
           <Card sx={{ bgcolor: '#f0f4ff', border: '1px solid #e3f2fd' }}>
             <CardContent sx={{ p: 3 }}>
               <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                 <Box
                   sx={{
                     width: 48,
                     height: 48,
                     bgcolor: '#ff6b6b',
                     borderRadius: '50%',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     mr: 1.5,
                   }}
                 >
                   <Typography sx={{ color: 'white', fontSize: '24px' }}>🎯</Typography>
                 </Box>
                 <Box
                   sx={{
                     width: 36,
                     height: 36,
                     bgcolor: '#4ecdc4',
                     borderRadius: '50%',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                   }}
                 >
                   <Typography sx={{ color: 'white', fontSize: '18px' }}>👤</Typography>
                 </Box>
               </Box>
               <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, fontSize: '14px' }}>
                 Commandez Vos Flyers Personnalisés
               </Typography>
               <Typography variant="caption" sx={{ color: '#666', fontSize: '13px', lineHeight: 1.4 }}>
                 Personnalisez et commandez vos PUV pour toucher efficacement votre clientèle
               </Typography>
               <Button
                 variant="contained"
                 fullWidth
                 sx={{
                   mt: 2,
                   bgcolor: '#6366f1',
                   fontSize: '13px',
                   py: 1,
                   textTransform: 'none',
                   fontWeight: 600,
                 }}
               >
                 COMMANDEZ
               </Button>
             </CardContent>
           </Card>
         </Box>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ py: 0 }}>
          <ListItem
            component="button"
            sx={{
              mb: 1,
              borderRadius: 1,
              '&:hover': { bgcolor: '#f5f5f5' },
              cursor: 'pointer',
              border: 'none',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <AccountCircle sx={{ color: '#666666' }} />
            </ListItemIcon>
                         <ListItemText
               primary="Compte"
               primaryTypographyProps={{
                 fontSize: '16px',
                 color: '#666666',
               }}
             />
           </ListItem>
           <ListItem
             component="button"
             sx={{
               borderRadius: 1,
               '&:hover': { bgcolor: '#f5f5f5' },
               cursor: 'pointer',
               border: 'none',
               width: '100%',
               textAlign: 'left',
             }}
           >
             <ListItemIcon sx={{ minWidth: 40 }}>
               <Logout sx={{ color: '#666666' }} />
             </ListItemIcon>
             <ListItemText
               primary="Déconnexion"
               primaryTypographyProps={{
                 fontSize: '16px',
                 color: '#666666',
               }}
             />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar; 