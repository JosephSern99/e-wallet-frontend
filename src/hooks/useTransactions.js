import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';
import TransactionService from '../services/transaction.service';

export const useTransactions = () => {
  const { user } = useAuth();
  
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async (params) => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await TransactionService.getAll(params);
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const fetchSummary = useCallback(async (period) => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await TransactionService.getSummary(period);
      setSummary(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch transaction summary');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getTransactionById = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await TransactionService.getById(id);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Failed to fetch transaction details');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const downloadTransactions = useCallback(async (format, dateFrom, dateTo) => {
    try {
      setLoading(true);
      const response = await TransactionService.downloadTransactions(format, dateFrom, dateTo);
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transactions.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setError(null);
    } catch (err) {
      setError('Failed to download transactions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchTransactions();
      fetchSummary('month');
    }
  }, [user, fetchTransactions, fetchSummary]);

  return {
    transactions,
    summary,
    loading,
    error,
    fetchTransactions,
    fetchSummary,
    getTransactionById,
    downloadTransactions
  };
};