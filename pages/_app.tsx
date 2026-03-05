import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeSettings } from "../src/data/theme/Theme";
import createEmotionCache from "../src/createEmotionCache";
import { Provider } from "react-redux";
import Store, { persistor } from "../src/store/Store";
import RTL from "../src/layouts/theme/full/shared/customizer/RTL";
import { useSelector } from "../src/store/Store";
import { AppState } from "../src/store/Store";

import BlankLayout from "../src/layouts/theme/blank/BlankLayout";
import FullLayout from "../src/layouts/theme/full/FullLayout";

import "../src/utils/i18n";

import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

// CSS FILES

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const layouts: any = {
  Blank: BlankLayout,
};

const MyApp = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  }: any = props;
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);
  const Layout = layouts[Component.layout] || FullLayout;


  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>Basic Project</title>
      </Head>
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RTL>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default (props: MyAppProps) => (
  <Provider store={Store}>
    <PersistGate persistor={persistor}>
      <Toaster />
      <MyApp {...props} />
    </PersistGate>
  </Provider>
);
