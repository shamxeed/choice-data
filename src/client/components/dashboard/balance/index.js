import React from 'react';
import { Box } from '@chakra-ui/react';
import { IoDownload, IoTime, IoRefreshCircle } from 'react-icons/io5';

import { colors } from '@/constants/themes';
import { useAuth, useConfig } from '@/client/hooks/helpers';

import Balance from './Balance';
import MyLink from './MyLink';
import Container from './Container';

const { primary } = colors;

const Index = () => {
  const { user } = useAuth();

  const { config } = useConfig();

  const { whatsapp_group } = config;

  return (
    <Container>
      <Balance user={user} />

      <Box
        mt={4}
        display={'flex'}
        justifyContent={'space-evenly'}
        alignItems={'center'}
      >
        <MyLink icon={<IoDownload color={primary} size={20} />} />

        <MyLink
          mr={'-3px'}
          btnText={'Wallet Summary'}
          href={'/dashboard/wallet/summary'}
          icon={<IoTime color={primary} size={20} />}
        />

        <MyLink
          mr={'-5px'}
          btnText={'Request Refund'}
          href={whatsapp_group}
          target={'_blank'}
          icon={<IoRefreshCircle color={primary} size={21} />}
        />
      </Box>
    </Container>
  );
};

export default Index;
