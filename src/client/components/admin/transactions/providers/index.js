'use client';

import React from 'react';
import { Select } from '@chakra-ui/react';

import MyTable from './Table';
import { useAxios } from '@/client/hooks/helpers';
import { Admin } from '../../../auth';
import MainBox from '@/client/layouts/MainBox';
import SubHeader from '@/client/layouts/SubHeader';
import Container from '../../../Misc/Container';
import { errMessage } from '@/client/utils/helpers';
import { provider, providers } from '@/constants/Bundles';

const ProvidersTransaction = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);

  const [provdr, setProvider] = React.useState(provider);

  const firstMount = React.useRef(true);

  const { axios } = useAxios();

  const onLoad = async () => {
    if (!firstMount.current) {
      setLoading(true);
    }

    try {
      const { data } = await axios({
        url: `/admin/transactions/providers?provider=${provdr}`,
        method: 'post',
      });

      const newData = data.results;

      setData(newData);
    } catch (err) {
      const error = errMessage(err);

      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else {
      onLoad();
    }
  }, [provdr]);

  return (
    <Admin data={{ onLoad, isLoading, error }}>
      <MainBox>
        <SubHeader title={`${provdr} TRANSACTIONS`} />
        <Select
          bg={'#fff'}
          size={'lg'}
          value={provdr}
          onChange={(e) => setProvider(e.target.value)}
        >
          {providers.map(({ value, title }) => (
            <option value={value} key={value}>
              {title}
            </option>
          ))}
        </Select>
        <Container>
          <MyTable data={{ data, error, isLoading }} />
        </Container>
      </MainBox>
    </Admin>
  );
};

export default ProvidersTransaction;
