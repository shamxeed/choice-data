import { Box, Text, Collapse } from '@chakra-ui/react';

import { colors } from '@/constants/themes';
import MyCircularProgress from '../../../../../Misc/CircularProgress';
import { AcountContainer } from './Helpers';

const { primary } = colors;

const bgs = ['#990D81', '#0357EE'];

const Automated = ({ data: { accounts, isOpen } }) => {
  const { error, data, isGettingAccount } = accounts || {};

  return (
    <Collapse in={isOpen} animateOpacity>
      <Box display={'flex'} bg={'white'} borderRadius={10} mt={5}>
        <Box w={2} bg={primary} mt={1} mb={1} />
        <Box p={4}>
          <Text fontSize={'14px'} fontWeight={700} color={'gray.700'} mb={2}>
            AUTOMATED FUNDING
          </Text>

          <Text>
            We currently do not support Automated Funding as we're very new to
            this process but we're working tirelessly to bring it in the few
            coming weeks. Thanks for your understanding!!
          </Text>

          {/*  {accounts && (
            <Text>
              Thess accounts are uniquely assigned to only you, and your Wallet
              will be Credited Automatically once you transfer money into any
              one of them. Note that you will be charged 1.5% for each transfer.
              This funding method has no minimum funding amount.
            </Text>
          )}

          {data?.length >= 1 ? (
            <>
              {data.map((i, index) => (
                <AcountContainer
                  bg={bgs[index]}
                  bank={i.bankName}
                  charge={'1.5% on the amount'}
                  nuban={i.accountNumber}
                  accountName={'THRITELECOMSNG-' + i.accountName}
                />
              ))}
            </>
          ) : (
            <MyCircularProgress
              data={{ isLoading: isGettingAccount, error }}
              isFull={false}
            />
          )} */}
        </Box>
      </Box>
    </Collapse>
  );
};

export default Automated;
