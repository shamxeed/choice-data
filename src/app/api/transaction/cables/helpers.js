const ids = {
  gotv: 'GOTV',
  dstv: 'DSTV',
  startimes: 'STARTIMES',
};

const numeric_ids = {
  gotv: 1,
  dstv: 2,
  startimes: 3,
};

export const get_cable_id = ({ type }) => {
  return ids[type];
};

export const get_cable_numeric_id = ({ type }) => {
  return numeric_ids[type];
};
