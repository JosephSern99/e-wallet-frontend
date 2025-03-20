import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  Grid,
} from '@mui/system';
import { RemoveCircleOutline as WithdrawIcon } from '@mui/icons-material';
import WithdrawForm from '../../components/wallet/WithdrawForm';
import { useRouter } from 'next/router';

export default function Withdraw() {
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
        <WithdrawIcon sx={{ mr: 1 }} color="error" />
        <Typography variant="h4">Withdraw Funds</Typography>
      </Box>
      
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <WithdrawForm onSuccess={handleSuccess} />
        </Grid>
      </Grid>
    </Box>
  );
}