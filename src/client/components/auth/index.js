import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/client/hooks/helpers';

export const UnAuthenticated = ({ children }) => {
  const router = useRouter();

  const { isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated]);

  return <React.Fragment>{children}</React.Fragment>;
};

export const Admin = ({ children, data }) => {
  const router = useRouter();

  const { user, isAuthenticated } = useAuth();

  const { onLoad } = data || {};

  const { role } = user || {};

  const isAdmin = role === 'Admin' || role === 'MODERATOR';

  React.useEffect(() => {
    if (!isAdmin) {
      router.replace('/dashboard');
    } else {
      if (onLoad) {
        onLoad();
      }
    }
  }, [isAuthenticated, isAdmin]);

  return <React.Fragment>{children}</React.Fragment>;
};
