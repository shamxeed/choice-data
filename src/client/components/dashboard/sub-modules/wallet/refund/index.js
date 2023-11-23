'use client';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const Refund = () => {
  return (
    <MainBox>
      <SubHeader isForm title={'Request Refund'} />
      <Inputs />
    </MainBox>
  );
};

export default Refund;
