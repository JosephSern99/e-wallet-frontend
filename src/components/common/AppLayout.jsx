import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';
import { Box, Container, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

const AppLayout = ({ children }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  // Check if current page is authentication page
  const isAuthPage = router.pathname === '/login' || router.pathname === '/register';

  // If it's an auth page, don't show navigation sidebar
  if (isAuthPage) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
          {children}
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header>
        {!isDesktop && user && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Header>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {/* Sidebar Navigation for authenticated users */}
        {user && (
          <>
            {isDesktop ? (
              <Box
                component="nav"
                sx={{ width: 240, flexShrink: 0 }}
              >
                <Navigation />
              </Box>
            ) : (
              <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                  '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
                }}
              >
                <Navigation onItemClick={() => setDrawerOpen(false)} />
              </Drawer>
            )}
          </>
        )}

        {/* Main content */}
        <Container 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            py: 4, 
            px: { xs: 2, sm: 3 }
          }}
        >
          {children}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default AppLayout;
