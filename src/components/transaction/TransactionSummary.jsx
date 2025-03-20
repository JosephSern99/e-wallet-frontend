import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Stack,
  Chip
} from '@mui/material';
import {
  Grid,
} from '@mui/system';
import {
  TrendingUp as IncomeIcon,
  TrendingDown as ExpenseIcon,
  AccountBalance as BalanceIcon,
  SwapHoriz as TransferIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const SummaryItem = ({ title, value, icon, color }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        borderLeft: `4px solid ${color}`,
        borderRadius: 1,
        boxShadow: 1
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              bgcolor: `${color}15`,
              borderRadius: '50%',
              p: 1,
              mr: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h5" component="div" fontWeight="medium">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TransactionSummary = ({ 
  income = 0, 
  expenses = 0, 
  transfers = 0, 
  balance = 0, 
  period = 'This Month',
  recentTransactions = []
}) => {
  const theme = useTheme();
  
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Financial Summary</Typography>
        <Chip label={period} size="small" />
      </Box>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryItem 
            title="Expenses" 
            value={`${expenses.toFixed(2)}`} 
            icon={<ExpenseIcon sx={{ color: theme.palette.error.main }} />}
            color={theme.palette.error.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryItem 
            title="Transfers" 
            value={`${transfers.toFixed(2)}`} 
            icon={<TransferIcon sx={{ color: theme.palette.info.main }} />}
            color={theme.palette.info.main}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <SummaryItem 
            title="Current Balance" 
            value={`${balance.toFixed(2)}`} 
            icon={<BalanceIcon sx={{ color: theme.palette.primary.main }} />}
            color={theme.palette.primary.main}
          />
        </Grid>
      </Grid>
      
      {recentTransactions.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1" gutterBottom>
            Recent Activity
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          <Stack spacing={2}>
            {recentTransactions.slice(0, 5).map((transaction) => {
              const isDeposit = transaction.type === 'DEPOSIT';
              const isWithdrawal = transaction.type === 'WITHDRAWAL';
              
              return (
                <Box 
                  key={transaction.transactionReference}
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    p: 1.5,
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    boxShadow: 1
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        bgcolor: isDeposit 
                          ? `${theme.palette.success.main}15` 
                          : isWithdrawal 
                            ? `${theme.palette.error.main}15`
                            : `${theme.palette.info.main}15`,
                        borderRadius: '50%',
                        p: 0.75,
                        mr: 1.5,
                        display: 'flex',
                      }}
                    >
                      {isDeposit && <IncomeIcon color="success" fontSize="small" />}
                      {isWithdrawal && <ExpenseIcon color="error" fontSize="small" />}
                      {!isDeposit && !isWithdrawal && <TransferIcon color="info" fontSize="small" />}
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {transaction.description || transaction.type}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography 
                      variant="body2" 
                      fontWeight="medium"
                      color={
                        isDeposit 
                          ? 'success.main' 
                          : isWithdrawal 
                            ? 'error.main'
                            : 'text.primary'
                      }
                    >
                      {isDeposit ? '+' : isWithdrawal ? '-' : ''}
                      ${parseFloat(transaction.amount).toFixed(2)}
                    </Typography>
                    <Chip 
                      label={transaction.status} 
                      size="small"
                      color={
                        transaction.status === 'COMPLETED' 
                          ? 'success' 
                          : transaction.status === 'PENDING' 
                            ? 'warning' 
                            : 'error'
                      }
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  </Box>
                </Box>
              );
            })}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default TransactionSummary;