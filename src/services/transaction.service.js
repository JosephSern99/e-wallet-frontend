// src/services/transaction.service.js
import api from './api';

export const TransactionService = {
  getAll: async (params) => {
    return api.get('/wallet/transactions', { params });
  },
  
  getById: async (id) => {
    return api.get(`/wallet/transactions/${id}`);
  },
  
  getSummary: async (period = 'month') => {
    return api.get(`/wallet/summary?period=${period}`);
  },
  
  getStatistics: async (dateFrom, dateTo) => {
    return api.get('/wallet/statistics', {
      params: {
        dateFrom,
        dateTo
      }
    });
  },
  
  downloadTransactions: async (format = 'csv', dateFrom, dateTo) => {
    return api.get('/wallet/transactions/download', {
      params: {
        format,
        dateFrom,
        dateTo
      },
      responseType: 'blob'
    });
  }
};

