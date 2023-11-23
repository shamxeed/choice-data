import React from 'react';
import {
  Box,
  Select,
  FormLabel,
  useDisclosure,
  AlertDialogBody,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Alert, Asteriq, MyModal } from '../../../Misc';
import { colors } from '@/constants/themes';
import { data_card_plans } from '@/constants/Bundles';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { SubmitBtn } from '../../../Misc/form';
import { Pin } from '../../../Misc/Pin';
import { getPlans } from '@/client/utils/plan';
import { networks } from './helpers';

const { white } = colors;

const Inputs = () => {
  const form = useForm();

  const { user, bundles, setUser } = useAuth();

  const { axios, isLoading } = useAxios();

  const [myForm, setMyForm] = React.useState({
    pin: '',
    plan_id: '',
    network: '',
    text: '',
  });

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit } = form;

  const { text, network } = myForm;

  const { transaction_pin, balance, id: myId } = user || {};

  const isDisabled = myForm.pin.length <= 3;

  const plans = getPlans({ plans: bundles, network, type: 'data_card' });

  const handleFormChange = (value) => {
    setMyForm((form) => ({ ...form, pin: value }));
  };

  const onSubmit = (e) => {
    const plan_id = Number(e.plan);

    const quantity = Number(e.quantity);

    const { title, amount, plan, id } = plans.find((i) => i.id === plan_id);

    if (amount > balance) {
      setAlert({
        title: 'Insufficient Balance!',
        body: 'You do not have enough balance, please fund your wallet and try again.',
      });

      return alertDisclosure.onOpen();
    } else if (!transaction_pin) {
      setAlert({
        title: 'Transaction Pin Required!',
        body: 'Please set your transaction pin to perform this transaction.',
      });

      return alertDisclosure.onOpen();
    }

    setMyForm((prev) => ({
      ...prev,
      id,
      plan,
      myId,
      quantity,
      text: `(${title}) x ${quantity}`,
    }));

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const buyBundle = async () => {
    try {
      const { api_response, userData, pin } = await axios({
        url: '/transaction/data/card',
        method: 'post',
        data: myForm,
      });

      if (userData) {
        setUser(userData);
      }

      setAlert({
        type: 'success',
        title: 'Transaction Successful!',
        myBody: (
          <AlertDialogBody textAlign={'center'}>
            {api_response} <Pin pin={pin} />
          </AlertDialogBody>
        ),
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
        <Box bg={white} borderRadius={10} p={3}>
          <FormLabel fontWeight={700} mt={1}>
            Network<Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            placeholder={'--Select Network--'}
            isReadOnly
            size={'lg'}
            onChange={({ target }) =>
              setMyForm((prev) => ({ ...prev, network: target.value }))
            }
          >
            {networks.map(({ value, id }) => (
              <option key={id} value={value}>
                {value}
              </option>
            ))}
          </Select>

          <FormLabel fontWeight={700} mt={4}>
            Plan <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={
              network ? '--Select Plan Here--' : '--Select Network First--'
            }
            {...register('plan', {})}
          >
            {plans.map(({ id, title }) => (
              <option value={id} key={id}>
                {title}
              </option>
            ))}
          </Select>

          <FormLabel fontWeight={700} mt={4}>
            Quantity <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            name={'quantity'}
            // placeholder={'--Select Quantity Here--'}
            {...register('quantity', {})}
          >
            <option value={1}>1</option>
          </Select>

          <SubmitBtn />
        </Box>
      </form>

      <MyModal
        withFooter
        data={{
          isOpen,
          onClose,
          text,
          isLoading,
          btnProps: {
            isDisabled,
            onClick: buyBundle,
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
    </div>
  );
};

export default Inputs;
