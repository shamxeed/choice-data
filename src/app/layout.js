'use client';

import '@fontsource/dm-sans/700.css';
import '@fontsource/dm-sans/400.css';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

import { AppStateProvider } from '@/client/hooks/helpers/useStore';
import { theme } from '@/constants/themes';

/* export const metadata = {
  title: 'Saukie.net',
  description: 'Cheap Data, Airtime, Bill vendor',
}; */

const RootLayout = ({ children }) => {
  return (
    <html lang='en' title='Saukie.net'>
      <body>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <AppStateProvider>{children}</AppStateProvider>
          </ChakraProvider>
        </CacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
