import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { otp, password } from '@/client/utils/patterns';
import { colors } from '@/constants/themes';
import { useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { Alert } from '../../Misc';

const { primary } = colors;

const ModalInputs = ({ data: { form, onClose } }) => {
  const { onOpen, ...alertOpts } = useDisclosure();

  const router = useRouter();

  const [alert, setAlert] = React.useState({});

  const { axios } = useAxios();

  const { register, handleSubmit, formState, reset } = form;

  const { errors, isSubmitting } = formState;

  const handleClose = () => {
    if (alert.isDone) {
      onClose();

      router.replace('/');
    } else {
      alertOpts.onClose();
    }
  };

  const onSubmit = async (e) => {
    const password2 = e.password2;

    const code = Number(e.otp);

    if (e.password !== password2) {
      setAlert({ body: 'Password does not matched!' });

      return onOpen();
    }

    try {
      const { api_response } = await axios({
        method: 'POST',
        url: '/password',
        data: { ...e, code },
      });

      setAlert({
        type: 'success',
        title: 'Successful!',
        body: api_response,
        isDone: true,
      });
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body });
    } finally {
      onOpen();
      reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel>Email Address</FormLabel>
        <Input
          isReadOnly
          size={'lg'}
          type='email'
          variant={'filled'}
          {...register('email', {})}
        />

        <FormControl isInvalid={!!errors['otp']} mt={3}>
          <FormLabel>OTP</FormLabel>
          <Input
            type={'number'}
            variant={'filled'}
            placeholder='Enter OTP sent to email here'
            size={'lg'}
            {...register('otp', {
              required: 'This is required',
              validate: otp.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['otp']?.message || otp.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors['password']} mt={3}>
          <FormLabel>New Password</FormLabel>
          <Input
            type={'password'}
            variant={'filled'}
            placeholder='Enter new password here'
            size={'lg'}
            {...register('password', {
              required: 'This is required',
              pattern: password.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['password']?.message || password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors['password2']} mt={3}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type={'password'}
            variant={'filled'}
            placeholder='Confirm password here'
            size={'lg'}
            {...register('password2', {
              required: 'This is required',
              pattern: password.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['password2']?.message || password.message}
          </FormErrorMessage>
        </FormControl>

        <ModalFooter pr={0} pb={2} mt={3}>
          {!isSubmitting && (
            <Button mr={3} onClick={handleClose}>
              Close
            </Button>
          )}
          <Button
            bg={primary}
            type={'submit'}
            colorScheme={primary}
            isLoading={isSubmitting}
            loadingText={'Processing...'}
          >
            Confirm
          </Button>
        </ModalFooter>
      </form>

      <Alert data={{ ...alertOpts, ...alert, onClose: handleClose }} />
    </>
  );
};

export default ModalInputs;
