import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return children;
};

export default RequireAuth;