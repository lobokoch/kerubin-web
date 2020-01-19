export const environment = {
  production: true,

  apiUrl: 'http://www.kerubin.com.br:9090/api',
  authApiUrl: 'http://www.kerubin.com.br:9090/api',
  // tokenWhitelistedDomains: [ 'kerubin.com.br', 'www.kerubin.com.br', 'www.kerubin.com.br:9090' ],
  tokenWhitelistedDomains: [ 'www.kerubin.com.br:9090' ],
  tokenBlacklistedRoutes: [ new RegExp('\/api\/oauth\/token'), 'www.kerubin.com.br:9090/api/oauth/token' ]
};
