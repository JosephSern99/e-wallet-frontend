import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  TextField,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Grid,
} from '@mui/system';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../hooks/useAuth.js';
import NextLink from 'next/link';

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  fullName: Yup.string()
    .min(2, 'Full name must be at least 2 characters')
    .required('Full name is required'),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10,15}$/, 'Phone number must be valid')
    .required('Phone number is required'),
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

const RegisterForm = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      fullName: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setRegisterError('');
      
      try {
        const result = await register(values);
        if (result.success) {
          setRegisterSuccess(true);
          router.push('/login');
        } else {
          setRegisterError(result.message);
        }
      } catch (error) {
        setRegisterError(
          error.response?.data?.message || 'An error occurred during registration.'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
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
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Full Name"
              variant="outlined"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              variant="outlined"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
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
                    <IconButton onClick={handleTogglePassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
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
                    <IconButton onClick={handleToggleConfirmPassword}>
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
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
                'Register'
              )}
            </Button>
          </Grid>
          <Grid item xs={12}>
            {registerError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {registerError}
              </Alert>
            )}
            {registerSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Registration successful! Redirecting to login...
              </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <NextLink href="/login" passHref>
                <Link component="button" variant="body2">Already have an account? Login</Link>
              </NextLink>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RegisterForm;