import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableContainer,
  Button,
} from '@chakra-ui/react';

import MyCircularProgress from '../../../Misc/CircularProgress';
import { MyTd, MyTh } from '../../../Misc/Table';
import { format } from '@/client/utils/dates';

const MyTable = (props) => {
  const { data, openModal, error, isLoading } = props?.data;

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
                <MyTh>SERVICE</MyTh>
                <MyTh>PLAN</MyTh>
                <MyTh>MOBILE NUMBER/EPIN</MyTh>
                <MyTh isNumeric>AMOUNT</MyTh>
                <MyTh isNumeric>BALANCE BEFORE</MyTh>
                <MyTh isNumeric>NEW BALANCE</MyTh>
                <MyTh>API RESPONSE</MyTh>
                <MyTh>STATUS</MyTh>
                <MyTh>USER</MyTh>
                <MyTh>DATE</MyTh>
                <MyTh>ACTION</MyTh>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map(
                (
                  {
                    id,
                    service,
                    plan,
                    mobile_number,
                    amount,
                    status,
                    api_response,
                    balance_before,
                    new_balance,
                    user,
                    created_at,
                  },
                  index
                ) => (
                  <Tr key={id}>
                    <MyTd>{index + 1}</MyTd>
                    <MyTd>{id}</MyTd>
                    <MyTd>{service}</MyTd>
                    <MyTd>{plan}</MyTd>
                    <MyTd>{mobile_number}</MyTd>
                    <MyTd>₦{amount}</MyTd>
                    <MyTd>₦{balance_before}</MyTd>
                    <MyTd>₦{new_balance}</MyTd>
                    <MyTd maxW={'200px'} overflow={'auto'} pl={2}>
                      {api_response}
                    </MyTd>
                    <MyTd>{status}</MyTd>
                    <MyTd maxW={'200px'} overflow={'auto'} pl={2} g>
                      {user?.email}
                    </MyTd>
                    <MyTd>{format(created_at)}</MyTd>
                    <MyTd>
                      <Button
                        onClick={() => openModal(id)}
                        isDisabled={status === 'failed'}
                      >
                        Refund{status === 'failed' ? 'ed' : ''}
                      </Button>{' '}
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
