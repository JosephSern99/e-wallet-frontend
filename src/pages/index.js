import React from 'react';
import { 
  Box, 
  Typography, 
  // CircularProgress,
  Divider,
  Card,
  CardContent,
  Button
} from '@mui/material';
import {
  Grid,
} from '@mui/system';
import { 
  AccountBalanceWallet as WalletIcon,
  AddCircleOutline as DepositIcon,
  RemoveCircleOutline as WithdrawIcon, 
  SwapHoriz as TransferIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import BalanceCard from '../components/wallet/BalanceCard';
import WalletCard from '../components/wallet/WalletCard';
import TransactionHistory from '../components/transaction/TransactionHistory.jsx';

export default function Wallet() {
  const { user, loading: authLoading } = useAuth();
  const { wallet, transactions, loading: walletLoading } = useWallet();
  const router = useRouter();

  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, authLoading, router]);

  if (authLoading || !user) {
    router.push('/login');
  }

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
        <WalletIcon sx={{ mr: 1 }} color="primary" />
        <Typography variant="h4">My Wallet</Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Wallet Information */}
        <Grid item xs={12} md={4}>
          <WalletCard walletInfo={wallet} />
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Actions</Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Button 
                    variant="outlined" 
                    color="success"
                    startIcon={<DepositIcon />}
                    onClick={() => router.push('/wallet/deposit')}
                    fullWidth
                    sx={{ height: '100%' }}
                  >
                    Deposit
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<WithdrawIcon />}
                    onClick={() => router.push('/wallet/withdraw')}
                    fullWidth
                    sx={{ height: '100%' }}
                  >
                    Withdraw
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button 
                    variant="outlined" 
                    color="info"
                    startIcon={<TransferIcon />}
                    onClick={() => router.push('/wallet/transfer')}
                    fullWidth
                    sx={{ height: '100%' }}
                  >
                    Transfer
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Balance and Transactions */}
        <Grid item xs={12} md={8}>
          <BalanceCard 
            balance={wallet?.balance || 0} 
            walletNumber={wallet?.walletNumber} 
            loading={walletLoading} 
          />
          
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HistoryIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Recent Transactions</Typography>
            </Box>
            
            <TransactionHistory 
              transactions={transactions.slice(0, 10)} 
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
        </Grid>
      </Grid>
    </Box>
  );
}