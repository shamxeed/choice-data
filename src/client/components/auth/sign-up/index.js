'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link } from '@chakra-ui/next-js';

import { Alert, Asteriq } from '../../Misc';
import { UnAuthenticated } from '../index';
import { colors } from '../../../../constants/themes';
import * as patterns from '../../../utils/patterns';
import { useAuth, useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';
import { SubmitBtn, Label } from '../../Misc/form';
import Container, { SubContainer } from '../Misc';

const SignUp = () => {
  const form = useForm();

  const searchParams = useSearchParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [show, setShow] = React.useState(false);

  const { axios } = useAxios();

  const [alert, setAlert] = React.useState({
    body: '',
    title: '',
  });

  const { setUser } = useAuth();

  const { register, handleSubmit, formState } = form;

  const { errors, isSubmitting } = formState;

  const onSubmit = async (e) => {
    const referred_by = searchParams.get('ref');

    const data = referred_by
      ? {
          ...e,
          referred_by,
        }
      : e;

    try {
      const { user, token, bundles } = await axios({
        url: '/auth/sign-up',
        method: 'POST',
        data,
      });

      localStorage.setItem('token', token);

      setUser(user, bundles);
    } catch (err) {
      const body = errMessage(err);
      setAlert({ title: 'An Error Occured', body });
      onOpen();
    }
  };

  const handleClick = () => setShow(!show);

  return (
    <UnAuthenticated>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <SubContainer minW={['unset', 'unset', '600px']}>
            <Text mb={2} mt={3} fontSize={22} fontWeight={700}>
              Sign Up
            </Text>

            <Text mb={3}>
              Please note that all fields with <Asteriq /> are mandatory!
            </Text>

            <Box
              display={'flex'}
              flexDirection={['column', 'row']}
              justifyContent={'space-between'}
            >
              {/*********** FIRST NAME **********/}
              <Box mt={4} width={['100%', '49%']}>
                <FormControl isInvalid={!!errors['first_name']}>
                  <Label>
                    First Name <Asteriq />
                  </Label>
                  <Input
                    size={'lg'}
                    variant={'filled'}
                    placeholder='Enter your first name'
                    {...register('first_name', {
                      required: 'This is required',
                      maxLength: 15,
                      validate: patterns.name.pattern,
                    })}
                  />
                  <FormErrorMessage>
                    {errors['name']?.message || patterns.name.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              {/*********** LAST NAME **********/}
              <Box mt={4} width={['100%', '49%']} display={'flex'}>
                <FormControl isInvalid={!!errors['last_name']}>
                  <Label>
                    Last Name <Asteriq />
                  </Label>
                  <Input
                    variant={'filled'}
                    placeholder='Enter your last name'
                    size={'lg'}
                    {...register('last_name', {
                      required: 'This is required',
                      maxLength: 15,
                      validate: patterns.name.pattern,
                    })}
                  />
                  <FormErrorMessage>
                    {errors['last_name']?.message || patterns.name.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </Box>

            {/************** EMAIL ADDRESS ***********/}
            <Box mt={4}>
              <FormControl isInvalid={!!errors['email']}>
                <Label>
                  Email <Asteriq />
                </Label>
                <Input
                  size={'lg'}
                  type={'email'}
                  variant={'filled'}
                  placeholder='Enter your email address'
                  {...register('email', {
                    required: 'This is required!',
                    pattern: patterns.email.pattern,
                  })}
                />
                <FormErrorMessage>
                  {errors['email']?.message || patterns.email.message}
                </FormErrorMessage>
              </FormControl>
            </Box>

            <Box
              display={'flex'}
              flexDirection={['column', 'row']}
              justifyContent={'space-between'}
            >
              {/*********** PHONE NUMBER **********/}
              <Box mt={4} width={['100%', '49%']}>
                <FormControl isInvalid={!!errors['phone']}>
                  <Label>
                    Phone <Asteriq />
                  </Label>
                  <Input
                    size={'lg'}
                    type={'phone'}
                    variant={'filled'}
                    maxLength={11}
                    placeholder='Enter your phone number'
                    {...register('phone', {
                      required: 'This is required!',
                      pattern: patterns.mobileNum.pattern,
                    })}
                  />
                  <FormErrorMessage>
                    {errors['phone']?.message || patterns.mobileNum.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              {/************** PASSWORD SECTION **************/}
              <Box mt={4} width={['100%', '49%']}>
                <FormControl isInvalid={!!errors['password']}>
                  <Label>
                    Password <Asteriq />
                  </Label>
                  <InputGroup>
                    <Input
                      size={'lg'}
                      variant={'filled'}
                      type={show ? 'text' : 'password'}
                      placeholder='Enter your password'
                      {...register('password', {
                        required: 'This is required!',
                        pattern: patterns.password.pattern,
                      })}
                    />
                    <InputRightElement width={'4rem'}>
                      <Button
                        onClick={handleClick}
                        size={'lg'}
                        mt={2}
                        bg={'transparent'}
                      >
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors['password']?.message ||
                      patterns.password.shortMessage}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </Box>

            {!errors['password'] && (
              <Text mt={5} mb={1} ml={1} fontSize={'sm'}>
                By registering you agree to our privacy policy and terms &
                conditions.
              </Text>
            )}

            <SubmitBtn
              text={'Sign Up'}
              isLoading={isSubmitting}
              mt={2}
              loadingText={'Processing...'}
              width={['100%', '98%']}
            />

            <Box mb={2} mt={2}>
              <Text>
                Already have an account?{' '}
                <Link href={'/'} color={colors.primary}>
                  Sign In
                </Link>
              </Text>
            </Box>
          </SubContainer>
        </Container>
      </form>

      <Alert
        data={{
          isOpen,
          onClose,
          ...alert,
        }}
      />
    </UnAuthenticated>
  );
};

export default SignUp;
