export const errMessage = (err) => {
  let message = 'Oops! Something went wrong!!';

  if (err?.message) {
    message = err?.message;
  }

  return message;
};

const networksId = {
  MTN: 1,
  Glo: 2,
  '9Mobile': 3,
  Airtel: 4,
};

export const getNetworkId = (network) => networksId[network];

export const calcPercentage = (amount, percentage = 1.5) => {
  return Math.trunc((amount * percentage) / 100);
};

export const getCustomerId = (name) => {
  const date = new Date();

  const hr = date.getHours();
  const mm = date.getMinutes();
  let day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const hrs = ('0' + hr).slice(-2);

  if (day.toString().length < 2) {
    day = '0' + day;
  }

  return `${year}0${month + 1}${day}${hrs}${mm}${name}`;
};

export const debitInProgress = (props) => {
  const { body, data, setAlert, axios, url = '/others' } = props;

  const api_response = 'Your transaction has been sent for processing...';

  if (!body || body === ' ' || body === 'Oops! Something went wrong!!') {
    axios({
      method: 'post',
      data: { ...data, api_response },
      url: `/transaction/retry${url}`,
    });

    setAlert({
      type: 'success',
      title: 'Transaction Proccessing!',
      body: api_response,
    });
  } else {
    setAlert({ body });
  }
};
