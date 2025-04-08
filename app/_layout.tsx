import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

export const RootLayout = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default RootLayout;
