import { Stack } from "expo-router";

const ObjetivosLayout = () => (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="index" />
    <Stack.Screen
      name="create"
      options={{ headerShown: true, title: "Novo objetivo" }}
    />
  </Stack>
);

export default ObjetivosLayout;
