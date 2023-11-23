import React from 'react';
import { Table, Thead, Tbody, Tr, TableContainer } from '@chakra-ui/react';

import MyCircularProgress from '../../../Misc/CircularProgress';
import { MyTd, MyTh } from '../../../Misc/Table';
import { format } from '@/client/utils/dates';

const MyTable = (props) => {
  const { data, error, isLoading } = props?.data;

  const empty = (!isLoading && data?.length <= 0) || !data;

  return (
    <>
      {isLoading || error || empty ? (
        <MyCircularProgress data={{ error, isLoading }} />
      ) : (
        <TableContainer
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px',
          }}
        >
          <Table>
            <Thead h={'60px'}>
              <Tr>
                <MyTh>SN</MyTh>
                <MyTh>ID</MyTh>
                <MyTh>MOBILE NUMBER</MyTh>
                <MyTh>SERVICE</MyTh>
                <MyTh>PLAN</MyTh>
                <MyTh>AMOUNT</MyTh>
                <MyTh>STATUS</MyTh>
                <MyTh>API RESPONSE</MyTh>
                <MyTh>DATE</MyTh>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map(
                (
                  {
                    id,
                    service,
                    plan,
                    amount,
                    api_response,
                    status,
                    mobile_number,
                    created_at,
                  },
                  index
                ) => (
                  <Tr key={id}>
                    <MyTd>{index + 1}</MyTd>
                    <MyTd>{id}</MyTd>
                    <MyTd>{mobile_number}</MyTd>
                    <MyTd>{service}</MyTd>
                    <MyTd>{plan}</MyTd>
                    <MyTd>{amount || ''}</MyTd>
                    <MyTd>{status}</MyTd>
                    <MyTd maxW={'200px'} overflow={'auto'} pl={2}>
                      {api_response}
                    </MyTd>
                    <MyTd>{format(created_at)}</MyTd>
                    <MyTd></MyTd>
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
