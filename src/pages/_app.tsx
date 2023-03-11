import { AppProps } from 'next/app';
import { AuthProvider } from '../../contexts/authContext';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

import '../styles/global.scss';
import { SideBarDrawerProvider } from '../../contexts/SidebarDrawerContext';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <SideBarDrawerProvider>
            <Component {...pageProps} />
          </SideBarDrawerProvider>
        </ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp
