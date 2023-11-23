'use client';

import React from 'react';
import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import Inputs from './Inputs';

const DeleteAccount = () => {
  const { user } = useAuth();

  const router = useRouter();

  const { axios, isLoading } = useAxios();

  React.useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user]);

  return (
    <MainBox>
      <SubHeader
        isForm
        title={'Delete your account'}
        extra={
          <Text mt={2}>
            Permanently delete all your data on saukie.net. Please note that,
            this can not be reveresed!
          </Text>
        }
      />
      <Inputs data={{ axios, isLoading }} />
    </MainBox>
  );
};

export default DeleteAccount;
