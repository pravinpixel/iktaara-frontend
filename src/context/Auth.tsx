import Login from '@/pages/buy/login';
import { useAuth } from './AuthContext';

export const ProtectRoute = ({ children }: any) => {
  const { isAuthenticated, isLoading }: any = useAuth();
  if (
    isLoading ||
    (!isAuthenticated && window.location.pathname !== '/login')
  ) {
    return <Login />;
  }
  return children;
};
