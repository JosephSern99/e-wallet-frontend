import { NextApiRequest, NextApiResponse } from 'next';
// import WalletService from '../../../services/wallet.service';
// Assume this service fetches wallet data from your database
import ApiService from '../../../services/api.service';

const walletHandler = async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch all wallets
    const wallets = await ApiService.getWallet();

    if (!wallets || wallets.length === 0) {
      return res.status(404).json({ message: 'No wallets found' });
    }

    // Return success response with wallet data
    return res.status(200).json({ wallets });
  } catch (error) {
    console.error('Wallet fetch error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default walletHandler;