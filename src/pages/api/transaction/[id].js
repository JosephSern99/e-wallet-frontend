import { NextApiRequest, NextApiResponse } from 'next';
import { getTransactionById } from '../../../services/transaction.service'; // Assume this service fetches transaction data from your database

const transactionHandler = async (req = NextApiRequest, res = NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    // Fetch transaction by ID
    const transaction = await getTransactionById(id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Return success response with transaction data
    return res.status(200).json({ transaction });
  } catch (error) {
    console.error('Transaction fetch error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default transactionHandler;