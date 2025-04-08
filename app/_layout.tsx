import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";

export const AppLayout = () => {
  return (
    <PaperProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
};

export default AppLayout;
