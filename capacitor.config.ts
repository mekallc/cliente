import { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.mekadevelopments.cliente',
  appName: 'Meka',
  webDir: 'www',
  bundledWebRuntime: true,
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_ionic_logo',
      iconColor: '#4d4d4d',
      sound: 'beep.wav',
    },
    CapacitorCookies: {
      enabled: true,
    },
  },
  android: {
    allowMixedContent: true
  },
  server: {
    cleartext: true,
    url: 'http://192.168.0.226:8102',
  },
};

export default config;
