'use client';

import React from 'react';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import PaymentMethod from './PaymentMethod';
import { Automated, Manual } from './collapsebles';
import { useAccount } from '@/client/hooks/helpers';

const FundWallet = () => {
  const [value, setValue] = React.useState('');

  const { onLoad, user, accounts } = useAccount();

  const onMount = React.useRef(true);

  React.useEffect(() => {
    if (onMount.current && !accounts.isGettingAccount) {
      onMount.current = false;
      onLoad();
    }
  }, []);

  return (
    <MainBox>
      <SubHeader
        title={'FUND WALLET'}
        subtitle={'Deposit fund to your wallet.'}
      />
      <PaymentMethod data={{ value, setValue }} />

      <Automated
        data={{
          user,
          accounts,
          isOpen: value === 'automated',
        }}
      />
      <Manual isOpen={value === 'manual'} />
    </MainBox>
  );
};

export default FundWallet;
