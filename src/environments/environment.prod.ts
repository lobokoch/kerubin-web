export const environment = {
  production: true,

  apiUrl: 'http://www.kerubin.com.br/api',
  authApiUrl: 'http://www.kerubin.com.br/api',
  tokenWhitelistedDomains: [ new RegExp('www.kerubin.com.br') ],
  tokenBlacklistedRoutes: [ new RegExp('\/oauth\/token') ]
};
