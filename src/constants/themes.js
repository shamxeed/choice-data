import { extendTheme } from '@chakra-ui/react';

export const colors = {
  primary: '#461257',
  white: '#ffffff',
  bg: '#f5f6fa',
  gray: 'rgba(0,0,0,0.7)',
  red: '#FC2947',
  blue: '#2F58CD',
};

export const theme = extendTheme({
  fonts: {
    body: `'DM Sans', sans-serif`,
  },
});
