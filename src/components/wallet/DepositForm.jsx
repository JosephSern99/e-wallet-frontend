import React, { useState } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress,
  InputAdornment,
  useTheme,
  FormHelperText,
  Divider,
  MenuItem
} from '@mui/material';
import {
  Grid,
} from '@mui/system';
import { AddCircleOutline as DepositIcon, CreditCard } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWallet } from '../../hooks/useWallet';

const paymentMethods = [
  { value: 'card', label: 'Credit/Debit Card' },
  { value: 'bank', label: 'Bank Transfer' }
];

const DepositForm = ({ onSuccess }) => {
  const theme = useTheme();
  const { deposit, loading } = useWallet();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const depositSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive')
      .min(10, 'Minimum deposit is 10.00')
      .max(10000, 'Maximum deposit is 10,000.00')
  });

  const formik = useFormik({
    initialValues: {
      amount: '',
      // Credit card fields
      cardNumber: '',
      cardholderName: '',
      expiryDate: '',
      cvv: '',
      walletId: 1,
      description: 'Deposit to wallet',
      type: 'DEPOSIT',
      categoryid: 2
    },
    validationSchema: depositSchema,
    onSubmit: async (values) => {
      setError('');
      setSuccess('');
      setProcessing(true);
      
      try {
        await deposit(values.walletId, values.amount, values.description, values.type, values.categoryid);
        setSuccess('Deposit successful! Your wallet has been credited.');
        formik.resetForm();
        if (onSuccess) onSuccess();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to process deposit. Please try again.');
      } finally {
        setProcessing(false);
      }
    }
  });

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Card 
      elevation={3}
      sx={{ 
        borderRadius: 2,
        maxWidth: 500,
        mx: 'auto'
      }}
    >
      <Box 
        sx={{ 
          bgcolor: theme.palette.success.main, 
          color: theme.palette.success.contrastText,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <DepositIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Deposit Funds</Typography>
      </Box>
      
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}
            
            <TextField
              fullWidth
              select
              id="paymentMethod"
              name="paymentMethod"
              label="Payment Method"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              sx={{ mb: 3 }}
            >
              {paymentMethods.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount to Deposit"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                inputProps: { min: 10, step: 0.01 }
              }}
              sx={{ mb: 3 }}
            />
            
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Payment Details
              </Typography>
            </Divider>
            
            {paymentMethod === 'card' && (
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  id="cardNumber"
                  name="cardNumber"
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCard />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                
                <TextField
                  fullWidth
                  id="cardholderName"
                  name="cardholderName"
                  label="Cardholder Name"
                  placeholder="John Doe"
                  sx={{ mb: 2 }}
                />
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="expiryDate"
                      name="expiryDate"
                      label="Expiry Date"
                      placeholder="MM/YY"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      id="cvv"
                      name="cvv"
                      label="CVV"
                      placeholder="123"
                      type="password"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {paymentMethod === 'bank' && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" paragraph>
                  Please use the following details to make a bank transfer:
                </Typography>
                
                <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                  <Typography variant="body2">
                    <strong>Bank Name:</strong> Example Bank
                  </Typography>
                  <Typography variant="body2">
                    <strong>Account Name:</strong> E-Wallet Services
                  </Typography>
                  <Typography variant="body2">
                    <strong>Account Number:</strong> 1234567890
                  </Typography>
                  <Typography variant="body2">
                    <strong>Routing Number:</strong> 987654321
                  </Typography>
                  <Typography variant="body2">
                    <strong>Reference:</strong> Your E-Wallet ID
                  </Typography>
                </Box>
                
                <FormHelperText sx={{ mt: 1 }}>
                  Bank transfers typically take 1-3 business days to process.
                </FormHelperText>
              </Box>
            )}
            
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="success"
              size="large"
              disabled={processing || !formik.isValid}
              startIcon={<DepositIcon />}
              sx={{ py: 1.5 }}
            >
              {processing ? 'Processing...' : 'Deposit Funds'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default DepositForm;