import { useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';

export const useToast = () => {
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const showToast = useCallback((message, severity = 'info') => {
    setToast({
      open: true,
      message,
      severity
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      open: false
    }));
  }, []);

  const ToastComponent = useCallback(() => {
    return (
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={hideToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={hideToast} 
          severity={toast.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    );
  }, [toast, hideToast]);

  return {
    showToast,
    hideToast,
    ToastComponent
  };
};