'use client';

import React from 'react';

import { Admin } from '../../../auth';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';
import { useAxios } from '@/client/hooks/helpers';

const UpdatePlans = () => {
  const { axios } = useAxios();

  const [data, setData] = React.useState([]);

  const onLoad = async () => {
    try {
      const { data } = await axios({
        url: '/admin/plan',
        method: 'post',
      });

      setData(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Admin data={{ onLoad }}>
      <MainBox>
        <SubHeader title={'CREATE/UPDATE PLANS'} />

        <Inputs data={data} />
      </MainBox>
    </Admin>
  );
};

export default UpdatePlans;
