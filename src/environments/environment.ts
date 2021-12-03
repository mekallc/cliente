export const environment = {
  firebase: {
    projectId: 'meka-app',
    appId: '1:882572463657:web:96f5f79d52d0ef1ae69638',
    storageBucket: 'meka-app.appspot.com',
    locationId: 'southamerica-east1',
    apiKey: 'AIzaSyAZQUQ65vngYX7_MWDqYDZ5utNn9yGkiWo',
    authDomain: 'meka-app.firebaseapp.com',
    messagingSenderId: '882572463657',
    measurementId: 'G-JG99NW4H1J',
  },
  production: false,
  api: {
    url: 'https://api.meka.do/api',
    version: 'v1',
    headers: {
      // 'Content-Type':  'application/application/x-www-form-urlencoded'
    },
    admin: {email: 'knaimero@gmail.com', password: 'meka123'}
  }
};
