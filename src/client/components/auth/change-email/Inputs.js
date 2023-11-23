import React from 'react';
import {
  Input,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Asteriq, Alert } from '../../Misc';
import { Container, SubmitBtn } from '../../Misc/form';
import { SimpleSpinner } from '../../Misc/Spinner';
import { errMessage } from '@/client/utils/helpers';
import * as patterns from '@/client/utils/patterns';
import { useToast } from '@/client/hooks/helpers';

const Inputs = ({ data }) => {
  const form = useForm();

  const router = useRouter();

  const { success, error } = useToast();

  const { email, setUser, axios, isLoading } = data || {};

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { register, handleSubmit, formState, setValue } = form;

  const { errors } = formState;

  const onSubmit = async (e) => {
    if (e.email === email) {
      return error({ description: 'No changes made!' });
    }

    try {
      const { userData } = await axios({
        url: '/auth/me/update',
        method: 'post',
        data: { email: e.email },
      });

      if (userData) {
        setUser(userData);
      }

      success({ description: 'Updated successfully!!' });
      router.back();
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body });
      alertDisclosure.onOpen();
    }
  };

  React.useEffect(() => {
    setValue('email', email);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FormControl isInvalid={!!errors['email']}>
            <FormLabel fontWeight={700} mt={4}>
              Email Address <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              {...register('email', {
                required: 'This is required!',
                validate: patterns.email.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['email']?.message || patterns.email.message}
            </FormErrorMessage>
          </FormControl>

          <SubmitBtn text={'Save'} />
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
