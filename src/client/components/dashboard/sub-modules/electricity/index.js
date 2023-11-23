'use client';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const Electricity = () => {
  return (
    <MainBox>
      <SubHeader isForm title={'ELECTRICITY'} />
      <Inputs />
    </MainBox>
  );
};

export default Electricity;
