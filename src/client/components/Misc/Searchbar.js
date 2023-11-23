import React from 'react';
import { Box, Button, Input } from '@chakra-ui/react';

import { colors } from '@/constants/themes';
import { useForm } from 'react-hook-form';

const { white, primary } = colors;

const Searchbar = ({ onSubmit, ...props }) => {
  const form = useForm();

  const { register, handleSubmit, formState } = form;

  const { isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        p={2}
        mb={3}
        mt={3}
        bg={white}
        borderRadius={5}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
        }}
      >
        <Input
          type={'number'}
          variant={'filled'}
          placeholder={'Enter mobile number'}
          {...props}
          {...register('query', {
            required: 'This is required!',
          })}
        />
        <Button
          ml={2}
          type={'submit'}
          isLoading={isSubmitting}
          colorScheme={primary}
          bg={primary}
        >
          Search
        </Button>
      </Box>
    </form>
  );
};

export default Searchbar;
