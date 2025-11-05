import { useSenhaDialog } from "@/contexts/senha-dialog.context";
import { Stack, useRouter } from "expo-router";
import { IconButton } from "react-native-paper";

const ObjetivosLayout = () => {
  const { show } = useSenhaDialog();
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Objetivos" }} />
      <Stack.Screen name="create" options={{ title: "Novo objetivo" }} />
      <Stack.Screen
        name="update"
        options={({ route }) => ({
          title: (route.params as { nome: string }).nome,
          headerRight: () => (
            <IconButton
              icon="pencil"
              onPress={() => {
                show(() => {
                  router.push(
                    `/objetivos/admin-update?nome=${(route.params as { nome: string }).nome}`,
                  );
                });
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="admin-update"
        options={({ route }) => ({
          title: (route.params as { nome: string }).nome,
        })}
      />
    </Stack>
  );
};

export default ObjetivosLayout;
