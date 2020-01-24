export const environment = {
  production: true,

  apiUrl: 'https://www.kerubin.com.br/api',
  authApiUrl: 'https://www.kerubin.com.br/api',
  tokenWhitelistedDomains: [ 'www.kerubin.com.br' ],

  tokenBlacklistedRoutes: [ 'www.kerubin.com.br/api/oauth/token', 'https://www.kerubin.com.br/api/oauth/token' ]
};
