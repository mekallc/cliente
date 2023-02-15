import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.mekadevelopments.cliente',
  appName: 'Meka',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchAutoHide: true,
      splashImmersive: false,
      splashFullScreen: false,
      launchShowDuration: 1000,
      backgroundColor: '#222428',
      spinnerColor: '#E7B63A',
      androidScaleType: 'CENTER_CROP',
      androidSplashResourceName: 'splash',
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_ionic_logo',
      iconColor: '#1F1F1F',
      sound: 'beep.wav',
    },
    CapacitorCookies: {
      enabled: true,
    },
  },
  android: {
    allowMixedContent: true
  },
  cordova: {
  },
  // server: {
  //   cleartext: true,
  //   url: 'http://192.168.250.114:8105',
  // },
};

export default config;
