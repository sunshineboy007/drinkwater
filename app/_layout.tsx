import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useDrinkingData } from '../hooks/useDrinkingData';
import { useNotifications } from '../hooks/useNotifications';

export default function RootLayout() {
  const { settings } = useDrinkingData();
  useNotifications(settings);

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
