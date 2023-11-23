'use client';

import React from 'react';

import { Admin } from '../../../auth';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const AccountSettings = () => {
  return (
    <Admin>
      <MainBox>
        <SubHeader title={'ACCOUNT SETTINGS'} />

        <Inputs />
      </MainBox>
    </Admin>
  );
};

export default AccountSettings;
