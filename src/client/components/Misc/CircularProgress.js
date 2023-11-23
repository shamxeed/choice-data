import { CircularProgress, Container, Text } from '@chakra-ui/react';

import { colors } from '@/constants/themes';

const { red, primary } = colors;

const MyCircularProgress = ({ isFull = true, data: { error, isLoading } }) => {
  return (
    <Container
      centerContent
      justifyContent={'center'}
      h={isFull ? '60vh' : 'unset'}
    >
      {error ? (
        <Text color={red}>{error}</Text>
      ) : isLoading ? (
        <CircularProgress size={[5, 10]} isIndeterminate color={primary} />
      ) : (
        <Text>No record found!</Text>
      )}
    </Container>
  );
};

export default MyCircularProgress;
