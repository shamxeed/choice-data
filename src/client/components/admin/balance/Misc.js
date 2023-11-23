import { Box, Text, CircularProgress } from '@chakra-ui/react';

import { colors } from '@/constants/themes';

const { white, primary } = colors;

export const Row = ({ children, ...props }) => (
  <Box display={'flex'} alignItems={'center'} {...props}>
    {children}
  </Box>
);

export const MyText = ({ children }) => (
  <Text fontSize={'1rem'} color={white} ml={1}>
    {children}
  </Text>
);

export const MyCircularActivity = ({ size }) => (
  <Box m={'7px'} ml={2}>
    <CircularProgress color={primary} size={size || '17px'} isIndeterminate />
  </Box>
);
