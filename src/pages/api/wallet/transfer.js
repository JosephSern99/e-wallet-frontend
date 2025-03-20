import { NextApiRequest, NextApiResponse } from 'next';
import { transferBetweenWallets } from '../../../services/wallet.service'; // Assume this service handles wallet transactions in your database

const transferHandler = async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { fromUserId, toUserId, amount } = req.body;

  if (!fromUserId || !toUserId || !amount) {
    return res.status(400).json({ message: 'From user ID, to user ID, and amount are required' });
  }

  try {
    // Transfer amount between wallets
    const { fromWallet, toWallet } = await transferBetweenWallets(fromUserId, toUserId, amount);

    // Return success response with updated wallet data
    return res.status(200).json({ message: 'Transfer successful', fromWallet, toWallet });
  } catch (error) {
    console.error('Transfer error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default transferHandler;