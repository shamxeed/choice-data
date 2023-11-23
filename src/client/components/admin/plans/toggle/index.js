'use client';

import React from 'react';

import { Admin } from '../../../auth';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const TogglePlans = () => {
  return (
    <Admin>
      <MainBox>
        <SubHeader title={'TOGGLE PLANS'} />

        <Inputs />
      </MainBox>
    </Admin>
  );
};

export default TogglePlans;
