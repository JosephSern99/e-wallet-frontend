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
  FormHelperText
} from '@mui/material';
import { RemoveCircleOutline as WithdrawIcon } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWallet } from '../../hooks/useWallet';

const WithdrawForm = ({ onSuccess }) => {
  const theme = useTheme();
  const { withdraw, wallet, loading } = useWallet();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);

  const withdrawSchema = Yup.object().shape({
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive')
      .min(0.01, 'Minimum withdrawal is 0.01')
      .max(wallet?.balance || 0, 'Amount exceeds available balance')
  });

  const formik = useFormik({
    initialValues: {
      amount: ''
    },
    validationSchema: withdrawSchema,
    onSubmit: async (values) => {
      setError('');
      setSuccess('');
      setProcessing(true);
      
      try {
        await withdraw(values.amount);
        setSuccess('Withdrawal successful!');
        formik.resetForm();
        if (onSuccess) onSuccess();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to process withdrawal. Please try again.');
      } finally {
        setProcessing(false);
      }
    }
  });

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
          bgcolor: theme.palette.error.main, 
          color: theme.palette.error.contrastText,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <WithdrawIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Withdraw Funds</Typography>
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
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Available Balance
              </Typography>
              <Typography variant="h6" color="text.primary">
                ${wallet?.balance?.toFixed(2) || '0.00'}
              </Typography>
            </Box>
            
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Amount to Withdraw"
              type="number"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                inputProps: { min: 0.01, step: 0.01 }
              }}
              sx={{ mb: 3 }}
            />
            
            <FormHelperText sx={{ mb: 3 }}>
              Withdrawals usually process within 1-3 business days depending on your bank.
            </FormHelperText>
            
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="error"
              size="large"
              disabled={processing || !formik.isValid}
              startIcon={<WithdrawIcon />}
              sx={{ py: 1.5 }}
            >
              {processing ? 'Processing...' : 'Withdraw Funds'}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WithdrawForm;