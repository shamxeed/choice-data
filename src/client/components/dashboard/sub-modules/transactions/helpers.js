import { format } from '@/client/utils/dates';

const fileds = {
  id: 'Transaction Id',
  provider: 'Provider',
  service: 'Service',
  mobile_number: 'Mobile Number/ePin',
  plan: 'Plan',
  amount: 'Amount',
  status: 'Status',
  api_response: 'True Response',
  created_at: 'Date',
};

export const generateReceiptBody = (transac) => {
  let body = [];

  transac.created_at = format(transac.created_at);

  Object.keys(fileds).forEach((key) => {
    body.push([fileds[key], transac[key]]);
  });

  return body;
};
