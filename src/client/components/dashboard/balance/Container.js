import { Box } from '@chakra-ui/react';

import { colors } from '@/constants/themes';

const Container = ({ children }) => {
  return (
    <Box
      bg={colors.primary}
      w={'100%'}
      h={'215px'}
      borderRadius={5}
      p={2.5}
      mb={3}
      mt={'63px'}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      }}
    >
      {children}
    </Box>
  );
};

export const BalanceContainer = ({ children }) => (
  <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
    {children}
  </Box>
);

export default Container;
