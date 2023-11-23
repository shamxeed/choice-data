import React from 'react';
import {
  Input,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Alert, Asteriq } from '../../../Misc';
import { amount, pin } from '@/client/utils/patterns';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { Container, SubmitBtn } from '../../../Misc/form';

const Inputs = () => {
  const form = useForm();

  const { user, setUser } = useAuth();

  const { axios, isLoading } = useAxios();

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const { transaction_pin, bonus } = user || {};

  const onSubmit = async (e) => {
    const amount = Number(e.amount);

    if (!transaction_pin) {
      setAlert({
        title: 'Transaction Pin Required!',
        body: 'Please set your transaction pin to perform this transaction.',
      });

      return alertDisclosure.onOpen();
    } else if (amount > bonus) {
      setAlert({
        title: 'Low Bonus Balance!',
        body: 'The amount you are trying to transfer is below your Bonus balance!',
      });

      return alertDisclosure.onOpen();
    }

    try {
      const { api_response, userData } = await axios({
        method: 'post',
        data: { ...e, amount },
        url: '/transaction/bonus',
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
          <FormControl isInvalid={!!errors['amount']}>
            <FormLabel fontWeight={700} mt={4}>
              Amount (₦)<Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'number'}
              {...register('amount', {
                required: 'This is required!',
                validate: amount.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['amount']?.message || amount.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors['pin']}>
            <FormLabel fontWeight={700} mt={4}>
              Transaction Pin <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'password'}
              {...register('pin', {
                required: 'This is required!',
                validate: pin.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['pin']?.message || pin.message}
            </FormErrorMessage>
          </FormControl>

          <SubmitBtn isLoading={isLoading} />
        </Container>
      </form>

      <Alert
        data={{
          ...alert,
          ...alertDisclosure,
        }}
      />
    </div>
  );
};

export default Inputs;
