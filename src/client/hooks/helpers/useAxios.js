import { useState } from 'react';
import Axios from 'axios';

const dev = 'http://localhost:3000/api';
const prod = 'https://www.choicedataservice.com/api';

export const endpoint = process.env.NODE_ENV === 'production' ? prod : dev;

const axiosInstance = Axios.create({
  baseURL: endpoint,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAxios = () => {
  const [isLoading, setLoading] = useState(undefined);

  const axios = async (props) => {
    const token = localStorage.getItem('token');

    try {
      setLoading(true);

      const { data: response } = await axiosInstance({
        ...props,
        headers: {
          'x-auth-token': token,
        },
      });

      setLoading(false);

      return response;
    } catch (err) {
      setLoading(false);

      if (err.response) {
        throw new Error(err.response.data.msg);
      } else if (err.request) {
        if (err?.message?.includes('Network')) {
          throw new Error(err.message);
        }
        throw new Error(err.request._response);
      } else {
        throw new Error('Oops! Something went wrong!');
      }
    }
  };

  return {
    axios,
    isLoading,
  };
};
