// import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
// import Head from 'next/head';

// export default function App({ Component, pageProps }) {
//   return (
//     <AppCacheProvider {...props}>
//       <Head>
//         <Component {...pageProps} />
//       </Head>
//     </AppCacheProvider>
//   );
// }

import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import "@/styles/globals.css";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </AppCacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};