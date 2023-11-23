import React from 'react';
import {
  Input,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Alert, Asteriq } from '../../Misc';
import { Container, SubmitBtn } from '../../Misc/form';
import { SimpleSpinner } from '../../Misc/Spinner';
import { errMessage } from '@/client/utils/helpers';
import * as patterns from '../../../utils/patterns';

const Inputs = ({ data }) => {
  const form = useForm();

  const { axios, isLoading } = data || {};

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const { api_response } = await axios({
        url: '/auth/delete',
        method: 'post',
        data,
      });

      setAlert({
        type: 'success',
        body: api_response,
        title: 'Request Successful!',
      });
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body });
    } finally {
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

          <FormControl isInvalid={!!errors['password']} mt={4}>
            <FormLabel fontWeight={700} mt={1}>
              Password<Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              {...register('password', {
                required: 'This is required',
                pattern: patterns.password.pattern,
              })}
            />

            <FormErrorMessage>
              {errors['email']?.message || patterns.password.message}
            </FormErrorMessage>
          </FormControl>

          <SubmitBtn text={'Submit Request'} />
        </Container>
      </form>

      <Alert
        data={{
          ...alert,
          ...alertDisclosure,
        }}
      />

      {isLoading && <SimpleSpinner />}
    </div>
  );
};

export default Inputs;
