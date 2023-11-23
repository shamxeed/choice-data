'use client';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const BuyData = () => {
  return (
    <MainBox>
      <SubHeader isForm />
      <Inputs />
    </MainBox>
  );
};

export default BuyData;
