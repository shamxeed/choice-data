'use client';

import React from 'react';

import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const Cable = () => {
  return (
    <MainBox>
      <SubHeader isForm title={'CABLE TV SUBSCRIPTION'} />
      <Inputs />
    </MainBox>
  );
};

export default Cable;
