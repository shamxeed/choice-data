import { Box, Text, Progress, CircularProgress } from '@chakra-ui/react';
import { IoBulbOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

import { colors } from '@/constants/themes';

const { primary, white, bg } = colors;

const Container = ({ children, ...props }) => (
  <Box
    position={'absolute'}
    top={0}
    right={0}
    bottom={0}
    left={0}
    display={'flex'}
    flexDirection={'column'}
    justifyContent={'center'}
    alignItems={'center'}
    bg={'rgba(0,0,0, .5)'}
    zIndex={200000}
    p={4}
    {...props}
  >
    {children}
  </Box>
);

const Spinner = ({ text, isElect }) => {
  return (
    <Container>
      <Box
        bg={white}
        borderRadius={10}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={-15}
      >
        <Box m={4} mt={6} p={4} borderRadius={'50%'} bg={bg}>
          {isElect ? (
            <IoBulbOutline size={50} color={primary} />
          ) : (
            <IoCheckmarkCircleOutline size={80} color={primary} />
          )}
        </Box>
        <Box
          p={4}
          pt={5}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Progress
            h={5}
            hasStripe
            isAnimated
            value={100}
            colorScheme={'green'}
            borderRadius={5}
            style={{
              width: 'calc(100% - 20px)',
              marginRight: '10px',
              marginLeft: '10px',
            }}
          />
          <Text m={2} mt={5} fontSize={'18px'} textAlign={'center'}>
            {text || 'Please wait...'}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export const SimpleSpinner = () => {
  return (
    <Container bg={'rgba(0,0,0, .3)'}>
      <CircularProgress color={primary} isIndeterminate />
    </Container>
  );
};

export default Spinner;
