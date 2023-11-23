import { Link } from '@chakra-ui/next-js';
import { Text, Box, IconButton } from '@chakra-ui/react';

import { colors } from '@/constants/themes';

const { white } = colors;

const BtnText = ({ children }) => (
  <Text color={white} fontSize={'0.7rem'} mt={'7px'}>
    {children}
  </Text>
);

const IconButtonBox = ({ children }) => (
  <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
    {children}
  </Box>
);

const MyLink = ({ href, icon, btnText, ...props }) => (
  <Link
    href={href || '/dashboard/wallet/fund'}
    style={{
      textDecoration: 'none',
    }}
    {...props}
  >
    <IconButtonBox>
      <IconButton bg={white} size={'sm'} icon={icon} />
      <BtnText>{btnText || 'Fund Wallet'}</BtnText>
    </IconButtonBox>
  </Link>
);

export default MyLink;
