// src/utils/date-formatter.js
/**
 * Format a date string to a human-readable format
 * @param {string|Date} dateString - Date string or Date object to format
 * @param {object} options - Formatting options (optional)
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A';
  
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    ...options
  };
  
  return date.toLocaleString('en-US', defaultOptions);
};

/**
 * Format a date to relative time (e.g., "5 minutes ago", "2 days ago")
 * @param {string|Date} dateString - Date string or Date object to format
 * @returns {string} - Relative time string
 */
export const formatRelativeTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return diffInSeconds === 1 ? '1 second ago' : `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return diffInDays === 1 ? '1 day ago' : `${diffInDays} days ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? '1 week ago' : `${diffInWeeks} weeks ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return diffInMonths === 1 ? '1 month ago' : `${diffInMonths} months ago`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return diffInYears === 1 ? '1 year ago' : `${diffInYears} years ago`;
};