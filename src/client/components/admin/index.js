'use client';

import React from 'react';
import { Box, useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Admin } from '../auth';
import MyModal from '../Misc/Modal';
import { colors } from '../../../constants/themes';
import FundingInputs from '../Misc/FundingInputs';
import SuperLoginInput from '../Misc/SuperLoginInput';
import MyGrid from '@/client/layouts/Grid';
import Balance from './balance/Balance';
import { useAuth, useBalances } from '@/client/hooks/helpers';

import { btns } from './helpers';

const AdminDashbord = () => {
  const form = useForm();

  const [modalProps, setModal] = React.useState({
    title: '',
    body: '',
  });

  const {
    loadBalances: onLoad,
    balances: data,
    isLoading,
    isRefreshing,
    error,
  } = useBalances();

  const { user } = useAuth();

  const { onOpen, ...props } = useDisclosure();

  const { role } = user || {};

  const list = btns.filter(
    (i) => !i.isAdmin || (i.isAdmin && role === 'Admin')
  );

  const handleBtnClick = (title) => {
    if (title === 'Funding') {
      setModal({
        title,
        body: <FundingInputs data={{ form, ...props }} />,
      });
      onOpen();
    } else if (title === 'Super Login') {
      setModal({
        title,
        body: <SuperLoginInput data={{ form, ...props }} />,
      });
      onOpen();
    }
  };

  return (
    <Admin data={{ onLoad, isLoading, error }}>
      <Box p={2.5} bg={colors.bg} minH={'100vh'} ml={1.5} mr={1.5}>
        <Balance data={{ data, onLoad, isRefreshing, isLoading }} />
        <MyGrid list={list} onClick={handleBtnClick} />
      </Box>

      <MyModal
        data={{
          ...props,
          ...modalProps,
        }}
      />
    </Admin>
  );
};

export default AdminDashbord;
