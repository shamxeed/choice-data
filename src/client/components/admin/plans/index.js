'use client';

import React from 'react';

import { Admin } from '../../auth';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import { useAxios } from '@/client/hooks/helpers';
import MyTable from './Table';
import Container from '../../Misc/Container';
import { errMessage } from '@/client/utils/helpers';

const DataPlans = () => {
  const { axios, isLoading } = useAxios();

  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState('');

  const onLoad = async () => {
    try {
      const { data } = await axios({
        url: '/admin/plan',
        method: 'post',
      });

      setData(data);
    } catch (err) {
      const error = errMessage(errMessage);
      setError(error);
    }
  };

  return (
    <Admin data={{ onLoad }}>
      <MainBox>
        <SubHeader title={'DATA PLANS'} />

        <Container>
          <MyTable data={{ data, isLoading, error }} />
        </Container>
      </MainBox>
    </Admin>
  );
};

export default DataPlans;
