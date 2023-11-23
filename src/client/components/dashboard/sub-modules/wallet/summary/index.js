'use client';

import React from 'react';

import SubHeader from '../../../../../layouts/SubHeader';
import MainBox from '../../../../../layouts/MainBox';
import Container from '../../../../Misc/Container';
import MyTable from './Table';
import { errMessage } from '@/client/utils/helpers';
import { useAxios } from '@/client/hooks/helpers';

const WalletSummary = () => {
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);

  const { axios, isLoading } = useAxios();

  const fetctWalletTransactions = async () => {
    try {
      const { data } = await axios({
        url: `/transaction?type=funding`,
      });

      setData(data);
    } catch (err) {
      const error = errMessage(err);

      setError(error);
    }
  };

  React.useEffect(() => {
    fetctWalletTransactions();
  }, []);

  return (
    <MainBox>
      <SubHeader title={'WALLET SUMMARY'} />

      <Container>
        <MyTable data={{ data, error, isLoading }} />
      </Container>
    </MainBox>
  );
};

export default WalletSummary;
