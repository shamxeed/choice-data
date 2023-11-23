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

import { email } from '@/client/utils/patterns';
import { colors } from '@/constants/themes';
import Alert from './Alert';
import * as hooks from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';

const { primary } = colors;

const SuperLoginInputs = ({ data: { form, onClose } }) => {
  const { onOpen, ...alertOpts } = useDisclosure();

  const [alert, setAlert] = React.useState({});

  const { axios } = hooks.useAxios();
  const { success } = hooks.useToast();
  const { user, setUser } = hooks.useAuth();

  const { register, handleSubmit, formState, reset } = form;

  const { errors, isSubmitting } = formState;

  const { email: myEmail } = user;

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (e) => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/admin/login',
        data: { ...e, myEmail },
      });

      const { user, token, bundles } = response;

      setUser(user, bundles);

      localStorage.clear();
      localStorage.setItem('token', token);

      success({ description: "You've successfully logged-in!" });
    } catch (err) {
      const errMsg = errMessage(err);
      setAlert({
        body: errMsg,
      });

      onOpen();
    } finally {
      reset();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors['email']}>
          <FormLabel>User's Email Address</FormLabel>
          <Input
            type='email'
            variant={'filled'}
            placeholder="Enter user's email address"
            size={'lg'}
            {...register('email', {
              required: 'This is required',
              pattern: email.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['email']?.message || email.message}
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

      <Alert data={{ ...alertOpts, ...alert, onClose: handleClose }} />
    </>
  );
};

export default SuperLoginInputs;
