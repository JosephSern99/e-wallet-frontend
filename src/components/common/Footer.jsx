import React from 'react';
import { Box, Container, Typography, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'flex-start' },
          }}
        >
          <Box sx={{ mb: { xs: 2, sm: 0 } }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              E-Wallet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Secure digital payment solution
            </Typography>
          </Box>
          
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 4 },
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="text.primary" gutterBottom>
                Company
              </Typography>
              <Link href="/about" color="inherit" display="block" sx={{ mb: 0.5 }}>About</Link>
              <Link href="/careers" color="inherit" display="block" sx={{ mb: 0.5 }}>Careers</Link>
              <Link href="/blog" color="inherit" display="block">Blog</Link>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.primary" gutterBottom>
                Support
              </Typography>
              <Link href="/help" color="inherit" display="block" sx={{ mb: 0.5 }}>Help Center</Link>
              <Link href="/contact" color="inherit" display="block" sx={{ mb: 0.5 }}>Contact Us</Link>
              <Link href="/faq" color="inherit" display="block">FAQs</Link>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" color="text.primary" gutterBottom>
                Legal
              </Typography>
              <Link href="/terms" color="inherit" display="block" sx={{ mb: 0.5 }}>Terms</Link>
              <Link href="/privacy" color="inherit" display="block" sx={{ mb: 0.5 }}>Privacy</Link>
              <Link href="/cookies" color="inherit" display="block">Cookies</Link>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} E-Wallet. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;