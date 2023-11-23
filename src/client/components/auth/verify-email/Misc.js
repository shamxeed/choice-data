import { Box, Text } from '@chakra-ui/react';

import { colors } from '@/constants/themes';

export const BtnContainer = ({ children }) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      p={2}
    >
      {children}
    </Box>
  );
};

export const Btn = ({ children, onClick }) => {
  return (
    <Box onClick={onClick}>
      <Text color={colors.primary} fontWeight={'bold'}>
        {children}
      </Text>
    </Box>
  );
};
