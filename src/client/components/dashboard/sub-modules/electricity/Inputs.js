import React from 'react';
import {
  Text,
  Input,
  Select,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Alert, Asteriq, MyModal } from '../../../Misc';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import {
  debitInProgress,
  errMessage,
  getCustomerId,
} from '@/client/utils/helpers';
import { thousand } from '@/client/utils/patterns';
import { SubmitBtn, Container } from '../../../Misc/form';
import Spinner from '../../../Misc/Spinner';
import { getPlansByType } from '@/client/utils/plan';

const Inputs = () => {
  const form = useForm();

  const { user, bundles, setUser } = useAuth();

  const { axios, isLoading } = useAxios();

  const [myForm, setMyForm] = React.useState({
    pin: '',
    text: '',
    service: 'Electricity Recharge',
  });

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState, getValues } = form;

  const { errors } = formState;

  const { text, ...rest } = myForm;

  const { id: myId, transaction_pin, balance, first_name } = user || {};

  const isDisabled = myForm.pin.length <= 3;

  const plans = getPlansByType({ plans: bundles, type: 'electricity' });

  const handleFormChange = (value) => {
    setMyForm((form) => ({ ...form, pin: value }));
  };

  const onSubmit = async (e) => {
    if (!transaction_pin) {
      setAlert({
        title: 'Transaction Pin Required!',
        body: 'Please set your transaction pin to perform this transaction.',
      });

      return alertDisclosure.onOpen();
    } else if (e.amount > balance) {
      setAlert({
        title: 'Insufficient Balance!',
        body: 'You do not have enough balance, please fund your wallet and try again.',
      });

      return alertDisclosure.onOpen();
    }

    const disco = plans.find((i) => i.title === e.service);

    const { plan_id: disco_id } = disco;

    try {
      const { data } = await axios({
        url: '/transaction/electricity/validate',
        method: 'POST',
        data: { ...e, disco_id },
      });

      const { name } = data;

      const ref = getCustomerId(first_name);

      setMyForm((prev) => ({
        ...e,
        ...prev,
        ...details,
        ref,
        myId,
        disco_id,
        text: `with this meter number ${e.meter_number} ${name} at ${e.amount}`,
      }));

      onOpen();
    } catch (err) {
      const body = errMessage(err);

      setAlert({ body });

      alertDisclosure.onOpen();
    }
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const rechargeElectricy = async () => {
    try {
      const { userData } = await axios({
        url: '/transaction/electricity',
        data: rest,
        method: 'post',
      });

      setUser(userData);

      setAlert({
        type: 'success',
        title: 'Transaction Successful!',
        body: `Your request to purchase ${text} is successful!`,
      });
    } catch (err) {
      const body = errMessage(err);

      debitInProgress({ body, setAlert, axios, data: rest });
    } finally {
      alertDisclosure.onOpen();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <FormLabel fontWeight={700} mt={1}>
            Disco Name<Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            placeholder={'--Select Disco Here--'}
            {...register('service', {
              required: 'This is required!',
            })}
          >
            {plans.map(({ id, title, value }) => (
              <option value={value} key={id}>
                {title}
              </option>
            ))}
          </Select>

          <FormControl isInvalid={!!errors['meter_number']}>
            <FormLabel fontWeight={700} mt={4}>
              Meter Number<Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'number'}
              placeholder={'Enter meter number here'}
              {...register('meter_number', {
                required: 'This is required!',
              })}
            />
            <FormErrorMessage>
              {errors['meter_number']?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors['meter_type']}>
            <FormLabel fontWeight={700} mt={4}>
              Meter Type <Asteriq>*</Asteriq>
            </FormLabel>
            <Select
              size={'lg'}
              placeholder={'--Select Meter Type Here--'}
              {...register('meter_type', {
                required: 'This is required!',
              })}
            >
              <option>Prepaid</option>
              <option>Postpaid</option>
            </Select>
            <FormErrorMessage>{errors['meter_type']?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors['amount']}>
            <FormLabel fontWeight={700} mt={4}>
              Amount <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              type={'number'}
              name={'amount'}
              placeholder={'Enter amount here'}
              {...register('amount', {
                required: 'This is required!',
                validate: thousand.pattern,
              })}
            />

            <FormErrorMessage>
              {errors['amount']?.message || thousand.message}
            </FormErrorMessage>
          </FormControl>

          <Text color={'gray.600'} fontSize={'sm'} mt={2}>
            Amount must not be less than ₦1,000 & You'll be charged ₦50 for this
            service
          </Text>

          <SubmitBtn text={'Validate'} />
        </Container>
      </form>

      <MyModal
        withFooter
        data={{
          isOpen,
          onClose,
          text,
          txt: `recharge elctricity ${getValues('meter_type')}`,
          isLoading,
          btnProps: {
            isDisabled,
            onClick: rechargeElectricy,
          },
          onChange: handleFormChange,
        }}
      />
      <Alert
        data={{
          ...alert,
          ...alertDisclosure,
          onClose: handleClose,
        }}
      />

      {isLoading && (
        <Spinner text={'Validating meter details, please wait...'} isElect />
      )}
    </div>
  );
};

export default Inputs;
