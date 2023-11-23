import React from 'react';
import { Table, Thead, Tbody, Tr, TableContainer } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { MyCircularProgress } from '../../../../Misc';
import { MyTd, MyTh } from '../../../../Misc/Table';

const MyTable = (props) => {
  const { data, error, isLoading } = props.data;

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
                <MyTh>TRANSACTION Id</MyTh>
                <MyTh isNumeric>AMOUNT</MyTh>
                <MyTh isNumeric>BALANCE BEFORE</MyTh>
                <MyTh isNumeric>NEW BALANCE</MyTh>
                <MyTh isNumeric>CHANNEL</MyTh>
                <MyTh isNumeric>STATUS</MyTh>
                <MyTh isNumeric>API RESPONSE</MyTh>
                <MyTh isNumeric>DATE</MyTh>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(
                (
                  {
                    id,
                    amount,
                    channel,
                    status,
                    api_response,
                    balance_before,
                    new_balance,
                    created_at,
                  },
                  index
                ) => (
                  <Tr key={id}>
                    <MyTd>{index + 1}</MyTd>
                    <MyTd>{id}</MyTd>
                    <MyTd>{amount}</MyTd>
                    <MyTd>{balance_before}</MyTd>
                    <MyTd>{new_balance}</MyTd>
                    <MyTd>{channel}</MyTd>
                    <MyTd>{status}</MyTd>
                    <MyTd maxW={'200px'} overflow={'auto'} pl={2}>
                      {api_response}
                    </MyTd>
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
