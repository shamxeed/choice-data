import { getConfig, getResponse } from './helpers';

export default async (props) => {
  const { config, url } = getConfig(props);

  try {
    const res = await fetch(url, config);

    return await getResponse(res, props);
  } catch (err) {
    const message = err.message;

    console.log(message, 'fetch error');
    throw new Error(message);
  }
};
