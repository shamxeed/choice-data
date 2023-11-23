import React from 'react';

import { useAuth } from '@/client/hooks/helpers';
import Title from '../../dashboard/balance/Title';
import Container, { BalContainer } from './Container';
import { getBalances } from './helpers';

const key = 'balanceVisiblity';

const Balance = ({ data: { data, ...props } }) => {
  const [show, setShow] = React.useState('');

  const { user } = useAuth();

  const {
    alrahuzAccountNum,
    dancityAccountNum,
    kvAccountNum,
    payscribe,
    alrahuzBalance,
    dancityBalance,
    datastationAccountNum,
    datastationBalance,
    kvBalance,
  } = getBalances(data, user);

  React.useEffect(() => {
    const localValue = localStorage.getItem(key);

    setShow(localValue);
  }, []);

  return (
    <Container>
      <Title text={'KVData Balance'} />

      <BalContainer
        data={{
          show,
          ...props,
          acc: kvAccountNum,
          balance: kvBalance,
        }}
      />
    </Container>
  );
};

export default Balance;
