import { types } from '@/constants/Bundles';

export const filterTypes = (net) => {
  let result = [];

  if (net) {
    result = types.filter(
      (i) => i.networks.includes(net) && i.value !== 'data_card'
    );
  }

  return result;
};
