import { Box } from '@chakra-ui/react';
import { colors } from '@/constants/themes';

const Container = ({ children }) => {
  return (
    <Box
      pl={5}
      pr={5}
      pt={5}
      display={'flex'}
      bg={colors.primary}
      flexDirection={'column'}
      alignItems={['unset', 'center']}
      justifyContent={'space-between'}
      style={{
        minHeight: 'calc(100vh - 70px)',
      }}
    >
      {children}
    </Box>
  );
};

export default Container;

export const SubContainer = ({ children, ...props }) => {
  return (
    <Box
      p={5}
      pt={4}
      pb={2}
      mb={2}
      minW={['unset', 'unset', '450px']}
      bg={colors.white}
      borderRadius={10}
      {...props}
    >
      {children}
    </Box>
  );
};
