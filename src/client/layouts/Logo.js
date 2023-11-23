import Image from 'next/image';
import { Box } from '@chakra-ui/react';

const Logo = ({ size, ...props }) => {
  return (
    <Box
      w={['unset', '100%']}
      maxW={'445px'}
      display={'flex'}
      alignItems={'flex-start'}
      {...props}
    >
      <Image
        src={'/logo.png'}
        alt={'Thritelecoms logo'}
        width={size || 80}
        height={size || 80}
      />
    </Box>
  );
};

export default Logo;
