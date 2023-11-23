export const getPlans = ({ plans = [], network, type }) => {
  let result = [];

  if (type !== 'airtime') {
    const filtered = plans.filter(
      (i) => i.network === network && i.type === type
    );

    result = filtered.sort((a, b) => a.amount - b.amount);
  } else {
    const filtered = plans.filter((i) => i.type === type);

    result = filtered;
  }

  return result;
};

export const getPlansByType = ({ plans = [], type }) => {
  let result = [];

  const filtered = plans.filter((i) => i.type === type);

  result = filtered.sort((a, b) => a.amount - b.amount);

  return result;
};
