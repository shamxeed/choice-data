import { Box, Text, Collapse } from '@chakra-ui/react';

import { colors } from '@/constants/themes';
import { AcountContainer } from './Helpers';

const { primary } = colors;

const Manual = ({ isOpen }) => {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Box display={'flex'} bg={'white'} borderRadius={10} mt={5}>
        <Box w={2} bg={primary} mt={1} mb={1} />
        <Box p={4}>
          <Text fontSize={'14px'} fontWeight={700} color={'gray.700'} mb={2}>
            MANUAL FUNDING
          </Text>
          <Text>
            Send money to our accounts by way of bank transfer and share us the
            receipt via our WhatsApp channel and we will immediately credit your
            wallet. Manual funding is free unlike the automatic funding which
            attracts a charges of 1.5% on the principal amount.
          </Text>

          <AcountContainer
            bg={primary}
            bank={'Opay'}
            nuban={'9046393569'}
            accountName={'Utukpe Oghale'}
          />
        </Box>
      </Box>
    </Collapse>
  );
};

export default Manual;
