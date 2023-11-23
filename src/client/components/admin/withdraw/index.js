'use client';

import React from 'react';
import { Admin } from '../../auth';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const Withdraw = () => {
  return (
    <Admin>
      <MainBox>
        <SubHeader title={'WITHDRAW'} />

        <Inputs />
      </MainBox>
    </Admin>
  );
};

export default Withdraw;
