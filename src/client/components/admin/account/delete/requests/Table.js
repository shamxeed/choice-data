import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableContainer,
  Button,
} from '@chakra-ui/react';

import { MyCircularProgress } from '@/client/components/Misc';
import { MyTd, MyTh } from '../../../../Misc/Table';
import { format, fromNow } from '@/client/utils/dates';

const MyTable = (props) => {
  const { data, error, isLoading, openModal } = props?.data;

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
                <MyTh>NAME</MyTh>
                <MyTh>EMAIL</MyTh>
                <MyTh>PHONE</MyTh>
                <MyTh isNumeric>BALANCE</MyTh>
                <MyTh>CREATION DATE</MyTh>
                <MyTh>REQUEST DATE</MyTh>
                <MyTh>ACTION</MyTh>
              </Tr>
            </Thead>
            <Tbody>
              {data?.map(
                (
                  {
                    id,
                    first_name,
                    last_name,
                    email,
                    phone,
                    balance,
                    created_at,
                    updated_at,
                  },
                  index
                ) => (
                  <Tr key={id}>
                    <MyTd>{index + 1}</MyTd>
                    <MyTd>{id}</MyTd>
                    <MyTd>
                      {first_name} {last_name}
                    </MyTd>
                    <MyTd>{email}</MyTd>
                    <MyTd>{phone}</MyTd>
                    <MyTd>₦{balance}</MyTd>
                    <MyTd>{format(created_at)}</MyTd>
                    <MyTd>{fromNow(updated_at)}</MyTd>
                    <MyTd>
                      <Button onClick={() => openModal(id)}>Delete</Button>
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
