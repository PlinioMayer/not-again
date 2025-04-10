import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import { ObjetivosProvider } from "@/contexts/objetivos.context";
import { PliniosProvider } from "@/contexts/plinios.context";

export const AppLayout = () => {
  return (
    <ObjetivosProvider>
      <PliniosProvider>
        <PaperProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </PaperProvider>
      </PliniosProvider>
    </ObjetivosProvider>
  );
};

export default AppLayout;
