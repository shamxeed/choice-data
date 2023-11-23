import React from 'react';
import {
  Text,
  Input,
  Select,
  FormLabel,
  FormControl,
  FormErrorMessage,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Asteriq, MyModal, Alert } from '../../../Misc';
import * as patterns from '@/client/utils/patterns';
import {
  calcPercentage,
  debitInProgress,
  errMessage,
  getCustomerId,
} from '@/client/utils/helpers';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { Container, SubmitBtn } from '../../../Misc/form';
import { getPlans } from '@/client/utils/plan';

const Inputs = () => {
  const form = useForm();

  const [network, setNetwork] = React.useState('');

  const alertDisclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { axios, isLoading } = useAxios();

  const { user, bundles, setUser } = useAuth();

  const [myForm, setMyForm] = React.useState({
    pin: '',
    text: '',
    id: Number,
    service: 'Airtime Topup',
    mobileNumber: Number,
  });

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const { register, handleSubmit, formState, watch, reset } = form;

  const { errors } = formState;

  const { text, ...rest } = myForm;

  const { id: myId, transaction_pin, balance, first_name } = user || {};

  const isDisabled = myForm.pin.length <= 3;

  const amount = watch('amount');

  const amountToPay = amount ? amount - calcPercentage(amount) : 0;

  const networks = getPlans({ plans: bundles, type: 'airtime' });

  const handleFormChange = (value) => {
    setMyForm((form) => ({ ...form, pin: value }));
  };

  const onSubmit = (e) => {
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
    } else {
    }

    const mobile_number = e.mobileNum;

    const customer_id = getCustomerId(first_name);

    const { id } = networks.find((i) => i.title === network);

    setMyForm((prev) => ({
      ...prev,
      id,
      myId,
      amount,
      network,
      customer_id,
      amountToPay,
      mobile_number,
      text: `(${network} ₦${amount} Airtime for ${mobile_number})`,
    }));
    onOpen();
  };

  const buyAirtime = async () => {
    try {
      const { api_response, userData } = await axios({
        url: '/transaction/airtime',
        method: 'post',
        data: rest,
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

      const { amount, ...data } = rest;

      debitInProgress({ body, axios, setAlert, data });
    } finally {
      alertDisclosure.onOpen();
    }

    reset();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FormLabel fontWeight={700} mt={1}>
            Select Network<Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={'--Select Network--'}
            onChange={(e) => setNetwork(e.target.value)}
          >
            {networks.map(({ title, id }) => (
              <option value={title} key={id}>
                {title}
              </option>
            ))}
          </Select>

          <FormControl isInvalid={!!errors['mobileNum']}>
            <FormLabel fontWeight={700} mt={4}>
              Mobile Number <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'number'}
              {...register('mobileNum', {
                required: 'This is required!',
                validate: patterns.mobileNum.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['mobileNum']?.message || patterns.mobileNum.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors['amount']}>
            <FormLabel fontWeight={700} mt={4}>
              Amount (₦) <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'number'}
              {...register('amount', {
                required: 'This is required!',
                validate: patterns.amount.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['amount']?.message || patterns.amount.message}
            </FormErrorMessage>
          </FormControl>
          <Text color={'gray.600'} fontSize={'sm'} mt={1}>
            Amount to pay (1.5% Discount): ₦{amountToPay}
          </Text>

          <SubmitBtn />
        </Container>
      </form>

      <MyModal
        data={{
          isOpen,
          onClose,
          text,
          isLoading,
          btnProps: {
            isDisabled,
            onClick: buyAirtime,
          },
          onChange: handleFormChange,
        }}
        withFooter
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
