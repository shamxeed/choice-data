import { Box } from '@chakra-ui/react';

import { colors } from '@/constants/themes';

const MainBox = ({ children, ...props }) => {
  return (
    <Box
      bg={colors.bg}
      p={5}
      style={{
        minHeight: 'calc(100vh - 70px)',
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default MainBox;
