export const provider = 'kvdata';

export const networks = [
  {
    value: 'MTN',
    id: 1000000001,
  },
  {
    value: 'Airtel',
    id: 1000000002,
  },
  {
    value: '9Mobile',
    id: 1000000003,
  },
  {
    value: 'Glo',
    id: 1000000004,
  },
];

export const providers = [
  {
    title: 'KV Data',
    value: 'kvdata',
    id: '1',
  },
];

export const types = [
  {
    id: 1,
    title: 'SME',
    value: 'sme',
    networks: ['MTN'],
  },
  {
    id: 2,
    title: 'SME2',
    value: 'sme2',
    networks: ['MTN'],
  },
  {
    id: 3,
    title: 'CG',
    value: 'cg',
    networks: ['MTN', 'Airtel', '9Mobile', 'Glo'],
  },
  {
    id: 4,
    title: 'Data-Coupon',
    value: 'mtn_coupon',
    networks: ['MTN'],
  },
  {
    id: 4,
    title: 'Data-Card',
    value: 'data_card',
    networks: ['MTN'],
  },
];
export const cableTypes = [
  {
    id: 1,
    value: 'dstv',
    title: 'DSTV Subscriptions',
  },
  /* {
    id: 2,
    value: 'dstvshowmax',
    title: 'DSTV Showmax',
  }, */
  {
    id: 3,
    value: 'gotv',
    title: 'GoTV',
  },
  {
    id: 4,
    value: 'startimes',
    title: 'Startimes Payments',
  },
];

export const plans = [
  {
    id: '1',
    label: '50MB',
    value: '50MB',
  },
  {
    id: '2',
    label: '100MB',
    value: '100MB',
  },
  {
    id: '3',
    label: '200MB',
    value: '200MB',
  },
  {
    id: '4',
    label: '300MB',
    value: '300MB',
  },
  {
    id: '5',
    label: '500MB',
    value: '500MB',
  },
  {
    id: '6',
    label: '750MB',
    value: '750MB',
  },
  {
    id: '7',
    label: '1GB',
    value: '1GB',
  },
  {
    id: '8',
    label: '1.5GB',
    value: '1.5GB',
  },
  {
    id: '9',
    label: '2GB',
    value: '2GB',
  },
  {
    id: '10',
    label: '2.5GB',
    value: '2.5GB',
  },
  {
    id: '11',
    label: '3GB',
    value: '3GB',
  },
  {
    id: '12',
    label: '5GB',
    value: '5GB',
  },
  {
    id: '13',
    label: '10GB',
    value: '10GB',
  },
  {
    id: '14',
    label: '15GB',
    value: '15GB',
  },
  {
    id: '15',
    label: '20GB',
    value: '20GB',
  },
];

export const data_card_plans = [
  {
    title: '1GB -₦215 Weekly',
    amount: 215,
    plan: '1GB',
    id: 1,
  },
  {
    title: '1.5GB -₦310 30days',
    amount: 310,
    plan: '1.5GB',
    id: 2,
  },
  {
    title: '2GB -₦430 30days',
    amount: 430,
    plan: '2GB',
    id: 3,
  },
];
