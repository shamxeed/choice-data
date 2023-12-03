import React from 'react';
import {
  Text,
  Input,
  Select,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Asteriq, MyModal, Alert } from '../../../Misc';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage, getCustomerId } from '@/client/utils/helpers';
import { Container, SubmitBtn } from '../../../Misc/form';
import Spinner from '../../../Misc/Spinner';
import { getPlansByType } from '@/client/utils/plan';
import { cableTypes } from '@/constants/Bundles';

const Inputs = () => {
  const form = useForm();

  const [biller, setBiller] = React.useState('');

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

  const { register, handleSubmit, formState, reset } = form;

  const { errors, isSubmitting } = formState;

  const { text, ...rest } = myForm;

  const { id: myId, transaction_pin, balance, first_name } = user || {};

  const isDisabled = myForm.pin.length <= 3;

  const plans = getPlansByType({ plans: bundles, type: biller });

  const handleFormChange = (value) => {
    setMyForm((form) => ({ ...form, pin: value }));
  };

  const onSubmit = async (e) => {
    const id = Number(e.id);

    const plan = plans.find((i) => i.id === id);

    const { amount, type, title } = plan;

    const amount_with_charges = amount + 20;

    if (amount_with_charges > balance) {
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

    try {
      const { data } = await axios({
        method: 'post',
        url: '/transaction/cables/get_info',
        data: { ...e, type },
      });

      const { customerName } = data || {};

      const ref = getCustomerId(first_name);

      setMyForm({
        ...e,
        ...plan,
        ref,
        myId,
        pin: '',
        customerName,
        text: `(${title}) ${customerName} at ₦${amount} `,
      });

      onOpen();
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body, type: 'error' });

      alertDisclosure.onOpen();
    }
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const subscribe = async () => {
    try {
      const { userData, api_response } = await axios({
        data: rest,
        method: 'post',
        url: '/transaction/cables/subscribe',
      });

      if (userData) {
        setUser(userData);
      }

      setAlert({
        type: 'success',
        title: 'Transaction Successful!',
        body: api_response,
      });
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body });
    } finally {
      alertDisclosure.onOpen();

      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FormLabel fontWeight={700} mt={1}>
            Biller<Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={'--Select Biller--'}
            onChange={(e) => {
              setBiller(e.target.value);
            }}
          >
            {cableTypes.map(({ title, id, value }) => (
              <option value={value} key={id}>
                {title}
              </option>
            ))}
          </Select>

          <FormControl>
            <FormLabel fontWeight={700} mt={4}>
              Product <Asteriq>*</Asteriq>
            </FormLabel>
            <Select
              size={'lg'}
              isRequired
              placeholder={
                biller ? '--Select Product Here--' : '--Select Biller First--'
              }
              {...register('id', {})}
            >
              {biller &&
                plans.map(({ id, title }, index) => (
                  <option value={id} key={index}>
                    {title}
                  </option>
                ))}
            </Select>
          </FormControl>

          <FormControl isInvalid={!!errors['account']}>
            <FormLabel fontWeight={700} mt={4}>
              SmartCard Number
              <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              {...register('account', {
                required: 'This is required!',
              })}
            />
            <FormErrorMessage>{errors['account']?.message}</FormErrorMessage>
          </FormControl>

          <Text color={'gray.600'} fontSize={'sm'} mt={2}>
            You'll be charged ₦20 for this service
          </Text>

          <SubmitBtn />
        </Container>
      </form>

      <MyModal
        withFooter
        data={{
          isOpen,
          onClose,
          text,
          txt: 'recharge',
          isLoading,
          btnProps: {
            isDisabled,
            onClick: subscribe,
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

      {isSubmitting && (
        <Spinner text={'Getting SmartCard Info, please wait...'} />
      )}
    </div>
  );
};

export default Inputs;
