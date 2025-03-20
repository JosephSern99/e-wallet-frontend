import React, { useEffect } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Grid,
} from '@mui/system';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Register() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    // If user is already authenticated, redirect to dashboard
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <>
      <Head>
        <title>Register | E-Wallet</title>
      </Head>
      <Box
        sx={{
          display: 'flex',
          minHeight: isMobile ? 'auto' : '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
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
                    alt="Register illustration"
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
                <Typography
                  variant="h4"
                  component="h1"
                  color="primary"
                  gutterBottom
                  align="center"
                >
                  Join E-Wallet Today
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  align="center"
                  sx={{ maxWidth: 400 }}
                >
                  Create your account in minutes and start managing your finances
                  with our secure digital wallet solution.
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
                    Create a New Account
                  </Typography>
                  {isMobile && (
                    <Typography variant="body2" color="textSecondary">
                      Join our secure digital wallet platform today.
                    </Typography>
                  )}
                </Box>
                <RegisterForm />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}