import { useRouter } from 'next/navigation';

import { useStore } from './useStore';
import { useAxios } from './useAxios';
import useToast from './useToast';
import { errMessage } from '@/client/utils/helpers';
import { postMessageWebView } from '@/client/utils/webview';

export const useAuth = () => {
  const router = useRouter();

  const { store, setStore } = useStore();

  const { axios, isLoading: isReloading } = useAxios();

  const { error } = useToast();

  const { user, bundles, isAuthenticated, isLoading } = store || {};

  const setUser = (user, data) => {
    const bundles = data || store.bundles;

    setStore((prevStore) => ({
      ...prevStore,
      user,
      bundles,
      isLoading: false,
      isAuthenticated: true,
    }));
  };

  const loadUser = async (props) => {
    const { data, forceReload } = props || {};

    if (user && !forceReload) return;

    if (data && !forceReload) {
      return setUser(data);
    }

    if (forceReload) {
      setStore((prevStore) => ({ ...prevStore, isLoading: true }));
    }

    try {
      const { me, bundles } = await axios({ url: '/auth/me' });

      setUser(me, bundles);
    } catch (err) {
      const description = errMessage(err);

      error({ description });
    }
  };

  const logOut = async () => {
    localStorage.clear();

    setStore((prevStore) => ({
      ...prevStore,
      isAuthenticated: false,
      user: undefined,
    }));

    router.replace('/');

    postMessageWebView('loggedOut');
  };

  return {
    user,
    bundles,
    isLoading,
    isReloading,
    isAuthenticated,
    setUser,
    logOut,
    loadUser,
  };
};
