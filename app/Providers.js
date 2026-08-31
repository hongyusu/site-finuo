'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import { getI18n } from '../src/i18n';
import getLPTheme from '../src/getLPTheme';

const theme = createTheme(getLPTheme('dark'));

// Client-side providers: Emotion cache (SSR-safe), MUI theme, and i18n.
// The i18n instance for the route's language initializes synchronously, so
// translated content is rendered during SSR (the SEO win over the old CRA SPA).
export default function Providers({ children, lang = 'zh' }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <I18nextProvider i18n={getI18n(lang)}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </AppRouterCacheProvider>
  );
}
