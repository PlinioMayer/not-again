import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import { ObjetivosProvider } from "@/contexts/objetivos.context";
import { PliniosProvider } from "@/contexts/plinios.context";
import { ErrorProvider } from "@/contexts/error.context";
import { DateProvider } from "@/contexts";

export const AppLayout = () => {
  return (
    <DateProvider>
      <ObjetivosProvider>
        <PliniosProvider>
          <PaperProvider>
            <ErrorProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </ErrorProvider>
          </PaperProvider>
        </PliniosProvider>
      </ObjetivosProvider>
    </DateProvider>
  );
};

export default AppLayout;
