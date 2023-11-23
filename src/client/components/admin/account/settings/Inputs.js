import React from 'react';
import {
  Input,
  Select,
  FormLabel,
  useDisclosure,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Asteriq, Alert, MyModal, Form } from '../../../Misc';

import { email } from '@/client/utils/patterns';
import { useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { actions } from './helpers';

const Inputs = () => {
  const form = useForm();

  const { axios, isLoading } = useAxios();

  const [value, setValue] = React.useState('');

  const [myForm, setMyForm] = React.useState({
    pin: '',
    text: '',
  });

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const alertDisclosure = useDisclosure();

  const { register, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const { text, ...rest } = myForm;

  const isDisabled = myForm.pin.length <= 3;

  const formHandler = (name, value) => {
    setMyForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = (e) => {
    let text;
    let field = 'role';
    let new_value = value;

    const upgrade_options = ['MODERATOR', 'API', 'Reseller'];

    if (upgrade_options.includes(value)) {
      text = `"Upgrade ${e.email} to ${value}"`;
    } else if (value === 'User') {
      text = `"Downgrade ${e.email} to ${value}"`;
    } else if (value === 'BLOCKED') {
      text = `"Block ${e.email}."`;
    } else {
      field = 'is_email_verified';
      new_value = true;
      text = `"Manual Email Verification on ${e.email}."`;
    }

    setMyForm({
      ...e,
      field,
      text,
      pin: '',
      value: new_value,
    });

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const updateUser = async () => {
    try {
      const { api_response } = await axios({
        url: '/admin/account/settings',
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
      setAlert({
        type: 'error',
        body,
      });
    } finally {
      alertDisclosure.onOpen();

      reset();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Form.Container>
          <FormLabel fontWeight={700} mt={1}>
            Actions<Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            size={'lg'}
            isRequired
            placeholder={'--Select Role here--'}
            onChange={(e) => setValue(e.target.value)}
          >
            {actions.map(({ value, title, id }) => (
              <option value={value} key={id}>
                {title}
              </option>
            ))}
          </Select>

          <FormControl isInvalid={!!errors['email']}>
            <FormLabel fontWeight={700} mt={4}>
              User's Email<Asteriq>*</Asteriq>
            </FormLabel>
            <Input
              size={'lg'}
              placeholder={"--Enter User's Email address here--"}
              {...register('email', {
                required: 'This is required!',
                pattern: email.pattern,
              })}
            />
            <FormErrorMessage>
              {errors['email']?.message || email.message}
            </FormErrorMessage>
          </FormControl>

          <Form.SubmitBtn />
        </Form.Container>
      </form>

      <MyModal
        withFooter
        data={{
          isOpen,
          onClose,
          text,
          isLoading,
          txt: 'perform this action',
          btnProps: {
            isDisabled,
            onClick: updateUser,
          },
          onChange: (e) => formHandler('pin', e),
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
