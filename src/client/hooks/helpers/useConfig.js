import React from 'react';
import { useAxios } from './useAxios';
import { useStore } from './useStore';
import { useToast } from './useToast';

import { errMessage } from '@/client/utils/helpers';

export const useConfig = () => {
  const { axios, isLoading } = useAxios();

  const { store, setStore } = useStore();

  const { error, success } = useToast();

  const { config } = store;

  const onLoad = async () => {
    const isEmpty = !config.id;

    if (!isEmpty) {
      return;
    }

    try {
      const { config } = await axios({
        url: '/admin/config',
        method: 'post',
      });

      const { phone, social, whatsapp, whatsapp_group, ...rest } = config;

      const oldConfig = store.config;

      const newConfig = {
        ...rest,
        phone: phone || oldConfig.phone,
        social: social || oldConfig.social,
        whatsapp: whatsapp || oldConfig.whatsapp,
        whatsapp_group: whatsapp_group || oldConfig.whatsapp_group,
      };

      setStore((prev) => ({ ...prev, config: newConfig }));
    } catch (err) {
      const description = errMessage(err);

      error({ description });
    }
  };

  const update = async (data) => {
    try {
      const { config } = await axios({
        data,
        method: 'post',
        url: '/admin/config/update',
      });

      setStore((prev) => ({ ...prev, config }));

      success({ description: 'Updated Successfully!!' });
    } catch (err) {
      const description = errMessage(err);

      error({ description });
    }
  };

  React.useEffect(() => {
    onLoad();
  }, []);

  return { update, config, isLoading };
};
