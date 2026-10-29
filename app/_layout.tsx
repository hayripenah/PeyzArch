import {
  Fraunces_400Regular,
  Fraunces_600SemiBold,
} from '@expo-google-fonts/fraunces';
import {
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
} from '@expo-google-fonts/source-sans-3';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { colors } from '../src/theme/colors';

export { ErrorBoundary } from 'expo-router';

if (Platform.OS === 'web') {
  // Metro web CSS — StyleSheet enjekte olmasa bile zemin/font tutar
  require('../src/styles/global.css');
}

SplashScreen.preventAutoHideAsync().catch(() => undefined);

export default function RootLayout() {
  const [loaded] = useFonts({
    Fraunces_400Regular,
    Fraunces_600SemiBold,
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync().catch(() => undefined);
  }, [loaded]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
