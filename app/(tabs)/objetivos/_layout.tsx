import { Stack } from "expo-router";

const ObjetivosLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ title: "Objetivos" }} />
    <Stack.Screen name="create" options={{ title: "Novo objetivo" }} />
    <Stack.Screen
      name="update"
      options={({ route }: { route: { params: { nome: string } } }) => ({
        title: route.params.nome,
      })}
    />
  </Stack>
);

export default ObjetivosLayout;
