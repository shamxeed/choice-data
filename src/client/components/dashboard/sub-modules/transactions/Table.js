import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableContainer,
  Button,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import MyCircularProgress from '../../../Misc/CircularProgress';
import { MyTd, MyTh } from '../../../Misc/Table';
import { generateReceiptBody } from './helpers';

const MyTable = (props) => {
  const { data, error, isLoading } = props?.data;

  const empty = !isLoading && data.length <= 0;

  const generatePDF = (id) => {
    const doc = new jsPDF({
      format: [200, 200],
    });

    const transac = data.find((i) => i.id === id);

    const body = generateReceiptBody(transac);

    doc.text('Thritelecoms Transaction Receipt', 60, 10);

    autoTable(doc, {
      theme: 'grid',
      head: [['Name', 'Description']],
      headStyles: {
        minCellHeight: 10,
        valign: 'middle',
        fontSize: 15,
      },
      bodyStyles: {
        minCellWidth: 40,
        minCellHeight: 10,
        valign: 'middle',
        fontSize: 13,
      },
      body,
    });

    doc.save(`Thritelecoms-${transac.id}.pdf`);
  };

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
                    <MyTd>
                      {dayjs(created_at).format('dddd MMMM D, YYYY h:mm A')}
                    </MyTd>
                    <MyTd>
                      <Button onClick={() => generatePDF(id)}>Receipt</Button>
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
