import React from 'react';
import { Table, Thead, Tbody, Tr, TableContainer } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { MyCircularProgress } from '../../../Misc';
import { MyTd, MyTh } from '../../../Misc/Table';
import { useAxios, useAuth } from '@/client/hooks/helpers';
import { errMessage } from '@/client/utils/helpers';

const MyTable = () => {
  const [isLoading, setLoading] = React.useState(true);

  const [error, setError] = React.useState('');

  const [data, setData] = React.useState([]);

  const { axios } = useAxios();

  const { user } = useAuth();

  const empty = !isLoading && data?.length <= 0;

  const onLoad = async () => {
    try {
      const { data } = await axios({
        url: `/auth/referrals?email=${user.email}`,
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
      {isLoading || error || empty ? (
        <MyCircularProgress data={{ error, isLoading }} />
      ) : (
        <TableContainer>
          <Table>
            <Thead h={'60px'}>
              <Tr>
                <MyTh>SN</MyTh>
                <MyTh>FULL NAME</MyTh>
                <MyTh>EMAIL</MyTh>
                <MyTh>EARNING</MyTh>
                <MyTh>DATE</MyTh>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map(
                (
                  { id, first_name, last_name, email, created_at, isBonusPaid },
                  index
                ) => (
                  <Tr key={id}>
                    <MyTd>{index + 1}</MyTd>
                    <MyTd textAlign={'left'}>
                      {first_name} {last_name}
                    </MyTd>
                    <MyTd textAlign={'left'}>{email}</MyTd>
                    <MyTd>{isBonusPaid ? '₦100.00' : '₦0.00'}</MyTd>
                    <MyTd>
                      {dayjs(created_at).format('dddd MMMM D, YYYY h:mm A')}
                    </MyTd>
                  </Tr>
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default MyTable;
