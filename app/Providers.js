'use client';

import * as React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import getLPTheme from '../src/getLPTheme';

const theme = createTheme(getLPTheme('dark'));

// Client-side providers: Emotion cache (SSR-safe), MUI theme, and i18n.
// The i18n instance initializes synchronously, so translated content is
// rendered during server-side rendering (the SEO win over the old CRA SPA).
export default function Providers({ children }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </I18nextProvider>
    </AppRouterCacheProvider>
  );
}
