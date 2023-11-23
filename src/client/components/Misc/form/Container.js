import { Box } from '@chakra-ui/react';

import { colors } from '@/constants/themes';

const { white } = colors;

const Container = ({ children }) => {
  return (
    <Box
      bg={white}
      borderRadius={10}
      p={3}
      pl={5}
      pr={5}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
