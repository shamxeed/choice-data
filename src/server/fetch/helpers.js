import { APIs } from '../utils/api';

export const getConfig = (props) => {
  const { url, rawBody, provider = 'kvdata', token, ...rest } = props || {};

  let body = JSON.stringify(rawBody);

  const { baseURL, ...res } = APIs[provider];

  const isMonnify = provider === 'monnify';

  const headers =
    token && !isMonnify
      ? {
          'b-access-token': token,
        }
      : {};

  if (token && isMonnify) {
    res.Authorization = `Bearer ${token}`;
  }

  let config = {
    method: 'post',
    headers: {
      ...res,
      ...headers,
      'Content-Type': 'application/json',
    },
    body,
    ...rest,
  };

  return {
    config,
    url: `${baseURL}${url}`,
  };
};

let response;

export const getResponse = async (res, props) => {
  const { provider = 'kvdata' } = props;

  if (res.ok) {
    response = await res.json();
  } else {
    const error = JSON.parse(await res.text());

    const isMonnify = provider === 'monnify';

    const isPayscribe = provider === 'payscribe';

    if (isMonnify) {
      if (error) {
        return error;
      } else {
        return { requestSuccessful: false };
      }
    } else if (isPayscribe) {
      if (error.data) {
        console.log(error.data, 'error from response');
        return error.data;
      }
      throw new Error(error.message.description);
    } else if (error) {
      if (error?.data?.message) {
        throw new Error(error?.data?.message);
      } else if (error?.data?.detail) {
        throw new Error(error?.data?.detail);
      } else if (error?.data?.error) {
        throw new Error(error?.data?.error[0]);
      }
    }
  }

  return response;
};
