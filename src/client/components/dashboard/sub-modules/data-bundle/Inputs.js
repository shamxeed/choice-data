import React from 'react';
import {
  Input,
  Select,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Asteriq, MyModal, Alert } from '../../../Misc';
import { networks } from '@/constants/Bundles';
import { mobileNum } from '@/client/utils/patterns';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import * as helpers from '@/client/utils/helpers';
import { Container, SubmitBtn } from '../../../Misc/form';
import { filterTypes } from './helpers';
import { getPlans } from '@/client/utils/plan';

const Inputs = () => {
  const form = useForm();

  const [network, setNetwork] = React.useState('');

  const [type, setType] = React.useState('');

  const { user, bundles, setUser } = useAuth();

  const { axios, isLoading } = useAxios();

  const [myForm, setMyForm] = React.useState({
    pin: '',
    plan_id: '',
    mobileNumber: '',
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

  const { errors } = formState;

  const { text, ...rest } = myForm;

  const { transaction_pin, balance, first_name } = user || {};

  const isDisabled = myForm.pin.length <= 3;

  const types = filterTypes(network);

  const handleFormChange = (value) => {
    setMyForm((form) => ({ ...form, pin: value }));
  };

  const bundlesList = getPlans({ plans: bundles, network, type });

  const onSubmit = (e) => {
    const id = Number(e.bundle);
    const mobile_number = e.mobileNum;

    const { amount, title } = bundlesList.find((i) => i.id === id);

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

    const customer_id = helpers.getCustomerId(first_name);

    setMyForm({
      id,
      network,
      customer_id,
      pin: Number,
      mobile_number,
      myId: user.id,
      text: `${network} (${title} to ${e.mobileNum})`,
    });

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const buyBundle = async () => {
    try {
      const { api_response, userData, bundles } = await axios({
        url: '/transaction/data',
        method: 'post',
        data: rest,
      });

      if (userData) {
        setUser(userData, bundles);
      }

      setAlert({
        type: 'success',
        title: 'Transaction Successful!',
        body: api_response,
      });
    } catch (err) {
      const body = helpers.errMessage(err);

      helpers.debitInProgress({
        body,
        axios,
        setAlert,
        data: rest,
        url: '/data',
      });
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
            Network<Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={'--Select Network--'}
            onChange={(e) => setNetwork(e.target.value)}
          >
            {networks.map(({ value, id }) => (
              <option value={value} key={id}>
                {value}
              </option>
            ))}
          </Select>

          <FormLabel fontWeight={700} mt={4}>
            Data Type <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={
              network ? '--Select Data Type Here--' : '--Select Network First--'
            }
            onChange={(e) => setType(e.target.value)}
          >
            {types.map(({ id, value, title }) => (
              <option value={value} key={id}>
                {title}
              </option>
            ))}
          </Select>

          <FormLabel fontWeight={700} mt={4}>
            Bundles <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={
              type ? '--Select Bundles Here--' : '--Select Data Type First--'
            }
            {...register('bundle', {})}
          >
            {bundlesList.map(({ id, title }) => (
              <option value={id} key={id}>
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
                validate: mobileNum.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['mobileNum']?.message || mobileNum.message}
            </FormErrorMessage>
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
            onClick: buyBundle,
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
