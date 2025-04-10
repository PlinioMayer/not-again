import { useObjetivos } from "@/contexts";
import { Stack } from "expo-router";

const ObjetivosLayout = () => {
  const { get } = useObjetivos();

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Objetivos" }} />
      <Stack.Screen name="create" options={{ title: "Novo objetivo" }} />
      <Stack.Screen
        name="update"
        options={({
          route,
        }: {
          route: { params: { objetivoId: string } };
        }) => ({
          title: get(route.params.objetivoId)?.nome,
        })}
      />
    </Stack>
  );
};

export default ObjetivosLayout;
