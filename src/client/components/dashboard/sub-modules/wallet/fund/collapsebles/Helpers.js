import { Box, Text } from '@chakra-ui/react';
import { IoCopyOutline } from 'react-icons/io5';

import { useToast } from '@/client/hooks/helpers';
import { colors } from '@/constants/themes';
import { IconBtn } from '../../../../../Misc/btns';

export const AccountHeading = ({ children }) => (
  <Text fontSize={'18px'} fontWeight={700} color={'gray.700'} mb={2}>
    {children}
  </Text>
);

export const AccountText = ({ children, text }) => {
  const { success } = useToast();

  const copyToClipBoard = () => {
    if (!text) return;

    navigator.clipboard.writeText(text);

    success({
      description: 'Copied to clipboard',
    });
  };

  return (
    <Box display={'flex'} alignItems={'center'}>
      <Text
        mb={1}
        fontSize={'17px'}
        fontWeight={700}
        color={'gray.700'}
        onClick={copyToClipBoard}
      >
        {children}
      </Text>

      {text && (
        <Box ml={2} mt={-1}>
          <IconBtn
            icon={<IoCopyOutline size={18} color={colors.primary} />}
            onClick={copyToClipBoard}
          />
        </Box>
      )}
    </Box>
  );
};

export const FadedText = ({ children }) => (
  <em
    style={{
      fontStyle: 'normal',
      color: 'rgba(0,0,0, 0.6)',
      marginRight: '5px',
    }}
  >
    {children}
  </em>
);

export const AcountContainer = ({ nuban, accountName, bank, bg, charge }) => (
  <Box bg={bg || 'orange.600'} borderRadius={10} mt={5} mb={5}>
    <Box ml={1} bg={'white'} p={3}>
      <AccountHeading>
        <FadedText>Bank: </FadedText> {bank || 'VFD MFB'}
      </AccountHeading>
      <AccountText text={nuban}>
        <FadedText>Acct No:</FadedText> {nuban}
      </AccountText>
      <AccountText>
        <FadedText>Acct Name:</FadedText> {accountName || 'Saukie.net'}
      </AccountText>

      {charge && (
        <AccountText>
          <FadedText>Charge:</FadedText> {charge}
        </AccountText>
      )}
    </Box>
  </Box>
);
