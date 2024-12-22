import { Configuration } from "@azure/msal-browser";

const redirectUriLocal = import.meta.env.VITE_URI_LOGIN_DEV;
const redirectUriSTAG = import.meta.env.VITE_REDIRECT_URI_LOGIN_STAGING;
const redirectUriPROD = import.meta.env.VITE_REDIRECT_URI_LOGIN_PROD;

const _redirectUri =
  window.location.href.includes("localhost")
    ? redirectUriLocal :  window.location.href.includes("staging") ? redirectUriSTAG : redirectUriPROD;

console.log('redirectUri', _redirectUri);
export const msalConfig: Configuration = {
  auth: {
    clientId: "c6e8b39f-9e08-4ef1-86a2-0475a7c2160a",
    authority: "https://login.microsoftonline.com/common", 
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
