import React from 'react';
import { useRouter } from 'next/navigation';

import { Box, Text, IconButton, useDisclosure } from '@chakra-ui/react';

import { MdMenu } from 'react-icons/md';

import { useAuth } from '../hooks/helpers/index';
import { colors } from '@/constants/themes';
import MyDrawer from '../components/Misc/Drawer';
import MyMenu from '../components/Misc/Menu';
import Logo from './Logo';

const { primary } = colors;

const Header = () => {
  const router = useRouter();

  const btnRef = React.useRef();

  const { loadUser, user } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { first_name } = user || {};

  const navigateToDashboard = () => router.push('/dashboard');

  React.useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <Box
        p={2}
        left={0}
        right={0}
        h={'60px'}
        w={'100%'}
        display={'flex'}
        bg={colors.white}
        position={'fixed'}
        alignItems={'center'}
        justifyContent={'space-between'}
        zIndex={1000}
      >
        <IconButton
          ref={btnRef}
          onClick={onOpen}
          icon={<MdMenu size={25} color={primary} />}
        />

        <Box display={'flex'} alignItems={'center'}>
          <Logo size={28} />
          <Text
            ml={2}
            fontSize={23}
            cursor={'pointer'}
            fontWeight={700}
            color={primary}
            onClick={navigateToDashboard}
          >
            ChoiceData
          </Text>
        </Box>

        <MyMenu />
      </Box>

      <MyDrawer
        data={{
          isOpen,
          onClose,
          btnRef,
          user,
          title: first_name,
        }}
      />
    </div>
  );
};

export default Header;
