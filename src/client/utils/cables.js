const alphas = {
  1: 'One Month',
  2: 'Two Months',
  3: 'Three Months',
  4: 'Four Months',
  5: 'Five Months',
  6: 'Six Months',
  7: 'Seven Months',
  8: 'Eight Months',
  9: 'Nine Months',
  10: 'Ten Months',
  11: 'Eleven Months',
  12: 'One Year',
};

export const getPackages = (packages, biller) => {
  const dstv_padi = packages['Padi'] || [];
  const dstv_comp = packages['DStv Compact'] || [];
  const dstv_comp_plus = packages['DStv Compact Plus'] || [];
  const dstv_comf_bou_e36 = packages['DStv Confam Bouquet E36'] || [];
  const dstv_yanga_bou_e36 = packages['DStv Yanga Bouquet E36'] || [];
  const dstv_premium = packages['DStv Premium'] || [];

  const gotv_small = packages['GOtv Smallie - monthly'] || [];
  const gotv_jinja = packages['GOtv Jinja Bouquet'] || [];
  const gotv_jolli = packages['GOtv Jolli Bouquet'] || [];
  const gotv_max = packages['GOtv Max'] || [];
  const gotv_supa = packages['GOtv Supa'] || [];

  const dstv = [
    ...dstv_padi,
    ...dstv_comp,
    ...dstv_comp_plus,
    ...dstv_comf_bou_e36,
    ...dstv_yanga_bou_e36,
    ...dstv_premium,
  ];

  const gotv = [
    ...gotv_small,
    ...gotv_jinja,
    ...gotv_jolli,
    ...gotv_max,
    ...gotv_supa,
  ];

  const startimes_nova_daily = packages['Nova (Antenna) - Daily'] || [];
  const startimes_nova_dish_daily = packages['Nova (Dish) - Daily'] || [];
  const startimes_nova_weekly = packages['Nova (Antenna) - Weekly'] || [];
  const startimes_nova_dish_weekly = packages['Nova (Dish) - Weekly'] || [];
  const startimes_nova_monthly = packages['Nova (Antenna) - Monthly'] || [];
  const startimes_nova_dish_monthly = packages['Nova (Dish) - Monthly'] || [];

  const startimes_basic_daily = packages[' Basic (Antenna) - Daily'] || [];
  const startimes_basic_weekly = packages['Basic (Antenna) - Weekly'] || [];
  const startimes_basic_monthly = packages['Basic (Antenna) - Monthly'] || [];

  const startimes_classic_daily = packages['Classic (Antenna) - Daily'] || [];
  const startimes_classic_weekly = packages['Classic (Antenna) - Weekly'] || [];
  const startimes_classic_monthly =
    packages['Classic (Antenna) - Monthly'] || [];

  const startimes = [
    startimes_nova_daily[0],
    startimes_nova_dish_daily[0],
    startimes_nova_weekly[0],
    startimes_nova_dish_weekly[0],
    startimes_nova_monthly[0],
    startimes_nova_dish_monthly[0],
    startimes_basic_daily[0],
    startimes_basic_weekly[0],
    startimes_basic_monthly[0],
    startimes_classic_daily[0],
    startimes_classic_weekly[0],
    startimes_classic_monthly[0],
  ];

  if (biller) {
    dstv?.forEach((i) => {
      if (!i?.title?.includes(i?.price)) {
        i.title = `${i?.title} => ${alphas[i?.months]} -₦${i?.price}`;
      }
    });

    gotv?.forEach((i) => {
      if (!i?.title?.includes(i?.price)) {
        i.title = `${i?.title} => ${alphas[i?.months]} -₦${i?.price}`;
      }
    });

    startimes?.forEach((i) => {
      if (!i?.title?.includes(i?.price)) {
        i.title = `${i?.title} -₦${i?.price}`;
      }
    });
  }

  const cable_packs = {
    dstv,
    gotv,
    startimes,
  };

  return cable_packs[biller];
};
