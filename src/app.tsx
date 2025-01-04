import 'src/global.css';
import 'src/theme/styles/styles.scss';
import Fab from '@mui/material/Fab';
import { Router } from 'src/routes/sections';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';
import { ThemeProvider } from 'src/theme/theme-provider';
import { Iconify } from 'src/components/iconify';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './sections/auth/msalConfig';
import 'bootstrap/dist/css/bootstrap.min.css';

// ----------------------------------------------------------------------
export default function App() {
  useScrollToTop();
  const msalInstance = new PublicClientApplication(msalConfig);

  const githubButton = (
    <Fab
      size="medium"
      aria-label="Github"
      href="https://github.com/minimal-ui-kit/material-kit-react"
      sx={{
        zIndex: 9,
        right: 20,
        bottom: 20,
        width: 44,
        height: 44,
        position: 'fixed',
        bgcolor: 'grey.800',
        color: 'common.white',
      }}
    >
      <Iconify width={24} icon="eva:github-fill" />
    </Fab>
  );

  return (
    <ThemeProvider>
      <MsalProvider instance={msalInstance}>{githubButton}</MsalProvider>
      <Router />
    </ThemeProvider>
  );
}
