export const getBundles = (prices, network) => {
  let result = [];

  if (prices && network) {
    const filtered = prices.filter(
      (i) =>
        i.network === network &&
        !i.type?.includes('coupon') &&
        !i.type?.includes('card')
    );

    result = filtered.sort((a, b) => a.amount - b.amount);
  }

  return result;
};

export const getBundlesByType = (bundles, network, type) => {
  let result = [];

  if (bundles) {
    const filtered = bundles.filter(
      (i) => i.network === network && i.type === type
    );

    result = filtered.sort((a, b) => a.amount - b.amount);
  }

  return result;
};
