import { Box, Heading, Text } from '@chakra-ui/react';

import { colors } from '@/constants/themes';
import Asteriq from '../components/Misc/Asteriq';

const { primary, white } = colors;

const FormText = (
  <Text mt={2}>
    All Fields With <Asteriq /> Are Required!
  </Text>
);

const SubHeader = ({ title, subtitle, isForm, extra }) => {
  return (
    <Box
      bg={primary}
      mt={'60px'}
      mb={5}
      borderRadius={5}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
      }}
    >
      <Box
        p={4}
        pl={5}
        pr={5}
        bg={white}
        ml={1}
        borderTopRightRadius={5}
        borderBottomRightRadius={5}
      >
        <Heading size={'md'} textTransform={'capitalize'} color={'gray.600'}>
          {title || 'BUY DATA BUNDLE'}
        </Heading>
        {isForm && FormText}
        {subtitle && <Text mt={2}>{subtitle}</Text>}

        {extra}
      </Box>
    </Box>
  );
};

export default SubHeader;
