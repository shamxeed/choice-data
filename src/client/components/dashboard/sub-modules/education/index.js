'use client';

import React from 'react';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const Education = () => {
  return (
    <MainBox>
      <SubHeader isForm title={'BUY EDUCATIONAL VOUCHER'} />
      <Inputs />
    </MainBox>
  );
};

export default Education;
