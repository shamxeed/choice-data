import React from 'react';
import {
  Box,
  Input,
  Radio,
  Stack,
  Select,
  FormLabel,
  RadioGroup,
  FormControl,
  useDisclosure,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import Alert from '../../../Misc/Alert';
import Asteriq from '../../../Misc/Asteriq';
import MyModal from '../../../Misc/Modal';
import { colors } from '@/constants/themes';
import { useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { SubmitBtn } from '../../../Misc/form';
import * as constants from '@/constants/Bundles';
import {
  defaultForm,
  getPlan,
  services,
  types_opt,
  defaultPlans,
  findPlanById,
} from './helpers';

const { white } = colors;

let _service;

let prev_type;
let prev_plan_id;

const Inputs = ({ data }) => {
  const form = useForm();

  const { axios, isLoading } = useAxios();

  const [is_disabled, setDisabled] = React.useState(false);

  const [provider, setProvider] = React.useState();

  const [plans, setPlans] = React.useState([]);

  const [plan, setPlan] = React.useState(defaultPlans);

  const [myForm, setMyForm] = React.useState(defaultForm);

  const [alert, setAlert] = React.useState({
    title: '',
    body: '',
    type: '',
  });

  const alertDisclosure = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState, setValue, reset, watch } = form;

  const { text, service } = myForm;

  const { errors } = formState;

  const values = watch(['type', 'plan_id']) || [];

  const [type, plan_id] = values;

  const isDisabled = myForm.pin.length <= 3;

  const toggler = () => setDisabled(!is_disabled);

  const formHandler = (name, value) => {
    setMyForm((form) => ({ ...form, [name]: value }));
  };

  const onSubmit = (e) => {
    const amount = Number(e.amount);

    setMyForm({
      ...e,
      amount,
      pin: '',
      provider,
      is_disabled,
      text: `${_service}/${e.title}`,
    });

    onOpen();
  };

  const handleClose = () => {
    onClose();
    alertDisclosure.onClose();
  };

  const updatePrice = async () => {
    try {
      const { api_response, data } = await axios({
        url: '/admin/plan/update',
        method: 'post',
        data: myForm,
      });

      setPlans(data);

      setAlert({
        type: 'success',
        title: 'Transaction Successful!',
        body: api_response,
      });
    } catch (err) {
      const body = errMessage(err);
      setAlert({ body });
    } finally {
      alertDisclosure.onOpen();
      reset();
    }
  };

  React.useEffect(() => {
    if (plan) {
      Object.keys(plan).forEach((key) => {
        setValue(key, plan[key]);
      });
    }
  }, [plan]);

  React.useEffect(() => {
    setPlans(data);
  }, [data]);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      const options = {
        type,
        plan_id,
        bundles: plans,
      };

      if (type && plan_id) {
        const isSame = prev_plan_id === plan_id;

        if (type !== prev_type || !isSame) {
          prev_type = type;
          prev_plan_id = plan_id;

          const selected = findPlanById(options);

          if (selected) {
            setPlan(selected);
          } else {
            const { plan_id, ..._plan } = defaultPlans;

            setPlan(() => ({ ..._plan }));
          }
        }
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [type, plan_id]);

  return (
    <>
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
            onChange={(e) => setProvider(e.target.value)}
          >
            {constants.providers.map(({ id, title, value }) => (
              <option key={id} value={value}>
                {title}
              </option>
            ))}
          </Select>

          {/*************** NETWORK SECTION ********************/}
          <FormLabel fontWeight={700} mt={4}>
            Service <Asteriq>*</Asteriq>
          </FormLabel>
          <Select
            isRequired
            size={'lg'}
            placeholder={'--Select Service Here--'}
            onChange={({ target }) => {
              formHandler('service', target.value);
              _service = target.value;
            }}
          >
            {services.map(({ id, value }) => (
              <option value={value} key={id}>
                {value}
              </option>
            ))}
          </Select>

          {/*************** TYPE SECTION ********************/}
          {service && (
            <>
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
                {types_opt[service].map(({ title, value }) => (
                  <option key={value} value={value}>
                    {title}
                  </option>
                ))}
              </Select>
            </>
          )}

          {type && (
            <>
              {/*************** PLAN SECTION ********************/}
              {getPlan().map((key) => (
                <FormControl isInvalid={errors[key]} key={key}>
                  <FormLabel fontWeight={700} mt={4}>
                    {key} <Asteriq>*</Asteriq>
                  </FormLabel>
                  <Input
                    size={'lg'}
                    placeholder={`--Enter ${key} here--`}
                    {...register(key, {
                      required: 'This is required!',
                    })}
                  />
                  <FormErrorMessage>{errors[key]?.message}</FormErrorMessage>
                </FormControl>
              ))}

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
            </>
          )}

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
          txt: 'update ',
          btnProps: {
            isDisabled,
            onClick: updatePrice,
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
    </>
  );
};

export default Inputs;
