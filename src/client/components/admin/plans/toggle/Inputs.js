import React from 'react';
import {
  Box,
  Radio,
  Stack,
  Select,
  FormLabel,
  RadioGroup,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import Alert from '../../../Misc/Alert';
import Asteriq from '../../../Misc/Asteriq';
import MyModal from '../../../Misc/Modal';
import { colors } from '@/constants/themes';
import { useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { SubmitBtn } from '../../../Misc/form';
import { networks, providers, types } from '@/constants/Bundles';

const { white } = colors;

const Inputs = () => {
  const form = useForm();

  const { axios, isLoading } = useAxios();

  const [is_disabled, setDisabled] = React.useState(false);

  const [myForm, setMyForm] = React.useState({
    pin: '',
    text: '',
  });

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, reset } = form;

  const { text, ...rest } = myForm;

  const isDisabled = myForm.pin.length <= 3;

  const toggler = () => setDisabled(!is_disabled);

  const handleFormChange = (name, value) => {
    setMyForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = (e) => {
    setMyForm({
      ...e,
      pin: '',
      is_disabled,
      text: `${e.network}-${e.type}`,
    });

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const toggleBundle = async () => {
    try {
      const { api_response } = await axios({
        url: '/admin/plan/toggle',
        method: 'post',
        data: rest,
      });

      setAlert({
        type: 'success',
        title: 'Transaction Successful!',
        body: api_response,
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
      <Box bg={white} borderRadius={10} p={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*************** PROVIDER SECTION ********************/}
          <FormLabel fontWeight={700} mt={4}>
            Provider <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={'--Select Provider Here--'}
            {...register('provider', {})}
          >
            {providers.map(({ id, title, value }) => (
              <option key={id} value={value}>
                {title}
              </option>
            ))}
          </Select>

          {/*************** NETWORK SECTION ********************/}
          <FormLabel fontWeight={700} mt={4}>
            Network <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={'--Select Network Here--'}
            {...register('network', {})}
          >
            {networks.map(({ id, value }) => (
              <option value={value} key={id}>
                {value}
              </option>
            ))}
          </Select>

          {/*************** TYPE SECTION ********************/}
          <FormLabel fontWeight={700} mt={4}>
            type <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            placeholder={`--Select type here--`}
            {...register('type', {
              required: 'This is required!',
            })}
          >
            {types.map(({ title, value }) => (
              <option key={value} value={value}>
                {title}
              </option>
            ))}
          </Select>

          {/*************** DISABLED SECTION ********************/}

          <RadioGroup onChange={toggler} value={is_disabled}>
            <Stack direction='row' mt={5}>
              <Radio value={true} size={'lg'}>
                Disabled
              </Radio>
              <Radio value={false} size={'lg'}>
                Enabled
              </Radio>
            </Stack>
          </RadioGroup>

          <SubmitBtn />
        </form>
      </Box>

      <MyModal
        withFooter
        data={{
          isOpen,
          onClose,
          text,
          isLoading,
          txt: `${is_disabled ? 'disabled' : 'enable'}`,
          btnProps: {
            isDisabled,
            onClick: toggleBundle,
          },
          onChange: (e) => handleFormChange('pin', e),
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
