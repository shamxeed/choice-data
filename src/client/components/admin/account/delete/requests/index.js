'use client';

import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

import MyTable from './Table';
import { useAxios } from '@/client/hooks/helpers';
import { Admin } from '../../../../auth';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Container from '../../../../Misc/Container';
import { errMessage } from '@/client/utils/helpers';
import { Alert, MyModal } from '@/client/components/Misc';

const DeleteRequests = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);

  const [form, setForm] = React.useState({
    user: undefined,
    pin: '',
    text: '',
  });

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const { axios, isLoading: isDeleting } = useAxios();

  const alertDisclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, pin, text } = form;

  const isDisabled = form.pin.length <= 3;

  const handleFormChange = (value) => {
    setForm((form) => ({ ...form, pin: value }));
  };

  const openModal = (id) => {
    const user = data.find((i) => i.id === id);
    setForm((prev) => ({
      ...prev,
      user,
      text: `completely delete ${user.email} account`,
    }));

    onOpen();
  };

  const onLoad = async () => {
    try {
      const { data } = await axios({
        url: `/admin/account/delete/requests`,
        method: 'post',
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

  const onDelete = async () => {
    try {
      const { api_response } = await axios({
        url: '/admin/account/delete',
        data: { pin, user },
        method: 'post',
      });

      const newData = data.filter((i) => i.id !== user.id);

      setData([...newData]);

      setAlert({
        type: 'success',
        title: 'Deleted Successfully!',
        body: api_response,
      });
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body });
    } finally {
      onClose();
      alertDisclosure.onOpen();
    }
  };

  return (
    <>
      <Admin data={{ onLoad, isLoading, error }}>
        <MainBox>
          <SubHeader title={'DELETE REQUESTS'} />

          <Container>
            <MyTable data={{ data, error, isLoading, openModal }} />
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
          isLoading: isDeleting,
          btnProps: {
            isDisabled,
            onClick: onDelete,
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

export default DeleteRequests;
