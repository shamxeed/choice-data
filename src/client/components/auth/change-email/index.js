'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Text, useDisclosure } from '@chakra-ui/react';

import Inputs from './Inputs';
import { Alert } from '../../Misc';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';

const ChangeEmail = () => {
  const { user, setUser } = useAuth();

  const router = useRouter();

  const { axios, isLoading } = useAxios();

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { email, first_name, is_email_verified } = user || {};

  const handleOTPResend = async () => {
    try {
      const { msg } = await axios({
        url: '/auth/otp',
        method: 'post',
        data: user,
      });

      setAlert({
        body: msg,
        type: 'success',
        title: 'Successful!!',
      });
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body });
    } finally {
      alertDisclosure.onOpen();
    }
  };

  React.useEffect(() => {
    if (!user || is_email_verified) {
      router.replace('/dashboard');
    }
  }, [is_email_verified, user]);

  return (
    <MainBox>
      <SubHeader
        isForm
        title={'CHANGE EMAIL'}
        extra={
          <Text mt={2}>
            Hi! <b>{first_name}</b>, Do you think you've entered a wrong email
            while signing up? Change it here.{' '}
          </Text>
        }
      />
      <Inputs data={{ email, setUser, axios, isLoading, handleOTPResend }} />

      <Alert
        data={{
          ...alert,
          ...alertDisclosure,
        }}
      />
    </MainBox>
  );
};

export default ChangeEmail;
