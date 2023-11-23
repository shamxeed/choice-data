import { Box } from '@chakra-ui/react';

import { colors } from '@/constants/themes';

const { primary, white } = colors;

const Container = ({ children }) => {
  return (
    <Box bg={primary} borderRadius={10} borderTopRadius={5} pt={'0.5'} mt={6}>
      <Box bg={white} borderBottomRadius={10}>
        {children}
      </Box>
    </Box>
  );
};

export default Container;
