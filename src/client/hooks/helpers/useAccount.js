import { useAxios } from './useAxios';
import { useAuth } from './useAuth';
import { errMessage } from '@/client/utils/helpers';
import { useStore } from './useStore';

export const useAccount = () => {
  const { axios } = useAxios();

  const { store, setStore } = useStore();

  const { user, setUser } = useAuth();

  const { accounts } = store;

  const getMonnify = async () => {
    const accs = localStorage.getItem('accounts');
    const account_name = localStorage.getItem('accountName');

    if (account_name) {
      const accounts = JSON.parse(accs);

      return setStore((prev) => ({
        ...prev,
        accounts: {
          ...prev.accounts,
          data: accounts,
        },
      }));
    }

    try {
      setStore((prev) => ({
        ...prev,
        accounts: {
          ...prev.accounts,
          isGettingAccount: true,
        },
      }));

      const { accounts, accountName } = await axios({
        method: 'post',
        url: '/transaction/funding/automated/monnify/create',
        data: user,
      });

      localStorage.setItem('accountName', accountName);

      localStorage.setItem('accounts', JSON.stringify(accounts));

      setStore((prev) => ({
        ...prev,
        accounts: {
          ...prev.accounts,
          data: accounts,
          isGettingAccount: false,
        },
      }));
    } catch (err) {
      const error = errMessage(err);

      setStore((prev) => ({
        ...prev,
        accounts: {
          ...prev.accounts,
          error,
          isGettingAccount: false,
        },
      }));
    }
  };

  /*  const getVpay = async () => {
    if (!user || user.nuban) {
      return setData((prevData) => ({ ...prevData, isLoading: false }));
    }

    try {
      const { session } = await axios({
        method: 'post',
        url: '/transaction/funding/session/vpay',
      });

      const { token } = session;

      const { userData } = await axios({
        method: 'post',
        url: '/transaction/funding/automated/vpay',
        data: {
          ...user,
          token,
        },
      });

      if (userData) {
        setUser(userData);
      }

      setData((prevData) => ({ ...prevData, isLoading: false }));
    } catch (err) {
      const error = errMessage(err);
      setData((prevData) => ({ ...prevData, isLoading: false, error }));
    }
  }; */

  const onLoad = () => {
    getMonnify();
  };

  return { user, onLoad, accounts };
};
