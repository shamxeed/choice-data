import React from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  ModalFooter,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { pin, password } from '@/client/utils/patterns';
import { colors } from '@/constants/themes';
import Alert from './Alert';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { useForm } from 'react-hook-form';

const { primary } = colors;

const TransactionPinInputs = ({ data: { onClose } }) => {
  const form = useForm();

  const { onOpen, ...alertOpts } = useDisclosure();

  const [alert, setAlert] = React.useState({});

  const { axios } = useAxios();

  const { user, setUser } = useAuth();

  const { email, id } = user || {};

  const { register, handleSubmit, formState, reset } = form;

  const { errors, isSubmitting } = formState;

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (e) => {
    try {
      const { user, msg } = await axios({
        url: '/transaction/pin',
        method: 'POST',
        data: { ...e, email, myId: id },
      });

      setUser(user);

      setAlert({
        type: 'success',
        title: 'Pin Changed Successful',
        body: msg,
      });
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body });
    }

    onOpen();
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors['password']}>
          <FormLabel>Password</FormLabel>
          <Input
            id='password'
            type='password'
            variant={'filled'}
            placeholder='Enter your password'
            size={['md', 'lg']}
            {...register('password', {
              required: 'This is required',
              pattern: password.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['password']?.message || password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors['pin']} mt={2}>
          <FormLabel>New Pin</FormLabel>
          <Input
            id='pin'
            type={'number'}
            variant={'filled'}
            placeholder='Enter new pin here'
            size={['md', 'lg']}
            {...register('pin', {
              required: 'This is required',
              validate: pin.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['pin']?.message || pin.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors['confirmPin']} mt={2}>
          <FormLabel>Confirm Pin</FormLabel>
          <Input
            id='confirmPin'
            type={'number'}
            variant={'filled'}
            placeholder='Confirm new pin'
            size={['md', 'lg']}
            {...register('confirmPin', {
              required: 'This is required',
              validate: pin.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['confirmPin']?.message || pin.message}
          </FormErrorMessage>
        </FormControl>

        <ModalFooter pr={0} pb={2} mt={2}>
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

      <Alert data={{ ...alertOpts, ...alert, onClose }} />
    </>
  );
};

export default TransactionPinInputs;
