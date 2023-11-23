import { Th, Td } from '@chakra-ui/react';

import { colors } from '@/constants/themes';

export const MyTh = ({ children }) => (
  <Th
    borderLeftWidth={1}
    borderLeftColor={'gray.400'}
    borderBottomColor={'gray.400'}
    borderBottomWidth={1}
    fontSize={'md'}
  >
    {children}
  </Th>
);

export const MyTd = ({ children, ...props }) => (
  <Td
    borderLeftWidth={'2px'}
    borderLeftColor={colors.bg}
    //  textAlign={'center'}
    {...props}
  >
    {children}
  </Td>
);
