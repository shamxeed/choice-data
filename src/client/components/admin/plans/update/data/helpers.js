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

const fields = ['is_disabled', 'type', 'network', 'provider', 'id'];

export const getPlan = (data) => {
  const { value = defaultPlans } = data || {};

  return Object.keys(value).filter((key) => !fields.includes(key));
};

export const findPlan = (options) => {
  const { bundles, network, provider, type, plan } = options;

  return (
    bundles.find(
      (i) =>
        i.network === network &&
        i.type === type &&
        i.provider === provider &&
        i.plan === plan
    ) || defaultPlans
  );
};
