'use client';
import React from 'react';

import { Admin } from '../../auth';
import { useAxios } from '@/client/hooks/helpers';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Inputs from './Inputs';

const Configs = () => {
  const { axios } = useAxios();

  const [data, setData] = React.useState([]);

  const [error, setError] = React.useState('');

  const [isLoading, setLoading] = React.useState(true);

  const onLoad = async () => {
    try {
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Admin data={{ onLoad, isLoading, error }}>
      <MainBox>
        <SubHeader title={'CHANGE CONFIGURATIONS'} />

        <Inputs />
      </MainBox>
    </Admin>
  );
};

export default Configs;
