'use client';
import React from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { Alert, Container, Searchbar } from '../../../Misc';
import MyTable from './Table';
import SubHeader from '../../../../layouts/SubHeader';
import MainBox from '../../../../layouts/MainBox';
import { useAxios } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';

const TransactionHistory = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);

  const [alert, setAlert] = React.useState({
    title: 'Invalid Mobile Number',
    body: 'Please enter a valid mobile number!',
  });

  const { onOpen, ...props } = useDisclosure();

  const { axios } = useAxios();

  const onLoad = async () => {
    try {
      const { data } = await axios({
        url: `/transaction?type=purchase`,
      });

      setData(data);
    } catch (err) {
      const error = errMessage(err);

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = async (e) => {
    const { query } = e;

    if (query?.length !== 11) {
      return onOpen();
    }

    try {
      const { data } = await axios({
        url: `/transaction/search?query=${query}`,
      });

      setData(data);
    } catch (err) {
      const error = errMessage(err);

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    onLoad();
  }, []);

  return (
    <React.Fragment>
      <MainBox>
        <SubHeader title={'TRANSACTION HISTORY'} />

        <Searchbar onSubmit={onSearch} />

        <Container>
          <MyTable data={{ isLoading, error, data }} />
        </Container>
      </MainBox>

      <Alert
        data={{
          ...alert,
          ...props,
        }}
      />
    </React.Fragment>
  );
};

export default TransactionHistory;
