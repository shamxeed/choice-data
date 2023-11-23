import { Box, Text } from '@chakra-ui/react';
import {
  IoPhonePortraitOutline,
  IoWalletOutline,
  IoCashOutline,
  IoWifi,
} from 'react-icons/io5';

import { colors } from '@/constants/themes';
import Heading from '@/client/layouts/Heading';
import { useAuth } from '@/client/hooks/helpers';

const MiniBox = ({ children }) => (
  <Box
    h={'60px'}
    display={'flex'}
    justifyContent={'space-between'}
    alignItems={'center'}
    mt={1}
    mb={2}
  >
    {children}
  </Box>
);

const IconBox = ({ children, ...props }) => (
  <Box w={'40px'} h={'40px'} {...props}>
    {children}
  </Box>
);

const { white, blue, red } = colors;

const Statistics = () => {
  const { user } = useAuth();

  const {
    data_transactions_count,
    airtime_transactions_count,
    amount_spent,
    total_funding,
  } = user || {};

  return (
    <Box
      bg={white}
      borderRadius={10}
      mt={3}
      p={2}
      mb={3}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      }}
    >
      <Heading>Spending Trend</Heading>

      <MiniBox>
        <Box>
          <Text fontSize={'14px'}>Total Number of Data bundle purchased</Text>
          <Text fontWeight={700}>{data_transactions_count}</Text>
        </Box>

        <IconBox>
          <IoWifi size={25} color={red} />
        </IconBox>
      </MiniBox>
      <MiniBox>
        <Box>
          <Text fontSize={'14px'}>
            Total Number of Airtime bundle purchased
          </Text>
          <Text fontWeight={700}>{airtime_transactions_count}</Text>
        </Box>
        <IconBox>
          <IoPhonePortraitOutline size={25} color={blue} />
        </IconBox>
      </MiniBox>
      <MiniBox>
        <Box>
          <Text fontSize={'14px'}>Money In</Text>
          <Text fontWeight={700}>₦{total_funding?.toLocaleString()}</Text>
        </Box>
        <IconBox>
          <IoWalletOutline size={25} color='green' />
        </IconBox>
      </MiniBox>
      <MiniBox>
        <Box>
          <Text fontSize={'14px'}>Money Out</Text>
          <Text fontWeight={700}>₦{amount_spent?.toLocaleString()}</Text>
        </Box>
        <IconBox>
          <IoCashOutline size={25} color='teal' />
        </IconBox>
      </MiniBox>
    </Box>
  );
};

export default Statistics;
