import React from 'react';

import { useStore } from './useStore';
import { useAxios } from './useAxios';

export const useBalances = () => {
  const { store, setStore } = useStore();

  const { axios } = useAxios();

  const [error, setError] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);
  const [isRefreshing, setRefreshing] = React.useState(false);

  const { user, balances } = store || {};

  const loadBalances = async (refresh) => {
    if (balances && !refresh) return;

    if (refresh) {
      setRefreshing(true);
    }

    try {
      const data = await axios({
        url: '/admin',
        method: 'post',
      });

      setStore((prev) => ({ ...prev, balances: data }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  return {
    user,
    error,
    balances,
    isLoading,
    loadBalances,
    isRefreshing,
  };
};
