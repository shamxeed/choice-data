'use client';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const Airtime = () => {
  return (
    <MainBox>
      <SubHeader title={'BUY AIRTIME'} isForm extra={'Airtime are all VTUs'} />
      <Inputs />
    </MainBox>
  );
};

export default Airtime;
