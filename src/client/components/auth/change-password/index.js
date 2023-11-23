'use client';

import React from 'react';
import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import Inputs from './Inputs';

const ChangePassword = () => {
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
        title={'Change your password'}
        extra={
          <Text mt={2}>
            Please enter your email address below to look for your account.
          </Text>
        }
      />
      <Inputs data={{ axios, isLoading }} />
    </MainBox>
  );
};

export default ChangePassword;
