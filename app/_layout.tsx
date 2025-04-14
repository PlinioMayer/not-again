import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import { ObjetivosProvider } from "@/contexts/objetivos.context";
import { ErrorProvider } from "@/contexts/error.context";
import { DateProvider, PlinioProvider } from "@/contexts";

export const AppLayout = () => {
  return (
    <DateProvider>
      <ObjetivosProvider>
        <PaperProvider>
          <ErrorProvider>
            <PlinioProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </PlinioProvider>
          </ErrorProvider>
        </PaperProvider>
      </ObjetivosProvider>
    </DateProvider>
  );
};

export default AppLayout;
