import React from 'react';
import { 
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper
} from '@mui/material';
import { 
  Dashboard,
  AccountBalanceWallet,
  Receipt,
  AccountBalance,
  TrendingUp,
  Person,
  Settings
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const Navigation = ({ onItemClick }) => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
    if (onItemClick) onItemClick();
  };

  const isActive = (path) => router.pathname === path || router.pathname.startsWith(`${path}/`);

  const navItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'My Wallet', icon: <AccountBalanceWallet />, path: '/wallet' },
    { text: 'Transactions', icon: <Receipt />, path: '/transactions' },
    { text: 'Payments', icon: <AccountBalance />, path: '/payments' },
    { text: 'Analytics', icon: <TrendingUp />, path: '/analytics' },
  ];

  const accountItems = [
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Paper 
      elevation={0}
      sx={{ 
        height: '100%', 
        borderRadius: 0,
        borderRight: '1px solid',
        borderColor: 'divider'
      }}
    >
      <List component="nav" sx={{ pt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={isActive(item.path)}
              onClick={() => navigateTo(item.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  borderRight: '3px solid',
                  borderColor: 'primary.main',
                },
                '&.Mui-selected:hover': {
                  bgcolor: 'action.selected',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <Divider sx={{ my: 2 }} />
      
      <List component="nav">
        {accountItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={isActive(item.path)}
              onClick={() => navigateTo(item.path)}
              sx={{
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  borderRight: '3px solid',
                  borderColor: 'primary.main',
                },
                '&.Mui-selected:hover': {
                  bgcolor: 'action.selected',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Navigation;