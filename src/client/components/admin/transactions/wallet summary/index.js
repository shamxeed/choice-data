'use client';

import React from 'react';

import SubHeader from '../../../../layouts/SubHeader';
import MainBox from '../../../../layouts/MainBox';
import Container from '../../../Misc/Container';
import MyTable from './Table';
import { errMessage } from '@/client/utils/helpers';
import { useAxios } from '@/client/hooks/helpers';
import { Admin } from '@/client/components/auth';

const WalletSummary = () => {
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);

  const { axios, isLoading } = useAxios();

  const onLoad = async () => {
    try {
      const { data } = await axios({
        url: `/admin/transactions?type=funding`,
      });

      console.log(data);

      setData(data);
    } catch (err) {
      const error = errMessage(err);

      setError(error);
    }
  };

  return (
    <Admin data={{ onLoad }}>
      <MainBox>
        <SubHeader title={'USERS WALLET SUMMARY'} />

        <Container>
          <MyTable data={{ data, error, isLoading }} />
        </Container>
      </MainBox>
    </Admin>
  );
};

export default WalletSummary;
