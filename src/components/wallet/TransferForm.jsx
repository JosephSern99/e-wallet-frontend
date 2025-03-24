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
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { 
  SwapHoriz as TransferIcon, 
  Search as SearchIcon,
  AccountBalanceWallet as WalletIcon,
  Check as ConfirmIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWallet } from '../../hooks/useWallet';

const steps = ['Enter Details', 'Review Transfer', 'Confirmation'];

const TransferForm = ({ onSuccess }) => {
  const theme = useTheme();
  const { transfer, wallet, loading } = useWallet();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [recipientInfo, setRecipientInfo] = useState(null);

  const transferSchema = Yup.object().shape({
    recipientWalletNumber: Yup.string()
      .required('Recipient wallet number is required')
      .min(5, 'Invalid wallet number'),
    amount: Yup.number()
      .required('Amount is required')
      .positive('Amount must be positive')
      .min(0.01, 'Minimum transfer is 0.01')
      .max(wallet?.balance || 0, 'Amount exceeds available balance'),
    description: Yup.string()
      .max(100, 'Description too long')
  });

 const formik = useFormik({
  initialValues: {
    recipientWalletNumber: "WEDB5DBC8E7",
    amount: '',
    description: '',
    type: 'TRANSFER',
    categoryid: 2,
    walletId: 1
  },
  validationSchema: transferSchema,
  onSubmit: async (values) => {
    if (activeStep === 0) {
      // In a real app, you would look up recipient details here
      setRecipientInfo({
        name: 'joseph khoo',
        walletNumber: "WEDB5DBC8E7"
      });
      handleNext();
      return;
    }
    
    if (activeStep === 1) {
      handleNext();
      try {
        console.log('Submitting form with values:', values);
        await transfer(values.recipientWalletNumber, values.amount, values.description, values.type, values.categoryid, values.walletId);
        setSuccess('Transfer successful!');
        formik.resetForm();
        if (onSuccess) onSuccess();
      } catch (err) {
        console.error('Error during transfer:', err);
        setError(err.response?.data?.message || 'Failed to process transfer. Please try again.');
        handleBack();
      } finally {
        setProcessing(false);
    }
      return;
    }
    
    // Final step - process transfer
    setError('');
    setSuccess('');
    setProcessing(true);
  }
});

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    formik.resetForm();
    setRecipientInfo(null);
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
          bgcolor: theme.palette.info.main, 
          color: theme.palette.info.contrastText,
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TransferIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Transfer Funds</Typography>
      </Box>
      
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
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
            
            <Box component="form" onSubmit={formik.handleSubmit} noValidate>
              {activeStep === 0 && (
                <>
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
                    id="recipientWalletNumber"
                    name="recipientWalletNumber"
                    label="Recipient Wallet Number"
                    value={formik.values.recipientWalletNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.recipientWalletNumber && Boolean(formik.errors.recipientWalletNumber)}
                    helperText={formik.touched.recipientWalletNumber && formik.errors.recipientWalletNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WalletIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />
                  
                  <TextField
                    fullWidth
                    id="amount"
                    name="amount"
                    label="Amount to Transfer"
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
                  
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description (Optional)"
                    placeholder="e.g., Rent payment"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    sx={{ mb: 3 }}
                  />
                </>
              )}
              
              {activeStep === 1 && recipientInfo && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Review Transfer Details
                  </Typography>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Recipient
                      </Typography>
                      <Typography variant="body1">
                        {recipientInfo.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Wallet: {recipientInfo.walletNumber}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Amount
                      </Typography>
                      <Typography variant="h6" color="text.primary">
                        ${parseFloat(formik.values.amount).toFixed(2)}
                      </Typography>
                    </Box>
                    
                    {formik.values.description && (
                      <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                          Description
                        </Typography>
                        <Typography variant="body1">
                          {formik.values.description}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Please verify all details before confirming the transfer.
                  </Alert>
                </Box>
              )}
              
              {activeStep === 2 && (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  {processing ? (
                    <CircularProgress sx={{ mb: 2 }} />
                  ) : (
                    <>
                      <ConfirmIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h5" gutterBottom>
                        Transfer Complete!
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Your transfer of ${parseFloat(formik.values.amount).toFixed(2)} to {recipientInfo?.name} has been processed successfully.
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={handleReset}
                        sx={{ mt: 2 }}
                      >
                        Make Another Transfer
                      </Button>
                    </>
                  )}
                </Box>
              )}
              
              {activeStep < steps.length - 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!formik.isValid}
                  >
                    {activeStep === steps.length - 2 ? 'Confirm Transfer' : 'Next'}
                  </Button>
                </Box>
              )}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TransferForm;
      