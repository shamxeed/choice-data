import React from 'react';
import { Text, CircularProgress, Box } from '@chakra-ui/react';

import Title from './Title';
import ShowBalBtn, { ReloadBtn } from './Btns';
import { BalanceContainer } from './Container';

import { colors } from '@/constants/themes';
import { useAuth, useStore } from '@/client/hooks/helpers';

const key = 'balanceVisiblity';

const { primary } = colors;

const MyCircularActivity = ({ size }) => (
  <Box m={'5px'} ml={2}>
    <CircularProgress color={primary} size={size || '17px'} isIndeterminate />
  </Box>
);

const Balance = ({ user }) => {
  const { balance, bonus } = user || {};

  const [show, setShow] = React.useState('');

  const { loadUser, isReloading } = useAuth();

  const { store } = useStore();

  const { isLoading } = store || {};

  const balanceText = `₦${balance?.toLocaleString()}.00`;

  const bonusText = `₦${bonus?.toLocaleString()}.00`;

  const toggleBal = () => {
    if (show) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, 'show');
    }
    setShow(!show);
  };

  React.useEffect(() => {
    const localValue = localStorage.getItem(key);

    setShow(localValue);
  }, []);

  return (
    <>
      <Title />
      <BalanceContainer>
        {isLoading || !user ? (
          <MyCircularActivity size={25} />
        ) : (
          <Text fontSize={25} color={'#fff'} fontWeight={700}>
            {show ? balanceText : '••••'}
          </Text>
        )}

        <Box>
          <ReloadBtn
            mr={5}
            isLoading={isReloading}
            onClick={() => loadUser({ forceReload: true })}
          />
          <ShowBalBtn data={{ show, toggleBal }} />
        </Box>
      </BalanceContainer>

      <Title text={'Bonus Balance'} />
      {isLoading || !user ? (
        <MyCircularActivity />
      ) : (
        <Text fontSize={18} color={'#fff'}>
          {show ? bonusText : '••••'}
        </Text>
      )}
    </>
  );
};

export default Balance;
