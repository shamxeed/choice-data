'use client';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const TransferBonus = () => {
  return (
    <MainBox>
      <SubHeader isForm title={'TRANSFER BONUS TO WALLET'} />
      <Inputs />
    </MainBox>
  );
};

export default TransferBonus;
