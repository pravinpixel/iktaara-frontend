/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from 'next-auth/react';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { AuthConfig } from 'src/configs/auth';
import api from 'src/lib/api/user';
import { addUser } from '../redux/user-slice';

export const AuthContext = createContext({});

type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, update } = useSession();

  useEffect(() => {
    if (user === null) {
      const initAuth = async (): Promise<void> => {
        const _user = session as unknown as any;
        if (session && _user.user.user) {
          setUser(_user.user.user);
          dispatch(addUser(_user.user.user));
        }
      };
      initAuth();
    }
  }, [user]);
  const handelSetData = async (data: any) => {
    console.log(data);
  };

  const handleLogin = async (params: any) => {
    const response: any = await api.login(params);

    if (response.status_code == 200) {
      const loggedUser: any = response.data.customer_data;
      setLoading(false);
      update({
        name: loggedUser?.first_name,
        email: loggedUser?.email,
        image: loggedUser?.profile_image,
        status: 'authenticated',
      });
      dispatch(addUser(loggedUser));
      setUser(loggedUser);
      window.localStorage.setItem('user', JSON.stringify(loggedUser));
      window.localStorage.setItem(
        AuthConfig.tokenName,
        response.data.authorization.access_token,
      );
      return response;
    } else {
      setLoading(false);
      return response;
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem(AuthConfig.tokenName);
    window.localStorage.removeItem('user');
    //router.replace('/login');
  };

  const values = {
    isAuthenticated: !!user,
    user,
    setUser,
    login: handleLogin,
    loading,
    setLoading,
    logout: handleLogout,
    setAuthUser: handelSetData,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
