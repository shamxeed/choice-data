'use client';

import React from 'react';

import MyTable from './Table';
import { useAxios } from '@/client/hooks/helpers';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Container from '../../../Misc/Container';
import { errMessage } from '@/client/utils/helpers';

const Disputes = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);

  const { axios } = useAxios();

  const onLoad = async () => {
    try {
      const { data } = await axios({
        url: `transaction?type=dispute`,
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
    <>
      <MainBox>
        <SubHeader title={'DISPUTES'} />

        <Container>
          <MyTable data={{ data, error, isLoading }} />
        </Container>
      </MainBox>
    </>
  );
};

export default Disputes;
