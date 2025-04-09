import { Stack } from "expo-router";

const ObjetivosLayout = () => (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="create" options={{ title: "Novo objetivo" }} />
    <Stack.Screen
      name="update"
      options={({ route }: { route: { params: { objetivo: string } } }) => ({
        title: JSON.parse(route.params.objetivo).nome,
      })}
    />
  </Stack>
);

export default ObjetivosLayout;
