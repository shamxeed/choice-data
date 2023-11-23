import { Box, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

import { colors } from '@/constants/themes';

const { primary, white } = colors;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box w={'100%'} bg={primary} height={'70px'} p={3} pl={2} pr={2}>
      <Text color={white}>
        {' '}
        &copy; {year} Choice Data. All Rights Reserved!
      </Text>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <Link href={'/terms'} color={white}>
            Terms of conditions
          </Link>
          <Link href={'/policy'} color={white} ml={3}>
            Privacy policy
          </Link>
        </Box>

        <Text fontSize={'12px'} color={white} mt={2}>
          Version 1.0.7
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
