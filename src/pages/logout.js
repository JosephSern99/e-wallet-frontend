import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/login');
  }, [logout, router]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default Logout;