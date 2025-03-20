import React, { useState} from 'react';
import { useRouter } from 'next/router';
import { 
  Box,
  Typography, 
  Card, 
  Button, 
  CircularProgress, 
  Tabs,
  Tab
} from '@mui/material';
import {
  Grid,
} from '@mui/system';
import { 
  TrendingUp as TrendingUpIcon,
  Receipt as ReceiptIcon,
  
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';
import { useWallet } from '../hooks/useWallet';
import BalanceCard from '../components/wallet/BalanceCard';
import TransactionSummary from '../components/transaction/TransactionSummary';
import TransactionHistory from '../components/transaction/TransactionHistory';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user } = useAuth();
  const { wallet, transactions, loading: walletLoading } = useWallet();
  console.log(wallet);
  const router = useRouter();
  const [tab, setTab] = useState(0);

  // useEffect(() => {
  //   if (!authLoading && !user) {
  //     router.push('/login');
  //   }
  // }, [user, authLoading, router]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  // Calculate summary data
  const getSummaryData = () => {
    const income = transactions
      .filter(tx => tx.type === 'DEPOSIT')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
      
    const expenses = transactions
      .filter(tx => tx.type === 'WITHDRAWAL')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
      
    const transfers = transactions
      .filter(tx => tx.type === 'TRANSFER')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);
      
    return { income, expenses, transfers };
  };

  // Prepare chart data
  const getChartData = () => {
    const dateMap = new Map();
    
    // Group transactions by date
    transactions.forEach(tx => {
      const date = new Date(tx.createdAt).toLocaleDateString();
      const amount = parseFloat(tx.amount);
      
      if (!dateMap.has(date)) {
        dateMap.set(date, { 
          date, 
          deposits: 0, 
          withdrawals: 0, 
          transfers: 0 
        });
      }
      
      const record = dateMap.get(date);
      if (tx.type === 'DEPOSIT') {
        record.deposits += amount;
      } else if (tx.type === 'WITHDRAWAL') {
        record.withdrawals += amount;
      } else if (tx.type === 'TRANSFER') {
        record.transfers += amount;
      }
    });
    
    // Convert map to array and sort by date
    return Array.from(dateMap.values())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-7); // Last 7 days
  };



  const { income, expenses, transfers } = getSummaryData();
  const chartData = getChartData();

  return (
    <Box sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="white">
          Welcome back, {user?.fullName || user?.username}!
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Wallet Balance Card */}
        <Grid item xs={12} md={4}>
          <BalanceCard 
            balance={wallet?.balance || 0} 
            walletNumber={wallet?.walletNumber} 
            loading={walletLoading} 
          />
        </Grid>
        
        {/* Transaction Summary */}
        <Grid item xs={12} md={8}>
          <TransactionSummary 
            income={income}
            expenses={expenses}
            transfers={transfers}
            balance={wallet?.balance || 0}
            recentTransactions={transactions.slice(0, 5)}
          />
        </Grid>
        
        {/* Activity Chart */}
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Activity Overview
              </Typography>
              <Tabs 
                value={tab} 
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab icon={<TrendingUpIcon />} label="Activity" />
                <Tab icon={<ReceiptIcon />} label="Transactions" />
              </Tabs>
            </Box>
            
            {tab === 0 ? (
              <Box sx={{ height: 300, mt: 3 }}>
                {walletLoading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                  </Box>
                ) : chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="deposits" stroke="#10b981" name="Deposits" />
                      <Line type="monotone" dataKey="withdrawals" stroke="#ef4444" name="Withdrawals" />
                      <Line type="monotone" dataKey="transfers" stroke="#0ea5e9" name="Transfers" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography color="text.secondary">No data available for chart</Typography>
                  </Box>
                )}
              </Box>
            ) : (
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
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}