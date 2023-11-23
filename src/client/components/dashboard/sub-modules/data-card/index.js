'use client';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const DataCard = () => {
  return (
    <MainBox>
      <SubHeader isForm title={'DATA CARD'} />
      <Inputs />
    </MainBox>
  );
};

export default DataCard;
