import { config } from './utils/config';

const { redirectUri_dev, redirectUri_prod, postLogoutRedirectUri } = config;

let redirectUri: string;

if (process.env.NODE_ENV === 'development') {
  // Set redirectUri to localhost for development
  redirectUri = redirectUri_dev;
} else {
  // Set redirectUri for production or other environments
  redirectUri = redirectUri_prod;
}

export const msalConfig = {
  auth: {
    clientId: '<Application ID>',
    authority: 'https://login.microsoftonline.com/<Tenant ID>',
    redirectUri: redirectUri,
    postLogoutRedirectUri: postLogoutRedirectUri,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {},
  },
};

export const loginRequest = {
  scopes: [`${msalConfig.auth.clientId}/.default`],
};

export const silentRequest = {
  scopes: [`${msalConfig.auth.clientId}/.default`],
  loginHint: '',
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};
