export const environment = {
  production: false,
  keycloak: {
    server_host: 'YOUR_SERVER_HOST',
    client_id: 'YOUR_CLIENT_ID',
    redirect_url: 'com.ionic.sso://callback',
    end_session_redirect_url: 'com.ionic.sso://endsession',
    scopes: 'openid offline_access',
    pkce: false
  },
  firebase: {
    projectId: 'meka-app',
    measurementId: 'G-JG99NW4H1J',
    locationId: 'southamerica-east1',
    messagingSenderId: '882572463657',
    storageBucket: 'meka-app.appspot.com',
    authDomain: 'meka-app.firebaseapp.com',
    apiKey: 'AIzaSyAZQUQ65vngYX7_MWDqYDZ5utNn9yGkiWo',
    appId: '1:882572463657:web:96f5f79d52d0ef1ae69638',
  },
  api: {
    version: 'api/v2',
    url: 'http://192.168.250.114:3000',
    // url: 'http://18.216.189.14:3000/api',
  },
  maps: 'AIzaSyAylhtwYmgO_nuFZsQzvm_z6vAOvbEk80Q',
  mapbox: ''
};
