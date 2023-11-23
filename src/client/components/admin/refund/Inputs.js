import React from 'react';
import {
  Input,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import Asteriq from '../../Misc/Asteriq';
import { mobileNum } from '@/client/utils/patterns';
import Alert from '../../Misc/Alert';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { Container, SubmitBtn } from '../../Misc/form';
import MyModal from '../../Misc/Modal';

const Inputs = () => {
  const form = useForm();

  const { user } = useAuth();

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const alertDisclosure = useDisclosure();

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const { text, ...rest } = myForm;

  const isDisabled = myForm.pin.length <= 3;

  const onSubmit = (e) => {
    const amount = e.amount;

    const myPhone = user.phone;

    setMyForm({
      ...e,
      myPhone,
      amount,
      pin: '',
      text: e.api_response,
    });

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const handleFormChange = (name, value) => {
    setMyForm((form) => ({ ...form, [name]: value }));
  };

  const refund = async () => {
    try {
      const { api_response } = await axios({
        url: '/transaction/funding/manual',
        method: 'post',
        data: rest,
      });

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
          <FormLabel fontWeight={700} mt={4}>
            Channel <Asteriq>*</Asteriq>
          </FormLabel>
          <Select size={'lg'} isRequired {...register('channel', {})}>
            <option value={'Refund'}>Refund</option>
          </Select>

          <FormControl isInvalid={!!errors['phone']}>
            <FormLabel fontWeight={700} mt={4}>
              Customer's Phone <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type='number'
              {...register('phone', {
                required: 'This is required!',
                validate: mobileNum.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['phone']?.message || mobileNum.message}
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
              })}
            />
            <FormErrorMessage>{errors['amount']?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors['api_response']}>
            <FormLabel fontWeight={700} mt={4}>
              API RESPONSE<Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              {...register('api_response', {
                required: 'This is required!',
              })}
            />
            <FormErrorMessage>
              {errors['api_response']?.message}
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
          txt: 'perform this action',
          btnProps: {
            isDisabled,
            onClick: refund,
          },
          onChange: (e) => handleFormChange('pin', e),
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
