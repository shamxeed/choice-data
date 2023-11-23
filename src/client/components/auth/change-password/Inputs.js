import React from 'react';
import {
  Input,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Alert, Asteriq, MyModal } from '../../Misc';
import { Container, SubmitBtn } from '../../Misc/form';
import { SimpleSpinner } from '../../Misc/Spinner';
import { errMessage } from '@/client/utils/helpers';
import * as patterns from '../../../utils/patterns';
import ModalInputs from './ModalInput';

const Inputs = ({ data }) => {
  const form = useForm();

  const { axios, isLoading } = data || {};

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const { onOpen, ...props } = useDisclosure();

  const alertDisclosure = useDisclosure();

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (e) => {
    const email = e.email;

    try {
      const { api_response, user } = await axios({
        url: `/lookup?email=${email}`,
      });

      if (api_response === 'Account found!') {
        await axios({
          url: '/auth/otp',
          method: 'post',
          data: { ...user, email, isPassword: true },
        });

        return onOpen();
      }
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body });
      alertDisclosure.onOpen();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FormControl isInvalid={!!errors['email']}>
            <FormLabel fontWeight={700} mt={1}>
              Email Address<Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              {...register('email', {
                required: 'This is required',
                pattern: patterns.email.pattern,
              })}
            />

            <FormErrorMessage>
              {errors['email']?.message || patterns.email.message}
            </FormErrorMessage>
          </FormControl>

          <SubmitBtn text={'Search'} />
        </Container>
      </form>

      <Alert
        data={{
          ...alert,
          ...alertDisclosure,
        }}
      />

      <MyModal
        data={{
          ...props,
          title: 'Change Password',
          body: <ModalInputs data={{ ...props, form }} />,
        }}
      />

      {isLoading && <SimpleSpinner />}
    </div>
  );
};

export default Inputs;
