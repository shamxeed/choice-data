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

import { Alert, Asteriq, MyModal } from '../../../../Misc';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { amount, mobileNum } from '@/client/utils/patterns';
import { SubmitBtn, Container } from '../../../../Misc/form';
import { networks } from '@/constants/Bundles';

const Inputs = () => {
  const form = useForm();

  const { user } = useAuth();

  const { axios, isLoading } = useAxios();

  const [network, setNetwork] = React.useState('');

  const [myForm, setMyForm] = React.useState({
    pin: '',
    text: '',
    service: '',
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

  const { transaction_pin } = user || {};

  const isDisabled = myForm.pin.length <= 3;

  const isAirtime = myForm.service === 'Airtime Topup';

  const handleFormChange = (name, value) => {
    setMyForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = async (e) => {
    if (!transaction_pin) {
      setAlert({
        title: 'Transaction Pin Required!',
        body: 'Please set your transaction pin to perform this transaction.',
      });

      return alertDisclosure.onOpen();
    }

    const amount = e.amount ? Number(e.amount) : 0;

    setMyForm((prevState) => ({
      ...prevState,
      ...e,
      amount,
      text: e.mobile_number,
    }));

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const submitDispute = async () => {
    const { text, ...data } = myForm;

    try {
      const { msg } = await axios({
        method: 'post',
        url: '/transaction/dispute',
        data: {
          ...data,
          network,
        },
      });

      setAlert({
        body: msg,
        type: 'success',
        title: 'Transaction Successful!',
      });
    } catch (err) {
      const body = errMessage(err);
      setAlert({ body });
    } finally {
      reset();
      alertDisclosure.onOpen();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FormLabel fontWeight={700} mt={1}>
            Service<Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={'--Select Service--'}
            onChange={(e) => handleFormChange('service', e.target.value)}
          >
            <option value={'Data Bundle'}>Data Bundle</option>
            <option value={'Airtime Topup'}>Airtime Topup</option>
          </Select>

          <FormLabel fontWeight={700} mt={4}>
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

          {!isAirtime ? (
            <FormControl isInvalid={!!errors['bundle']}>
              <FormLabel fontWeight={700} mt={4}>
                Bundles <Asteriq>*</Asteriq>
              </FormLabel>
              <Input
                size={'lg'}
                placeholder={'Enter bundle here, eg 1GB, 2GB, etc..'}
                {...register('bundle', {
                  required: 'This is required!',
                })}
              />
              <FormErrorMessage>{errors['bundle']?.message}</FormErrorMessage>
            </FormControl>
          ) : (
            <FormControl isInvalid={!!errors['amount']}>
              <FormLabel fontWeight={700} mt={4}>
                Amount <Asteriq>*</Asteriq>
              </FormLabel>
              <Input
                size={'lg'}
                placeholder={'Enter Amount here'}
                {...register('amount', {
                  required: 'This is required!',
                })}
              />

              <FormErrorMessage>
                {errors['amount']?.message || amount.message}
              </FormErrorMessage>
            </FormControl>
          )}

          <FormControl isInvalid={!!errors['mobile_number']}>
            <FormLabel fontWeight={700} mt={4}>
              Mobile Number <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'number'}
              {...register('mobile_number', {
                required: 'This is required!',
                validate: mobileNum.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['mobile_number']?.message || mobileNum.message}
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
          isLoading,
          text: myForm.text,
          txt: 'submit a refund request for failed transaction on ',
          btnProps: {
            isDisabled,
            onClick: submitDispute,
          },
          onChange: (value) => handleFormChange('pin', value),
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
