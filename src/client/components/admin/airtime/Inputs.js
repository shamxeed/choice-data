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

import Alert from '../../Misc/Alert';
import Asteriq from '../../Misc/Asteriq';
import MyModal from '../../Misc/Modal';
import { colors } from '@/constants/themes';
import { useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { SubmitBtn } from '../../Misc/form';
import { networks } from '@/constants/Bundles';

const { white } = colors;

const Inputs = () => {
  const form = useForm();

  const { axios, isLoading } = useAxios();

  const [action, setAction] = React.useState('enable');

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

  const { register, handleSubmit } = form;

  const { text, title, ...rest } = myForm;

  const isDisabled = myForm.pin.length <= 3;

  const toggler = (e) => setAction(e);

  const handleFormChange = (name, value) => {
    setMyForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = (e) => {
    const { id } = networks.find((i) => i.value === e.title);

    setMyForm({
      ...e,
      id,
      pin: '',
      text: `${e.title} Airtime`,
    });

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const update = async () => {
    let response;

    try {
      if (action === 'delete') {
        const { api_response } = await axios({
          url: '/admin/plan/delete',
          method: 'post',
          data: rest,
        });

        response = api_response;
      } else {
        const is_disabled = !!(action === 'disbale');

        const { api_response } = await axios({
          url: '/admin/airtime/update',
          method: 'post',
          data: { ...rest, is_disabled, title, type: 'airtime' },
        });

        response = api_response;
      }

      setAlert({
        type: 'success',
        title: 'Transaction Successful!',
        body: response,
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
      <Box bg={white} borderRadius={10} p={3}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*************** NETWORK SECTION ********************/}
          <FormLabel fontWeight={700} mt={4}>
            Network <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={'--Select Network Here--'}
            {...register('title', {})}
          >
            {networks.map(({ id, value }) => (
              <option value={value} key={id}>
                {value}
              </option>
            ))}
          </Select>

          {/*************** DISABLED SECTION ********************/}
          <FormLabel fontWeight={700} mt={4}>
            Action <Asteriq>*</Asteriq>
          </FormLabel>
          <RadioGroup onChange={toggler} value={action}>
            <Stack
              m={2}
              mt={3}
              direction={'row'}
              style={{
                justifyContent: 'space-between',
              }}
            >
              <Radio value={'disbale'} size={'lg'}>
                Disable
              </Radio>

              <Radio value={'enable'} size={'lg'}>
                Enable
              </Radio>

              <Radio value={'delete'} size={'lg'}>
                Delete
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
          txt: action === 'delete' ? 'delete' : 'create/update',
          btnProps: {
            isDisabled,
            onClick: update,
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
