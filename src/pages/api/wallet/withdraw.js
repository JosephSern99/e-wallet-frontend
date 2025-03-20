import { NextApiRequest, NextApiResponse } from 'next';
import { withdraw } from '../../../services/wallet.service'; // Assume this service handles wallet transactions in your database

const withdrawHandler = async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({ message: 'User ID and amount are required' });
  }

  try {
    // Withdraw amount from wallet
    const updatedWallet = await withdraw(userId, amount);

    // Return success response with updated wallet data
    return res.status(200).json({ message: 'Withdrawal successful', wallet: updatedWallet });
  } catch (error) {
    console.error('Withdrawal error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default withdrawHandler;