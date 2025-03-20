import { useEffect } from 'react';
import Head from 'next/head';
import { AuthProvider } from '../context/AuthContext';
import { WalletProvider } from '../context/WalletContext';
import AppLayout from '../components/common/AppLayout';
import { useToast } from '../hooks/useToast';

// Import global styles
import '../app/styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { ToastComponent } = useToast();
  
  // Add Inter font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  return (
    <>
      <Head>
        <title>E-Wallet App</title>
        <meta name="description" content="A secure digital wallet application" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <AuthProvider>
        <WalletProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
          <ToastComponent />
        </WalletProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;