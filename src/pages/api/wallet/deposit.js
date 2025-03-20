import { NextApiRequest, NextApiResponse } from 'next';
// import WalletService from '../../../services/wallet.service';
import ApiService from '../../../services/api.service';

// Assume this service handles wallet transactions in your database

const depositHandler = async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ message: 'User ID and amount are required' });
  }

  try {
    // Deposit amount to wallet
    const updatedWallet = await ApiService.deposit(userId, amount);

    // Return success response with updated wallet data
    return res.status(200).json({ message: 'Deposit successful', wallet: updatedWallet });
  } catch (error) {
    console.error('Deposit error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default depositHandler;