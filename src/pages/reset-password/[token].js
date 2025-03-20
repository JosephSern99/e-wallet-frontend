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
  IconButton,
  Link,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Lock as LockIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth';
import NextLink from 'next/link';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must include uppercase, lowercase, number and special character'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const { confirmResetPassword } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      if (!token) {
        setError('Invalid reset token');
        return;
      }
      
      setIsSubmitting(true);
      setError('');
      
      try {
        const result = await confirmResetPassword(token, values.password);
        if (result.success) {
          setSuccess(true);
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || 'Failed to reset password.'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (!token) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Alert severity="error">
          Invalid or missing reset token. Please request a new password reset link.
        </Alert>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="contained"
            onClick={() => router.push('/forgot-password')}
          >
            Request Password Reset
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Reset Password | E-Wallet</title>
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
            Set New Password
          </Typography>
          
          <Typography variant="body2" color="textSecondary" align="center" paragraph>
            Enter your new password below.
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          
          {success ? (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Alert severity="success" sx={{ mb: 3 }}>
                Your password has been successfully reset.
              </Alert>
              <Typography variant="body2" paragraph>
                You can now login with your new password.
              </Typography>
              <Button
                variant="contained"
                onClick={() => router.push('/login')}
                sx={{ mt: 2 }}
              >
                Go to Login
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
                id="password"
                name="password"
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm New Password"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
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