'use client';

import React from 'react';
import MyTable from '../../transactions/Table';
import { useAxios } from '@/client/hooks/helpers';
import { Admin } from '../../auth';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Container from '../../Misc/Container';
import { errMessage } from '@/client/utils/helpers';

const AllTransactions = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);

  const { axios } = useAxios();

  const onLoad = async () => {
    try {
      const { data } = await axios({
        url: `/admin/transactions`,
      });

      setData(data);
    } catch (err) {
      const error = errMessage(err);

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Admin data={{ onLoad, isLoading, error }}>
      <MainBox>
        <SubHeader title={'ALL TRANSACTIONS'} />
        <Container>
          <MyTable data={{ data, error, isLoading }} />
        </Container>
      </MainBox>
    </Admin>
  );
};

export default AllTransactions;
