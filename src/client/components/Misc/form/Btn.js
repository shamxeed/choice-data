import { Button } from '@chakra-ui/react';
import { IoArrowForward } from 'react-icons/io5';

import { colors } from '@/constants/themes';

const { white, primary } = colors;

const SubmitBtn = ({ text, ...props }) => {
  return (
    <Button
      mt={5}
      mb={2}
      w={'100%'}
      size={'lg'}
      bg={primary}
      type={'submit'}
      colorScheme={primary}
      rightIcon={<IoArrowForward size={20} color={white} />}
      {...props}
    >
      {text || ' Continue'}
    </Button>
  );
};

export default SubmitBtn;
