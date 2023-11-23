'use client';

import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

import MyTable from './Table';
import { useAxios } from '@/client/hooks/helpers';
import { Admin } from '../../../auth';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Container from '../../../Misc/Container';
import { errMessage } from '@/client/utils/helpers';
import Searchbar from '@/client/components/Misc/Searchbar';
import { Alert, MyModal } from '@/client/components/Misc';

const AllTransactions = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);

  const [form, setForm] = React.useState({
    transaction: undefined,
    pin: '',
    text: '',
  });

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const { axios, isLoading: isRefunding } = useAxios();

  const alertDisclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { transaction, pin, text } = form;

  const isDisabled = form.pin.length <= 3;

  const onLoad = async () => {
    try {
      const { data } = await axios({
        url: `/admin/transactions?type=purchase`,
      });

      const newData = data;

      setData(newData);
    } catch (err) {
      const error = errMessage(err);

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async (e) => {
    const { query } = e;

    setError('');
    setLoading(true);

    try {
      const { data } = await axios({
        url: `/admin/search/transactions?query=${query}`,
      });

      setData(data);
    } catch (err) {
      const error = errMessage(err);

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (value) => {
    setForm((form) => ({ ...form, pin: value }));
  };

  const openModal = (id) => {
    const trans = data.find((i) => i.id === id);
    setForm((prev) => ({
      ...prev,
      transaction: trans,
      text: `Refund for failed order on ${trans.mobile_number}`,
    }));

    onOpen();
  };

  const onRefund = async () => {
    try {
      const { msg, api_response } = await axios({
        url: '/admin/fund/refund',
        data: { pin, transaction },
        method: 'post',
      });

      const index = data.findIndex((i) => i.id === transaction.id);

      data.splice(index, 1, {
        ...transaction,
        status: 'failed',
        api_response,
      });

      setData([...data]);

      setAlert({
        type: 'success',
        title: 'Request Successful!',
        body: msg,
      });
    } catch (err) {
      const body = errMessage(err);

      setAlert(body);
    } finally {
      onClose();
      alertDisclosure.onOpen();
    }
  };

  return (
    <>
      <Admin data={{ onLoad, isLoading, error }}>
        <MainBox>
          <SubHeader title={'USERS TRANSACTIONS'} />

          <Searchbar onSubmit={onSearch} />

          <Container>
            <MyTable data={{ data, openModal, error, isLoading }} />
          </Container>
        </MainBox>
      </Admin>

      <MyModal
        withFooter
        data={{
          isOpen,
          onClose,
          text,
          txt: 'perform this action',
          isLoading: isRefunding,
          btnProps: {
            isDisabled,
            onClick: onRefund,
          },
          onChange: handleFormChange,
        }}
      />

      <Alert
        data={{
          ...alert,
          ...alertDisclosure,
        }}
      />
    </>
  );
};

export default AllTransactions;
