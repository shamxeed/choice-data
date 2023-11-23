'use client';

import React from 'react';
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

import { Alert } from '../../Misc';
import { UnAuthenticated } from '../index';
import { colors } from '../../../../constants/themes';
import * as patterns from '../../../utils/patterns';
import * as hooks from '@/client/hooks/helpers/index';
import { errMessage } from '@/client/utils/helpers';
import { Label, SubmitBtn } from '../../Misc/form';
import Container, { SubContainer } from '../Misc';
import { postMessageWebView } from '@/client/utils/webview';
import Logo from '@/client/layouts/Logo';

const { primary } = colors;

const SignIn = () => {
  const form = useForm();

  const { success } = hooks.useToast();

  const { axios } = hooks.useAxios();

  const [show, setShow] = React.useState(false);

  const [alert, setAlert] = React.useState({
    body: '',
  });

  const { setUser } = hooks.useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { register, handleSubmit, formState } = form;

  const { errors, isSubmitting } = formState;

  const onSubmit = async (e) => {
    try {
      const { user, token, bundles } = await axios({
        url: '/auth/sign-in',
        method: 'post',
        data: e,
      });

      setUser(user, bundles);

      localStorage.setItem('token', token);

      postMessageWebView('token', token);

      success({ description: "You've successfully logged-in!" });
    } catch (err) {
      const body = errMessage(err);
      setAlert({ body });
      onOpen();
    }
  };

  const handleClick = () => setShow(!show);

  return (
    <UnAuthenticated>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Logo mb={2} />

          <SubContainer>
            <Text mb={2} fontSize={22} fontWeight={700}>
              Sign In
            </Text>

            <FormControl isInvalid={!!errors['email']}>
              <Label>Email Address</Label>
              <Input
                size={'lg'}
                type='email'
                variant={'filled'}
                placeholder='Enter your email address'
                {...register('email', {
                  required: 'This is required',
                  pattern: patterns.email.pattern,
                })}
              />
              <FormErrorMessage>
                {errors['email']?.message || patterns.email.message}
              </FormErrorMessage>
            </FormControl>

            {/* PASSWORD SECTION */}
            <FormControl isInvalid={!!errors['password']} mt={2.5}>
              <Label>Password</Label>
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
                    mt={2}
                    size={'lg'}
                    bg={'transparent'}
                    onClick={handleClick}
                  >
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors['password']?.message || patterns.password.shortMessage}
              </FormErrorMessage>
            </FormControl>

            <Box mt={2} ml={1}>
              <Link href={'/auth/change-password'} color={primary}>
                Forgot Password?
              </Link>
            </Box>

            <SubmitBtn
              text={'Sign In'}
              isLoading={isSubmitting}
              loadingText={'Authenticating...'}
              mt={5}
            />

            <Box mt={2} mb={2}>
              <Text>
                New to Saukie?{' '}
                <Link href={'/auth/sign-up'} color={primary}>
                  Sign Up
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

export default SignIn;
