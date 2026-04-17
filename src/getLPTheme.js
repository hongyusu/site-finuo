export default function getLPTheme(mode) {
  return {
    palette: {
      mode: 'dark',
      primary: { main: '#C4A35A', light: '#D4B76A', dark: '#A48840' },
      secondary: { main: '#F5F2ED' },
      background: {
        default: '#0D0D0D',
        paper: '#141414',
      },
      text: {
        primary: '#F5F2ED',
        secondary: 'rgba(245, 242, 237, 0.6)',
      },
      divider: 'rgba(245, 242, 237, 0.08)',
    },
    typography: {
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      h1: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 400,
        fontSize: 'clamp(3rem, 7vw, 6.5rem)',
        lineHeight: 1.1,
        letterSpacing: '0.02em',
      },
      h2: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 400,
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        lineHeight: 1.15,
        letterSpacing: '0.02em',
      },
      h3: {
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontWeight: 500,
        fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
        lineHeight: 1.3,
      },
      h4: {
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        fontSize: '1.1rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
      h5: {
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: '1rem',
      },
      h6: {
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: '0.875rem',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
      },
      body1: {
        fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
        lineHeight: 1.65,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
      },
      caption: {
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(245, 242, 237, 0.35)',
      },
      button: {
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: '0.8rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
    },
    shape: { borderRadius: 2 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { background: '#0D0D0D', color: '#F5F2ED' },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            padding: '12px 32px',
            transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
          },
          outlined: {
            borderColor: 'rgba(245, 242, 237, 0.2)',
            color: '#F5F2ED',
            '&:hover': { borderColor: '#C4A35A', color: '#C4A35A', background: 'transparent' },
          },
          contained: {
            background: '#C4A35A',
            color: '#0D0D0D',
            '&:hover': { background: '#D4B76A' },
          },
          text: {
            color: '#F5F2ED',
            '&:hover': { background: 'rgba(245, 242, 237, 0.05)' },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: '#141414',
            borderRadius: 2,
            border: '1px solid rgba(245, 242, 237, 0.06)',
            transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
            '&:hover': { border: '1px solid rgba(245, 242, 237, 0.12)' },
          },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { background: '#141414' } },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            background: 'transparent',
            borderBottom: '1px solid rgba(245, 242, 237, 0.08)',
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: { root: { padding: '16px 0' } },
      },
      MuiAccordionDetails: {
        styleOverrides: { root: { padding: '0 0 24px 0' } },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: 'rgba(245, 242, 237, 0.08)' } },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 2,
            background: 'rgba(245, 242, 237, 0.06)',
            color: 'rgba(245, 242, 237, 0.6)',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            background: '#1A1A1A',
            borderRadius: 2,
          },
        },
      },
    },
  };
}
