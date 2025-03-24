import api from './api';

const ApiService = {
  login: async (credentials) => {
    try {
      console.log("logging in");
      const response = await api.post('/auth/signin', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (userData) => {
    return api.post('/auth/signup', userData);
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    },
    
  getCurrentUser: async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log(user.username);
      if (!user || !user.username) {
      return null;
      }
      const response = await api.get(`/users/me/${user.username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      if (error.response) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      }
      return null;
    }
  },
    
  verifyEmail: async (token) => {
    return api.post(`/auth/verify-email/${token}`);
  },

  resetPassword: async (email) => {
    return api.post('/auth/reset-password', { email });
  },

  confirmResetPassword: async (token, newPassword) => {
    return api.post(`/auth/reset-password/${token}`, { password: newPassword });
  },

  getWallet: async () => {
    const response = await api.get('/wallet');
    return response.data;
  },
  
  getTransactions: async () => {
    const response = await api.get('/wallet/transactions');
    return response.data;
  },
  
  deposit: async (walletId, amount, description, type, categoryid) => {
    const response = await api.post('/wallet/deposit', { walletId, amount, description, type, categoryid });
    return response.data;
  },
  
  withdraw: async (walletId, amount, description, type, categoryid) => {
    const response = await api.post('/wallet/withdraw', { walletId, amount, description, type, categoryid });
    return response.data;
  },
  
  transfer: async (recipientWalletNumber, amount, description, type, categoryid, walletId) => {
    const response = await api.post('/wallet/transfer', {
      recipientWalletNumber,
      amount,
      description,
      type,
      categoryid,
      walletId
    });

    return response.data;
  },
  
  getTransaction: async (transactionId) => {
    const response = await api.get(`/wallet/transactions/${transactionId}`);
    return response.data;
  }
};

export default ApiService;