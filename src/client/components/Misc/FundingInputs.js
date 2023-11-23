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

import { amount, pin, mobileNum } from '@/client/utils/patterns';
import { colors } from '@/constants/themes';
import Alert from './Alert';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';

const { primary } = colors;

const FundingInputs = ({ data: { form, onClose } }) => {
  const { onOpen, ...alertOpts } = useDisclosure();

  const [alert, setAlert] = React.useState({});

  const { axios } = useAxios();

  const { user } = useAuth();

  const { register, handleSubmit, formState, reset } = form;

  const { errors, isSubmitting } = formState;

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = async (e) => {
    if (!user.transaction_pin) {
      setAlert({
        title: 'Set Transaction Pin',
        body: 'You must set transaction pin to perform this transaction!!',
      });

      return onOpen();
    }

    if (user.transaction_pin !== e.pin) {
      setAlert({
        title: 'Incorrect Transaction Pin',
        body: 'Transaction pin you typed is incorrect!',
      });

      return onOpen();
    }

    try {
      const { api_response } = await axios({
        method: 'POST',
        url: '/transaction/funding/manual',
        data: e,
      });
      setAlert({
        type: 'success',
        title: 'Transaction Successful',
        body: api_response,
      });
    } catch (err) {
      const errMsg = errMessage(err);
      setAlert({
        body: errMsg,
      });
    }

    onOpen();
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors['phone']}>
          <FormLabel>Customer's Phone</FormLabel>
          <Input
            type='number'
            variant={'filled'}
            placeholder="Enter customer's phone address"
            size={'lg'}
            {...register('phone', {
              required: 'This is required',
              validate: mobileNum.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['phone']?.message || mobileNum.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors['amount']} mt={2}>
          <FormLabel>Amount (₦)</FormLabel>
          <Input
            type={'number'}
            variant={'filled'}
            placeholder='Enter amount'
            size={'lg'}
            {...register('amount', {
              required: 'This is required',
              validate: amount.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['amount']?.message || amount.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors['pin']} mt={2}>
          <FormLabel>Transaction Pin</FormLabel>
          <Input
            type={'password'}
            variant={'filled'}
            placeholder='Enter your transaction pin'
            size={'lg'}
            {...register('pin', {
              required: 'This is required',
              validate: pin.pattern,
            })}
          />
          <FormErrorMessage>
            {errors['pin']?.message || pin.message}
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

export default FundingInputs;
