import React from 'react';
import {
  Box,
  Select,
  FormLabel,
  Input,
  useDisclosure,
  FormControl,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import Alert from '../../Misc/Alert';
import Asteriq from '../../Misc/Asteriq';
import MyModal from '../../Misc/Modal';
import { colors } from '@/constants/themes';
import { data_card_plans } from '@/constants/Bundles';
import { useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { SubmitBtn } from '../../Misc/form';

const { white } = colors;

const Inputs = () => {
  const form = useForm();

  const { axios, isLoading } = useAxios();

  const [myForm, setMyForm] = React.useState({
    pin: '',
    plan_id: '',
    mobileNumber: '',
    text: '',
  });

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState } = form;

  const { text, ...rest } = myForm;

  const { errors } = formState;

  const isDisabled = myForm.pin.length <= 3;

  const handleFormChange = (value) => {
    setMyForm((form) => ({ ...form, pin: value }));
  };

  const onSubmit = (e) => {
    const plan_id = Number(e.plan);
    const pins = e.pins;

    setMyForm({
      pins,
      plan_id,
      text: pins,
      pin: Number,
    });

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const loadPins = async () => {
    try {
      const { msg } = await axios({
        url: '/transaction/data/card/load',
        method: 'post',
        data: rest,
      });

      setAlert({
        type: 'success',
        title: 'Transaction Successful!',
        body: msg,
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
          <FormLabel fontWeight={700} mt={4}>
            Plan <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={'--Select Plan Here--'}
            {...register('plan', {})}
          >
            {data_card_plans.map(({ id, title }) => (
              <option value={id} key={id}>
                {title}
              </option>
            ))}
          </Select>

          <FormControl isInvalid={errors['pins']}>
            <FormLabel fontWeight={700} mt={4}>
              Pins <Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              placeholder={'--Enter Pins Here--'}
              {...register('pins', {
                required: 'This is required!',
              })}
            />
          </FormControl>

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
          txt: 'load MTN Data Card Pins',
          btnProps: {
            isDisabled,
            onClick: loadPins,
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
