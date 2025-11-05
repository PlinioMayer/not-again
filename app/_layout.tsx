import { PaperProvider } from "react-native-paper";
import { Stack } from "expo-router";
import { ObjetivosProvider } from "@/contexts/objetivos.context";
import { ErrorProvider } from "@/contexts/error.context";
import { PlinioProvider } from "@/contexts";
import {
  SenhaDialog,
  SenhaDialogProvider,
} from "@/contexts/senha-dialog.context";

export const AppLayout = () => {
  return (
    <ObjetivosProvider>
      <PaperProvider>
        <ErrorProvider>
          <PlinioProvider>
            <SenhaDialogProvider>
              <SenhaDialog />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(tabs)" />
              </Stack>
            </SenhaDialogProvider>
          </PlinioProvider>
        </ErrorProvider>
      </PaperProvider>
    </ObjetivosProvider>
  );
};

export default AppLayout;
