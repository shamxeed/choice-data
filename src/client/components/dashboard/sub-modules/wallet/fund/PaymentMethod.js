import { Text, Box, Radio, RadioGroup, Stack } from '@chakra-ui/react';

import Container from '../../../../Misc/Container';

const MyContainer = ({ children }) => (
  <Box borderRadius={5} border={'1px'} borderColor={'gray.300'} mt={2} mb={2}>
    {children}
  </Box>
);

const PaymentMethod = ({ data: { value, setValue } }) => {
  return (
    <Container>
      <Box p={5}>
        <Text fontSize={'17px'} fontWeight={700} color={'gray.600'}>
          PAYMENT METHOD
        </Text>

        <RadioGroup value={value} onChange={setValue}>
          <Stack>
            <MyContainer>
              <Radio value={'automated'} p={2} w={'100%'}>
                Automated Funding
              </Radio>
            </MyContainer>

            <MyContainer>
              <Radio value={'manual'} p={2} w={'100%'}>
                Manual Funding
              </Radio>
            </MyContainer>
          </Stack>
        </RadioGroup>
      </Box>
    </Container>
  );
};

export default PaymentMethod;
