import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from 'src/hooks/useAuth';

// interface AuthGuardProps {
//   children: ReactNode;
//   fallback: ReactElement | null;
// }

const AuthGuard = () => {
  const auth: any = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth?.user === null && !window.localStorage.getItem('userData')) {
    }
  });
};

export default AuthGuard;
