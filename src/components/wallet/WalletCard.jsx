import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  Divider
} from '@mui/material';
import { AccountBalanceWallet as WalletIcon } from '@mui/icons-material';

const WalletCard = ({ walletInfo }) => {
  if (!walletInfo) {
    return null;
  }

  return (
    <Card 
      elevation={2}
      sx={{ 
        borderRadius: 2,
        mb: 3
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WalletIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Wallet Information</Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Wallet Number
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {walletInfo.walletNumber}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" color="text.secondary">
              Owner
            </Typography>
            <Typography variant="body1">
              {walletInfo.ownerName}
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Chip 
              label="Active" 
              color="success" 
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Box>
          
          <Box>
            <Typography variant="body2" color="text.secondary">
              Created On
            </Typography>
            <Typography variant="body1">
              {walletInfo.createdAt ? new Date(walletInfo.createdAt).toLocaleDateString() : 'N/A'}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WalletCard;