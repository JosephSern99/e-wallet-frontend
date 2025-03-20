// import axios from 'axios';
// import Cookies from 'js-cookie';

// const apiReq = axios.create({
//   baseURL: 'http://localhost:8085/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });


// apiReq.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     // Track API call for analytics
//     if (typeof window !== 'undefined') {
//       const analyticsEvent = {
//         type: 'api_call',
//         endpoint: config.url,
//         method: config.method,
//         timestamp: new Date().toISOString(),
//         // userId: Cookies.get('userId') || 'anonymous'
//       };
      
//       // Store in localStorage for batch processing
//       const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
//       events.push(analyticsEvent);
//       localStorage.setItem('analytics_events', JSON.stringify(events));
      
//       // Send batch events if we have enough
//       // if (events.length >= 10) {
//       //   sendAnalyticsEvents();
//       // }
//     }
    
//     return config;
//   },
//   (error) => Promise.reject(error)
// );



// const sendAnalyticsEvents = async () => {
//   try {
//     const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
//     if (events.length === 0) return;
    
//     await axios.post('/api/analytics/events', { events });
//     localStorage.setItem('analytics_events', '[]');
//   } catch (error) {
//     console.error('Failed to send analytics events:', error);
//   }
// };




// export default WalletService;