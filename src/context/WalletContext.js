import { createContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import ApiService from '../services/api.service';

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWallet = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await ApiService.getWallet();
      console.log("Wallet Response:", response);
      
      setWallet(response); // Make sure to use `response.data`
      setError(null);
    } catch (err) {
      console.error("Error fetching wallet:", err.response ? err.response.data : err.message);
      setError("Failed to fetch wallet information");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchTransactions = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await ApiService.getTransactions();
      setTransactions(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const deposit = async (walletId, amount, description, type, categoryid) => {
    try {
      const response = await ApiService.deposit(walletId, amount, description, type, categoryid);
      await fetchWallet();
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const withdraw = async (walletId, amount, description, type, categoryid) => {
    try {
      const response = await ApiService.withdraw(walletId, amount, description, type, categoryid);
      await fetchWallet();
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const transfer = async (recipientWalletNumber, amount, description, type, categoryid, walletId) => {
    try {
      const response = await ApiService.transfer(recipientWalletNumber, amount, description, type, categoryid, walletId);
      await fetchWallet();
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (!user) return;
    if (!wallet || !transactions) {
      fetchWallet();
      fetchTransactions();
    }
    setWallet(wallet);
    setTransactions(transactions);
    
  }, [user]);

  const value = {
    wallet,
    transactions,
    loading,
    error,
    fetchWallet,
    fetchTransactions,
    deposit,
    withdraw,
    transfer
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};
