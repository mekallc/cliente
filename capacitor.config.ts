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
      launchAutoHide: true,
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
    preferences: {
      LottieFullScreen: 'true',
      LottieHideAfterAnimationEnd: 'true',
      LottieAnimationLocation: 'public/assets/splash.json'
    }
  },
  server: {
    cleartext: true,
    url: 'http://192.168.250.114:8105',
  },
};

export default config;
