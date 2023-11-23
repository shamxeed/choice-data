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
import { otp } from '@/client/utils/patterns';
import { Container, SubmitBtn } from '../../Misc/form';
import { SimpleSpinner } from '../../Misc/Spinner';
import { errMessage } from '@/client/utils/helpers';
import { Btn, BtnContainer } from './Misc';

const Inputs = ({ data }) => {
  const form = useForm();

  const router = useRouter();

  const { email, setUser, axios, isLoading, handleOTPResend } = data || {};

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const onSubmit = async (e) => {
    const code = Number(e.otp);

    try {
      const { api_response, userData } = await axios({
        url: '/auth/otp/verify',
        method: 'post',
        data: { email, code },
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

  const onChangeEmail = () => {
    router.push('/auth/change-email');
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FormLabel fontWeight={700} mt={1}>
            Email<Asteriq>*</Asteriq>
          </FormLabel>
          <Input size={'lg'} isReadOnly value={email} />

          <FormControl isInvalid={!!errors['otp']}>
            <FormLabel fontWeight={700} mt={4}>
              OTP <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'number'}
              {...register('otp', {
                required: 'This is required!',
                validate: otp.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['otp']?.message || otp.message}
            </FormErrorMessage>
          </FormControl>

          <BtnContainer>
            <Btn onClick={handleOTPResend}>Resend OTP</Btn>
            <Btn onClick={onChangeEmail}>Change Email</Btn>
          </BtnContainer>

          <SubmitBtn text={'Submit'} />
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
