import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.zacblinn.myworkday',
  appName: 'my-work-day',
  webDir: 'dist/my-work-day',
  server: {
    androidScheme: 'https'
  }
};

export default config;
