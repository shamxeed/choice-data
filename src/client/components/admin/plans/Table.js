import React from 'react';
import { Table, Thead, Tbody, Tr, TableContainer } from '@chakra-ui/react';

import { MyTh, MyTd } from '../../Misc/Table';
import MyCircularProgress from '../../Misc/CircularProgress';

const MyTable = (props) => {
  const { data, error, isLoading } = props?.data;

  const empty = !isLoading && data.length <= 0;

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
                <MyTh>ID</MyTh>
                <MyTh>TITLE</MyTh>
                <MyTh>NETWORK</MyTh>
                <MyTh>TYPE</MyTh>
                <MyTh>PRICE</MyTh>
                <MyTh>PLAN ID</MyTh>
                <MyTh>PROVIDER</MyTh>
                <MyTh>DISABLED</MyTh>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map(
                (
                  {
                    title,
                    id,
                    network,
                    type,
                    amount,
                    plan_id,
                    provider,
                    is_disabled,
                  },
                  index
                ) => (
                  <Tr key={id}>
                    <MyTd>{index + 1}</MyTd>
                    <MyTd>{id}</MyTd>
                    <MyTd>{title}</MyTd>
                    <MyTd>{network}</MyTd>
                    <MyTd>{type}</MyTd>
                    <MyTd>₦{amount}</MyTd>
                    <MyTd>{plan_id}</MyTd>
                    <MyTd>{provider}</MyTd>
                    <MyTd>{is_disabled ? 'true' : 'false'}</MyTd>
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
