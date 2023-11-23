'use client';

import React from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import { colors } from '../../../constants/themes';
import Balance from './balance/index';
import Statistics from './Statistics';
import Referal from './Referal';
import Support from './Support';

import * as hooks from '@/client/hooks/helpers';
import MyGrid from '@/client/layouts/Grid';
import { dashBtnsOpts } from '@/constants/Data';
import Heading from '@/client/layouts/Heading';
import { Alert } from '../Misc';
import { Link } from '@chakra-ui/next-js';

let showAlert = true;

const Dashboard = () => {
  const { onLoad } = hooks.useAccount();

  const { user } = hooks.useAuth();

  const { config } = hooks.useConfig();

  const { first_name } = user || {};

  const onMount = React.useRef(true);

  const [name, setName] = React.useState('User');

  const { onOpen, ...alertDisclosure } = useDisclosure();

  const greetings = first_name ? `Hi ${first_name},` : 'Hi,';

  const { notification, link, ...support } = config;

  const getName = () => {
    const localName = localStorage.getItem('name');

    if (localName) {
      setName(localName);
    } else if (first_name) {
      localStorage.setItem('name', first_name);
    }

    showAlert = false;

    setTimeout(() => {
      onOpen();
    }, 2000);
  };

  React.useEffect(() => {
    if (onMount.current) {
      onMount.current = false;
      onLoad();
    }
  }, []);

  React.useEffect(() => {
    if (showAlert) {
      getName();
    }
  }, [first_name, showAlert]);

  return (
    <>
      <Box p={2.5} bg={colors.bg} minH={'100vh'} ml={1.5} mr={1.5}>
        <Box>
          <Balance />

          <Heading color={'rgba(0,0,0, 0.7)'} mb={2} fontSize={'15px'}>
            {greetings} what do you want to do today?
          </Heading>
          <MyGrid list={dashBtnsOpts} />
        </Box>
        <Statistics />
        <Box display={['unset', 'flex']} justifyContent={'space-between'}>
          <Referal />
          <Support support={support} />
        </Box>
      </Box>

      {notification && (
        <Alert
          data={{
            ...alertDisclosure,
            type: 'success',
            title: `Dear, ${name}!`,
            body: notification,
            btn: link ? (
              <Link href={link} ml={3}>
                <Button colorScheme={'green'}>Download</Button>
              </Link>
            ) : null,
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
