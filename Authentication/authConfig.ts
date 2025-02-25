let redirectUri: string;

if (process.env.NODE_ENV === 'development') {
  // Set redirectUri to localhost for development
  redirectUri = 'http://localhost:5173/sites/<Site Name>';
} else {
  // Set redirectUri for production or other environments
  redirectUri = 'https://portal.horrocks.com/sites/<Site Name>';
}

export const msalConfig = {
  auth: {
    clientId: '<Application ID>',
    authority: 'https://login.microsoftonline.com/<Tenant ID>',
    redirectUri: redirectUri,
    postLogoutRedirectUri: 'https://portal.horrocks.com/sites/<Site Name>',
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
