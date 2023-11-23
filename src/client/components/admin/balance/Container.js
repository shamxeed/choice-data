import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { IoRefreshOutline } from 'react-icons/io5';

import { colors } from '@/constants/themes';
import { IconBtn } from '../../Misc/btns';
import { useToast } from '@/client/hooks/helpers';
import { Row, MyText, MyCircularActivity } from './Misc';

const { primary, white } = colors;

const RefreshIcon = <IoRefreshOutline size={15} color={white} />;

const Container = ({ children }) => {
  return (
    <Box
      bg={primary}
      w={'100%'}
      h={'95px'}
      borderRadius={5}
      p={2.5}
      mb={4}
      mt={'63px'}
    >
      {children}
    </Box>
  );
};

export default Container;

export const BalContainer = ({ data }) => {
  const { show, balance, acc, isRefreshing, onLoad, isLoading } = data || {};

  const { success } = useToast();

  const showSpinner =
    balance?.includes('undefined') ||
    balance?.includes('NaN') ||
    isRefreshing ||
    isLoading;

  const copyToClipBoard = (text) => {
    navigator.clipboard.writeText(text);

    success({
      description: 'Copied to clipboard',
    });
  };

  return (
    <Row>
      <Box w={'50%'}>
        {showSpinner ? (
          <MyCircularActivity />
        ) : (
          <Text m={1} fontSize={21} color={white} fontWeight={700}>
            {show ? balance : '••••'}
          </Text>
        )}
      </Box>

      <Row w={'50%'} justifyContent={'space-between'}>
        <Box>
          <Text color={white} ml={1} mb={-1}>
            Accounts
          </Text>
          <MyText>{acc}</MyText>
        </Box>

        <IconBtn onClick={() => copyToClipBoard(acc)} />

        <IconBtn
          icon={RefreshIcon}
          isLoading={isRefreshing}
          onClick={() => onLoad(true)}
        />
      </Row>
    </Row>
  );
};
