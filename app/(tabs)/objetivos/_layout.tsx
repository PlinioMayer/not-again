import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Button, Dialog, IconButton, Portal, Text } from "react-native-paper";

const ObjetivosLayout = () => {
  const [nome, setNome] = useState<string | undefined>();
  const router = useRouter();

  return (
    <>
      <Portal>
        <Dialog visible={!!nome} onDismiss={() => setNome(undefined)}>
          <Dialog.Title>Você é o Plínio?</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Senha</Text>
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "space-between" }}>
            <Button
              onPress={() => {
                setNome(undefined);
              }}
            >
              Não
            </Button>
            <Button
              onPress={() => {
                router.push(`/objetivos/admin-update?nome=${nome}`);
                setNome(undefined);
              }}
            >
              Sim
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Objetivos" }} />
        <Stack.Screen name="create" options={{ title: "Novo objetivo" }} />
        <Stack.Screen
          name="update"
          options={({ route }) => ({
            title: (route.params as { nome: string }).nome,
            headerRight: () => (
              <IconButton
                icon="dots-vertical"
                onPress={() => setNome((route.params as { nome: string }).nome)}
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
    </>
  );
};

export default ObjetivosLayout;
