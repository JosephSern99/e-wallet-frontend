import React from 'react';
import { Container, Typography } from '@mui/material';
import BalanceCard from '../../components/wallet/BalanceCard';
import { useWallet } from '../../hooks/useWallet';
const Wallet = () => {
  const { wallet, loading: walletLoading } = useWallet();
  
  return (
    <Container>
      <Typography variant="h4">Wallet</Typography>
      <BalanceCard
        balance={wallet?.balance || 0}
        walletNumber={wallet?.walletNumber || 0}
        loading={walletLoading}
      />
    </Container>
  );
};

export default Wallet;