import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import type { NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import FullPageLoading from '@/components/FullPageLoading';
import { AnimatePresence } from 'framer-motion';
import { CookiesProvider } from 'react-cookie';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const handleRouteChange = (url: any, { shallow }: any) => {
      console.log('handleRouteChange');
      setLoading(true);
    };

    const handleRouteChangeComplete = (url: any, { shallow }: any) => {
      console.log('handleRouteChangeComplete');
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    const handleRouteChangeError = (url: any, { shallow }: any) => {
      setLoading(false);
    };

    router.events.on('routeChangeError', handleRouteChangeError);
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeError', handleRouteChangeError);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          {loading ? (
            <FullPageLoading loading={loading} />
          ) : (
            <>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
              <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </>
          )}
        </ThemeProvider>
      </CookiesProvider>
    </CacheProvider>
  );
}
