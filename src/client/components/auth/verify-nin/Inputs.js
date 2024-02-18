import React from 'react';
import {
  Input,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Asteriq, Alert } from '../../Misc';
import { nin } from '@/client/utils/patterns';
import { Container, SubmitBtn } from '../../Misc/form';
import { SimpleSpinner } from '../../Misc/Spinner';
import { errMessage } from '@/client/utils/helpers';

const Inputs = ({ data }) => {
  const form = useForm();

  const { email, setUser, axios, isLoading } = data || {};

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const onSubmit = async (e) => {
    const nin = e.nin;

    try {
      const { api_response, userData } = await axios({
        url: '/auth/verify-nin',
        method: 'post',
        data: { email, nin },
      });

      if (userData) {
        setUser(userData);
      }

      setAlert({
        body: api_response,
        type: 'success',
        title: 'Successful!!',
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
          <FormControl isInvalid={!!errors['nin']}>
            <FormLabel fontWeight={700} mt={4}>
              NIN <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'number'}
              {...register('nin', {
                required: 'This is required!',
                validate: nin.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['nin']?.message || nin.message}
            </FormErrorMessage>
          </FormControl>

          <SubmitBtn text={'Verify'} />
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
