import React from 'react';
import { Box, Typography, Grid, Paper, Button} from '@mui/material';
import TransactionHistory from '../components/transaction/TransactionHistory';
import { useWallet } from '../hooks/useWallet';
export default function Transactions() {
  const { transactions, loading: walletLoading } = useWallet();
  

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4">Transaction History</Typography>
      </Box>
      
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ mt: 2 }}>
                <TransactionHistory 
                  transactions={transactions.slice(0, 5)} 
                  loading={walletLoading}
                  onViewTransaction={(tx) => router.push(`/transactions/${tx.transactionReference}`)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => router.push('/transactions')}
                  >
                    View All Transactions
                  </Button>
                </Box>
              </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}