import React from 'react';
import { Box, Typography, Grid} from '@mui/material';
import { AddCircleOutline as DepositIcon } from '@mui/icons-material';
import DepositForm from '../../components/wallet/DepositForm';
import { useRouter } from 'next/router';

export default function Deposit() {
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
        <DepositIcon sx={{ mr: 1 }} color="success" />
        <Typography variant="h4">Deposit Funds</Typography>
      </Box>
      
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <DepositForm onSuccess={handleSuccess} />
        </Grid>
      </Grid>
    </Box>
  );
}
