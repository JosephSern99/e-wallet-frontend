import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  Divider, 
  ListItemIcon 
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';
import { AccountBalanceWallet, Logout, Settings, Person } from '@mui/icons-material';
import Link from 'next/link';

const Header = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    router.push('/logout');
  };

  const handleProfile = () => {
    handleClose();
    router.push('/profile');
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {children}
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountBalanceWallet sx={{ mr: 1 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/wallet" passHref style={{ textDecoration: 'none', color: 'inherit' }}>
              E-Wallet
            </Link>
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              onClick={handleClick}
              color="inherit"
              sx={{ textTransform: 'none' }}
              startIcon={
                <Avatar 
                  sx={{ width: 32, height: 32, bgcolor: 'primary.dark' }}
                >
                  {user.fullName?.charAt(0) || user.username?.charAt(0)}
                </Avatar>
              }
            >
              {user.fullName || user.username}
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={() => router.push('/settings')}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" onClick={() => router.push('/login')}>Login</Button>
            <Button color="inherit" onClick={() => router.push('/register')}>Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;