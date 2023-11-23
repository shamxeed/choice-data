import React from 'react';
import { Box, FormLabel, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { colors } from '@/constants/themes';
import { useConfig } from '@/client/hooks/helpers';
import { SubmitBtn } from '../../Misc/form';
import { inputs } from './helpers';

const { white } = colors;

const Inputs = () => {
  const form = useForm();

  const { config, update, isLoading } = useConfig();

  const { register, handleSubmit, setValue } = form;

  const onSubmit = async (e) => update(e);

  React.useEffect(() => {
    Object.keys(config).forEach((key) => {
      setValue(key, config[key]);
    });
  }, []);

  return (
    <Box bg={white} borderRadius={10} p={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((key) => (
          <>
            <FormLabel fontWeight={700} mt={4}>
              {key}
            </FormLabel>
            <Input
              size={'lg'}
              placeholder={`--Enter ${key} Here--`}
              {...register(key, {})}
            />
          </>
        ))}
        <SubmitBtn text={'Submit'} isLoading={isLoading} />
      </form>
    </Box>
  );
};

export default Inputs;
