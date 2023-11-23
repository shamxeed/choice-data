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

import Asteriq from '../../Misc/Asteriq';
import { email, amount } from '@/client/utils/patterns';
import Alert from '../../Misc/Alert';
import { useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { Container, SubmitBtn } from '../../Misc/form';
import MyModal from '../../Misc/Modal';

const Inputs = () => {
  const form = useForm();

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

  const formHandler = (name, value) => {
    setMyForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = (e) => {
    setMyForm({
      ...e,
      pin: '',
      text: e.api_response,
    });

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const withdraw = async () => {
    try {
      const { api_response } = await axios({
        url: '/admin/fund/withdraw',
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
      setAlert({
        type: 'error',
        body,
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
            Channel<Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            //  placeholder={'--Select Transaction Type--'}
            //onChange={(e) => setNetwork(e.target.value)}
          >
            <option value={'Withdraw'}>Withdraw</option>
          </Select>

          <FormControl isInvalid={!!errors['email']}>
            <FormLabel fontWeight={700} mt={4}>
              User's Email<Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              placeholder={"--Enter User's Email address here--"}
              {...register('email', {
                required: 'This is required!',
                pattern: email.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['email']?.message || email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors['amount']}>
            <FormLabel fontWeight={700} mt={4}>
              Amount (₦)<Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'number'}
              placeholder={'--Enter Amount here--'}
              {...register('amount', {
                required: 'This is required!',
                validate: amount.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['amount']?.message || amount.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors['api_response']}>
            <FormLabel fontWeight={700} mt={4}>
              API RESPONSE<Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              placeholder={'--Enter API Response here--'}
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
            onClick: withdraw,
          },
          onChange: (e) => formHandler('pin', e),
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
