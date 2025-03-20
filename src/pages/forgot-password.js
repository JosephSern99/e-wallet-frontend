import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  Link,
} from '@mui/material';
import { Email as EmailIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import NextLink from 'next/link';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function ForgotPassword() {
  const router = useRouter();
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError('');
      
      try {
        const result = await resetPassword(values.email);
        if (result.success) {
          setSuccess(true);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || 'Failed to process password reset request.'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Forgot Password | E-Wallet</title>
      </Head>
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Reset Your Password
          </Typography>
          
          <Typography variant="body2" color="textSecondary" align="center" paragraph>
            Enter your email address and we will send you instructions to reset your password.
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Password reset instructions have been sent to your email.
              </Alert>
              <Typography variant="body2" paragraph>
                Please check your inbox and follow the instructions to reset your password.
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push('/login')}
                sx={{ mt: 2 }}
              >
                Back to Login
              </Button>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Reset Password'
                )}
              </Button>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <NextLink href="/login" passHref>
                  <Link variant="body2">Back to Login</Link>
                </NextLink>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
}
