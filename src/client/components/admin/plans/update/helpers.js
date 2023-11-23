import { cableTypes, types } from '@/constants/Bundles';

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
};

export const getPlan = (value = defaultPlans) => {
  return Object.keys(value).filter(
    (key) =>
      key !== 'is_disabled' &&
      key !== 'type' &&
      key !== 'network' &&
      key !== 'provider' &&
      key !== 'id'
  );
};

export const findPlanById = ({ bundles, plan_id, type }) => {
  let selected;

  if (bundles && type) {
    selected = bundles.find((i) => i.type === type && i.plan_id === plan_id);
  }

  return selected || defaultPlans;
};

export const findPlan = (options) => {
  let selected;

  const { bundles, network, isData, provider, type, plan } = options;

  if (bundles && isData) {
    selected = bundles.find(
      (i) =>
        i.network === network &&
        i.type === type &&
        i.provider === provider &&
        i.plan === plan
    );
  } else if (bundles) {
    selected = findPlanById(options);
  }

  return selected || defaultPlans;
};

export const services = [
  {
    id: '1',
    value: 'Data Bundle',
  },
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
  'Data Bundle': types,
  'Cable Subs': cableTypes,
  // 'Educational Pin': edu_type,
  Electricity: electricity_type,
};
