import { Box, Text } from '@chakra-ui/react';
import { IoWalletOutline, IoCashOutline } from 'react-icons/io5';

import { colors } from '@/constants/themes';

const { white } = colors;

const Title = ({ text }) => {
  return (
    <Box display={'flex'} alignItems={'center'} mt={1}>
      {text?.includes('Bonus') ? (
        <IoCashOutline size={'1.1rem'} color={white} />
      ) : (
        <IoWalletOutline size={'1.1rem'} color={white} />
      )}
      <Text fontSize={'1rem'} color={white} ml={1}>
        {text || 'Wallet Balance'}
      </Text>
    </Box>
  );
};

export default Title;
