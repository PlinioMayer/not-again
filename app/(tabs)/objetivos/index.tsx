import {
  ErrorComponent,
  LoadingComponent,
  ObjetivoComponent,
} from "@/components";
import { useDate } from "@/contexts";
import { useObjetivos } from "@/contexts/objetivos.context";
import { Objetivo } from "@/types";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { AnimatedFAB, Button, Dialog, Portal, Text } from "react-native-paper";

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  fab: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    textAlign: "center",
  },
});

const Objetivos = () => {
  const { fetch: fetchDate } = useDate();
  const router = useRouter();
  const { objetivos, fetch: fetchObjetivos, delette } = useObjetivos();
  const [deletable, setDeletable] = useState<Objetivo | undefined>();

  const fetch = useCallback(() => {
    fetchDate();
    fetchObjetivos();
  }, [fetchDate, fetchObjetivos]);

  const clearDeletable = useCallback(() => {
    setDeletable(undefined);
  }, [setDeletable]);

  const onDelete = useCallback(async () => {
    await delette(deletable!.documentId);
    clearDeletable();
    await fetch();
  }, [deletable, clearDeletable, fetch, delette]);

  if (objetivos === undefined) {
    return <LoadingComponent />;
  }

  if (objetivos === null) {
    return (
      <ErrorComponent reload={fetch} message="Quais são meus objetivos???" />
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <Portal>
        <Dialog visible={!!deletable} onDismiss={clearDeletable}>
          <Dialog.Title>Deletar {deletable?.nome}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Vai deletar mermo?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={clearDeletable}>Não</Button>
            <Button onPress={onDelete}>Sim</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FlatList
        contentContainerStyle={!objetivos.length ? styles.contentContainer : {}}
        data={objetivos}
        ListEmptyComponent={() => (
          <Text variant="headlineSmall" style={styles.emptyListText}>
            Adicione um objetivo para começar
          </Text>
        )}
        renderItem={({ item }) => (
          <ObjetivoComponent
            onDelete={() => setDeletable(item)}
            onPress={() => {
              router.push(`/objetivos/update?objetivoId=${item.documentId}`);
            }}
            objetivo={item}
          />
        )}
        keyExtractor={(item) => item.documentId}
        onRefresh={fetch}
        refreshing={objetivos === undefined}
      />
      <AnimatedFAB
        style={styles.fab}
        icon="plus"
        label="Label"
        extended={false}
        onPress={() => {
          router.push("/objetivos/create");
        }}
        visible={true}
      />
    </SafeAreaView>
  );
};

export default Objetivos;
