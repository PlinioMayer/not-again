import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import { AxiosProvider } from "@/contexts";

export const RootLayout = () => {
  return (
    <AxiosProvider>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </PaperProvider>
    </AxiosProvider>
  );
};

export default RootLayout;
