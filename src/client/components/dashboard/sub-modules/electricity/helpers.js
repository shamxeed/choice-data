export const discos = [
  {
    id: '1',
    title: 'Ikeja Electric',
    value: 'ekedc',
  },
  {
    id: '2',
    title: 'Eko Electric',
    value: 'ekedc',
  },
  {
    id: '3',
    title: 'Abuja Electric',
    value: 'aedc',
  },
  {
    id: '4',
    title: 'Kano Electric',
    value: 'aedc',
  },
  {
    id: '5',
    title: 'Enugu Electric',
    value: 'aedc',
  },
  {
    id: '6',
    title: 'Port Harcourt Electric',
    value: 'aedc',
  },
  {
    id: '7',
    title: 'Ibadan Electric',
    value: 'eedc',
  },
  {
    id: '8',
    title: 'Kaduna Electric',
    value: 'eedc',
  },
  {
    id: '9',
    title: 'Jos Electric',
    value: 'eedc',
  },
  {
    id: '10',
    title: 'Benin Electric',
    value: 'eedc',
  },
  /* {
    id: '11',
    title: 'Yola Electric',
    value: 'eedc',
  }, */
].sort((a, b) => {
  return a.title === b.title ? 0 : a.title < b.title ? -1 : 1;
});
