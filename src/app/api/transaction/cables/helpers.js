const ids = {
  gotv: 1,
  dstv: 2,
  startimes: 3,
};

export const get_cable_id = ({ type }) => {
  return ids[type];
};
