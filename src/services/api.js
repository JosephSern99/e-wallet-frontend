import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL ='http://localhost:8085/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

// Add request interceptor to inject JWT token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    
    // Track API call for analytics
    // if (typeof window !== 'undefined') {
    //   const analyticsEvent = {
    //     type: 'api_call',
    //     endpoint: config.url,
    //     method: config.method,
    //     timestamp: new Date().toISOString(),
    //     userId: Cookies.get('userId') || 'anonymous'
    //   };
      
      // Store in localStorage for batch processing
      // const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      // events.push(analyticsEvent);
      // localStorage.setItem('analytics_events', JSON.stringify(events));
      
      // Send batch events if we have enough
      // if (events.length >= 10) {
      //   sendAnalyticsEvents();
      // }
        
    return config;
  },
  (error) => Promise.reject(error)
);


// Add response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 Unauthorized and has not yet been retried
    if (error.response === 401 && !originalRequest._retry) {
      // If the error was due to token expiry, you could potentially
      // refresh the token here and retry the request
      
      // For now, we'll just clear auth state on 401
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;