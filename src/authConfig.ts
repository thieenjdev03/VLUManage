import { Configuration } from "@azure/msal-browser";

const redirectUriLocal = import.meta.env.VITE_REDIRECT_URI_LOCAL;
const redirectUriSTAG = import.meta.env.VITE_REDIRECT_URI_LOGIN_STAGING;
const redirectUriPROD = import.meta.env.VITE_REDIRECT_URI_LOGIN_PROD;

const _redirectUri =
  window.location.href.includes("localhost")
    ? 'http://localhost:3039/login'
    :  window.location.href.includes("staging")
    ? redirectUriSTAG
    : 'https://vlu-manage.vercel.app/login';

export const msalConfig: Configuration = {
  auth: {
    clientId: "c6e8b39f-9e08-4ef1-86a2-0475a7c2160a",
    // authority: "https://login.microsoftonline.com/47c420ea-a706-4112-a1a4-20826de6d439",
    authority: "https://login.microsoftonline.com/common", // Cho phép Multi-Tenant
    redirectUri: _redirectUri,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true, 
  },
};
export const loginRequest = {
  scopes: ["User.Read"], 
};
