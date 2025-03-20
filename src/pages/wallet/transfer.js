import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  Grid,
} from '@mui/system';
import { SwapHoriz as TransferIcon } from '@mui/icons-material';
import TransferForm from '../../components/wallet/TransferForm';
import { useRouter } from 'next/router';

export default function Transfer() {
  const router = useRouter();
  
  const handleSuccess = () => {
    // Wait a moment to show success message before redirecting
    setTimeout(() => {
      router.push('/wallet');
    }, 2000);
  };
  
  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <TransferIcon sx={{ mr: 1 }} color="info" />
        <Typography variant="h4">Transfer Funds</Typography>
      </Box>
      
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <TransferForm onSuccess={handleSuccess} />
        </Grid>
      </Grid>
    </Box>
  );
}