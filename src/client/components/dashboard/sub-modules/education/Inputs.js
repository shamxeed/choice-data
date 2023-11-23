import React from 'react';
import {
  Select,
  FormLabel,
  useDisclosure,
  FormControl,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Asteriq, MyModal, Alert } from '../../../Misc';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage, getCustomerId } from '@/client/utils/helpers';
import { Container, SubmitBtn } from '../../../Misc/form';
import { getPlansByType } from '@/client/utils/plan';

const Inputs = () => {
  const form = useForm();

  const { user, bundles, setUser } = useAuth();

  const { axios, isLoading } = useAxios();

  const [myForm, setMyForm] = React.useState({
    pin: '',
    text: '',
  });

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, reset } = form;

  const { text, ...rest } = myForm;

  const { transaction_pin, balance, first_name } = user || {};

  const isDisabled = myForm.pin.length <= 3;

  const vouchers = getPlansByType({ plans: bundles, type: 'edu' });

  const handleFormChange = (value) => {
    setMyForm((form) => ({ ...form, pin: value }));
  };

  const onSubmit = (e) => {
    const id = e.id;

    const { amount, title } = vouchers.find((i) => i.id === id);

    if (amount > balance) {
      setAlert({
        title: 'Insufficient Balance!',
        body: 'You do not have enough balance, please fund your wallet and try again.',
      });

      return alertDisclosure.onOpen();
    } else if (!transaction_pin) {
      setAlert({
        title: 'Transaction Pin Required!',
        body: 'Please set your transaction pin to perform this transaction.',
      });

      return alertDisclosure.onOpen();
    }

    const ref = getCustomerId(first_name);

    setMyForm({
      ...e,
      ref,
      amount,
      pin: '',
      text: `(${title}) at ₦${amount}`,
    });

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const purchaseVoucher = async () => {
    try {
      const { userData } = await axios({
        url: '/transaction/education/voucher',
        method: 'post',
        data: rest,
      });

      if (userData) {
        setUser(userData);
      }

      setAlert({
        type: 'success',
        title: 'Transaction Successful!',
        body: `Your request to purchase ${text} is successful! Please check Transaction History to see your ePIN.`,
      });
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body, type: 'error' });
    } finally {
      alertDisclosure.onOpen();

      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FormControl>
            <FormLabel fontWeight={700} mt={4}>
              Voucher <Asteriq>*</Asteriq>
            </FormLabel>
            <Select
              size={'lg'}
              isRequired
              placeholder={'--Select Voucher Here--'}
              {...register('id', {})}
            >
              {vouchers?.map(({ id, title, amount }) => (
                <option value={id} key={id}>
                  {title} - (₦{amount})
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontWeight={700} mt={4}>
              Quantity In Number <Asteriq>*</Asteriq>
            </FormLabel>
            <Select
              size={'lg'}
              isRequired
              placeholder={'--Select Quantity Here--'}
              {...register('quantity', {})}
            >
              <option value={'1'}>1</option>
            </Select>
          </FormControl>

          <SubmitBtn />
        </Container>
      </form>

      <MyModal
        withFooter
        data={{
          isOpen,
          onClose,
          text,
          isLoading,
          btnProps: {
            isDisabled,
            onClick: purchaseVoucher,
          },
          onChange: handleFormChange,
        }}
      />
      <Alert
        data={{
          ...alert,
          ...alertDisclosure,
          onClose: handleClose,
        }}
      />
    </div>
  );
};

export default Inputs;
