import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  CircularProgress, 
  Stack,
  useTheme
} from '@mui/material';
import { 
  AddCircleOutline as DepositIcon, 
  RemoveCircleOutline as WithdrawIcon, 
  SwapHoriz as TransferIcon 
} from '@mui/icons-material';
import { useRouter } from 'next/router';

const BalanceCard = ({ balance, walletNumber, loading, currencySymbol = '$' }) => {
  const router = useRouter();
  const theme = useTheme();

  const actions = [
    { 
      label: 'Deposit', 
      icon: <DepositIcon />, 
      color: theme.palette.success.main,
      
      onClick: () => router.push('/wallet/deposit') 
    },
    { 
      label: 'Withdraw', 
      icon: <WithdrawIcon />, 
      color: theme.palette.error.main,
      onClick: () => router.push('/wallet/withdraw') 
    },
    { 
      label: 'Transfer', 
      icon: <TransferIcon />, 
      color: theme.palette.info.main,
      onClick: () => router.push('/wallet/transfer') 
    },
  ];

  return (
    <Card 
      elevation={3}
      sx={{ 
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        }
      }}
    >
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'primary.contrastText',
          py: 2,
          px: 3
        }}
      >
        <Typography variant="h6" gutterBottom>Wallet Balance</Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            bgcolor: 'rgba(255,255,255,0.2)', 
            px: 1,
            py: 0.5,
            borderRadius: 1
          }}
        >
          {walletNumber || 'Loading wallet information...'}
        </Typography>
      </Box>
      
      <CardContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Typography variant="h3" component="div" align="center" sx={{ mb: 3, fontWeight: 700 }}>
              {typeof balance === 'number' ? 
                `${currencySymbol}${balance.toFixed(2)}` : 
                'N/A'
              }
            </Typography>
            
            <Stack 
              direction="row" 
              spacing={1} 
              justifyContent="space-between"
              sx={{ mt: 2 }}
            >
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant="outlined"
                  startIcon={action.icon}
                  onClick={action.onClick}
                  sx={{ 
                    flex: 1,
                    borderColor: action.color,
                    color: action.color,
                    '&:hover': {
                      bgcolor: `${action.color}10`,
                      borderColor: action.color,
                    }
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;