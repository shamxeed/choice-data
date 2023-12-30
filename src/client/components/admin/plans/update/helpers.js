import { cableTypes } from '@/constants/Bundles';

export const defaultForm = {
  pin: '',
  text: '',
  service: '',
};

export const defaultPlans = {
  plan_id: '',
  title: '',
  amount: '',
  id: undefined,
  reseller_discount: '',
  api_discount: '',
  plan: '',
};

const fields = ['is_disabled', 'type', 'network', 'provider', 'id'];

export const getPlan = (data) => {
  const { value = defaultPlans } = data || {};

  return Object.keys(value).filter((key) => !fields.includes(key));
};

export const findPlanById = ({ bundles, plan_id, type }) => {
  let selected;

  if (bundles && type) {
    selected = bundles.find((i) => i.type === type && i.plan_id === plan_id);
  }

  return selected;
};

export const services = [
  /* {
    id: '1',
    value: 'Data Bundle',
  }, */
  /* {
    id: '2',
    value: 'Educational Pin',
  }, */
  {
    id: '3',
    value: 'Cable Subs',
  },
  {
    id: '4',
    value: 'Electricity',
  },
];

const edu_type = [
  {
    id: '1',
    title: 'Education',
    value: 'edu',
  },
];

const electricity_type = [
  {
    id: '1',
    title: 'Electricity',
    value: 'electricity',
  },
];

export const types_opt = {
  'Cable Subs': cableTypes,
  // 'Educational Pin': edu_type,
  Electricity: electricity_type,
};
