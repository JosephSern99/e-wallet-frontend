import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

import ApiService from '../../services/api.service';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { returnUrl } = router.query;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setLoginError('');
      
      try {
        const result = await ApiService.login(values);
        if (result) {
          router.push(returnUrl || '/dashboard');
        } else {
          setLoginError('Login failed. Please try again.');
        }
      } catch (error) {
        setLoginError(
          error.response?.data?.message || 'An error occurred during login.'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}
      
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Username"
        variant="outlined"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
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
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link href="/forgot-password" passHref>
          <Typography 
            variant="body2" 
            color="primary" 
            sx={{ 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Forgot password?
          </Typography>
        </Link>
      </Box>
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isSubmitting}
        sx={{ mt: 2 }}
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Login'
        )}
      </Button>
      
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" component="span">
          {"Don't have an account? "}
          <Link href="/register" passHref>
            <Typography
              variant="body2"
              component="span"
              color="primary"
              sx={{
                fontWeight: 'medium',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Sign Up
            </Typography>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;