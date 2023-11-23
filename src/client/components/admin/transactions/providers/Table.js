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
                <MyTh>TRANSACTION Id</MyTh>
                <MyTh>CUSTOMER</MyTh>
                <MyTh>PLAN</MyTh>
                <MyTh>MOBILE NUMBER</MyTh>
                <MyTh isNumeric>AMOUNT</MyTh>
                <MyTh isNumeric>BALANCE BEFORE</MyTh>
                <MyTh isNumeric>NEW BALANCE</MyTh>
                <MyTh>API RESPONSE</MyTh>
                <MyTh>STATUS</MyTh>
                <MyTh>DATE</MyTh>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map(
                (
                  {
                    id,
                    customer_ref,
                    plan_name,
                    mobile_number,
                    plan_amount,
                    Status,
                    api_response,
                    balance_before,
                    balance_after,
                    create_date,
                  },
                  index
                ) => (
                  <Tr key={id}>
                    <MyTd>{index + 1}</MyTd>
                    <MyTd>{id}</MyTd>
                    <MyTd>{customer_ref}</MyTd>
                    <MyTd>{plan_name}</MyTd>
                    <MyTd>{mobile_number}</MyTd>
                    <MyTd>₦{plan_amount}</MyTd>
                    <MyTd>₦{balance_before}</MyTd>
                    <MyTd>₦{balance_after}</MyTd>
                    <MyTd maxW={'200px'} overflow={'auto'} pl={2}>
                      {api_response}
                    </MyTd>
                    <MyTd>{Status}</MyTd>
                    <MyTd>{format(create_date)}</MyTd>
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
