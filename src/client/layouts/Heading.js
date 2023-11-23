import { Text } from '@chakra-ui/react';

const Heading = ({ children, ...props }) => {
  return (
    <Text fontWeight={700} fontSize={'lg'} mb={1} mt={1} {...props}>
      {children}
    </Text>
  );
};

export default Heading;
