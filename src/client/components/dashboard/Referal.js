import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import { IoPeopleOutline, IoLinkOutline, IoCopyOutline } from 'react-icons/io5';
import { Link } from '@chakra-ui/next-js';

import { useAuth, useToast } from '@/client/hooks/helpers';
import { colors } from '@/constants/themes';
import Heading from '@/client/layouts/Heading';

const { gray, primary } = colors;

const Referal = () => {
  const { success } = useToast();

  const { user } = useAuth();

  const { email } = user || {};

  const value = `https://www.choicedataservice.com/auth/sign-up?ref=${email}`;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(value);

    success({
      description: 'Copied to clipboard',
    });
  };

  return (
    <Box
      bg={colors.white}
      borderRadius={10}
      p={3}
      mb={3}
      width={['100%', '49.5%']}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      }}
    >
      <Heading>Refer Us & Earn</Heading>

      <Text mb={3}>
        Use the bellow link to invite your family & friends to enable you earn a
        whopping ₦100. How does this works? Once a user that you refer has a
        Total Funding of ₦5000 you will automatically be Credited with your
        referral bonus.
      </Text>

      <InputGroup>
        <InputLeftAddon>
          <IoLinkOutline size={18} color={gray} />
        </InputLeftAddon>
        <Input value={value} readOnly />
        <InputRightAddon p={0} bg={'transparent'}>
          <Button
            p={2}
            color={primary}
            bg={'transparent'}
            fontSize={'1rem'}
            fontWeight={400}
            onClick={copyToClipBoard}
            leftIcon={<IoCopyOutline size={18} color={primary} />}
          >
            Copy Link
          </Button>
        </InputRightAddon>
      </InputGroup>

      <Box mt={4} mb={4}>
        <Link
          href={'/dashboard/referrals'}
          style={{
            textTransform: 'none',
          }}
        >
          <Button
            size={'lg'}
            bg={primary}
            width={'100%'}
            borderRadius={5}
            colorScheme={primary}
            rightIcon={<IoPeopleOutline size={25} />}
          >
            My Referrals
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Referal;
