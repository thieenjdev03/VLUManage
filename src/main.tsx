import ReactDOM from 'react-dom/client';
import { Suspense, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { msalConfig } from "src/authConfig";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import App from './app';


// ----------------------------------------------------------------------
const msalInstance = new PublicClientApplication(msalConfig);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
        <MsalProvider instance={msalInstance}>
            <App />
            </MsalProvider>

        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
