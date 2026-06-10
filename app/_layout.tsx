import { Stack } from 'expo-router';
import { MissionProvider } from '../context/MissionContext';

export default function Layout() {
  return (
    <MissionProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </MissionProvider>
  );
}
