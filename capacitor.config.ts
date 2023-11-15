import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zacblinn.myworkday',
  appName: 'my-work-day',
  webDir: 'dist/my-work-day-back',
  server: {
    androidScheme: 'http',
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true
    }
  },
  loggingBehavior: 'debug'
};

export default config;
