import React from 'react';
import Head from 'next/head';
import {
    Box,
    Container,
    Paper,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import Grid from '@mui/material/Grid'; // Changed import to use MUI's Grid component directly
import LoginForm from '../components/auth/LoginForm';
import Image from 'next/image';
;

export default function Login() {;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Head>
        <title>Login | E-Wallet</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          minHeight: isMobile ? 'auto' : '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4} justifyContent="center">
            {!isMobile && (
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                    mb: 3,
                  }}
                >
                  <Image
                    src="/e-wallet.png" 
                    alt="Login illustration"
                    layout="fill"
                    objectFit="contain"
                    priority
                  />
                </Box>
                <Typography
                  variant="h4"
                  component="h1"
                  color="primary"
                  gutterBottom
                  align="center"
                >
                  Welcome to E-Wallet
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                  sx={{ maxWidth: 400 }}
                >
                  Manage your finances securely with our digital wallet solution.
                  Send, receive, and track your money with ease.
                </Typography>
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sm={10}
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 2,
                }}
              >
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Login to Your Account
                  </Typography>
                  {isMobile && (
                    <Typography variant="body2" color="textSecondary">
                      Manage your finances securely with our digital wallet.
                    </Typography>
                  )}
                </Box>
                <LoginForm />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}