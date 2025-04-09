import {
  ErrorComponent,
  LoadingComponent,
  ObjetivoComponent,
} from "@/components";
import { Objetivo } from "@/types";
import { axiosInstance } from "@/utils/axios.utils";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { AnimatedFAB } from "react-native-paper";

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  fab: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});

const Objetivos = () => {
  const router = useRouter();
  const [objetivos, setObjetivos] = useState<Objetivo[] | undefined | null>();
  const getObjetivos = useCallback((): void => {
    setObjetivos(undefined);
    axiosInstance.objetivos.get().then((objetivos) => {
      setObjetivos(objetivos);
    });
  }, [setObjetivos]);

  useEffect(getObjetivos, [getObjetivos]);

  if (objetivos === undefined) {
    return <LoadingComponent />;
  }

  if (objetivos === null) {
    return (
      <ErrorComponent
        reload={getObjetivos}
        message="Quais são meus objetivos???"
      />
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        data={objetivos}
        renderItem={({ item }) => (
          <ObjetivoComponent
            onPress={() => {
              router.push(
                `/objetivos/update?inicio=${item.inicio}&fim=${item.fim}&nome=${item.nome}`,
              );
            }}
            objetivo={item}
          />
        )}
        keyExtractor={(item) => item.documentId}
        onRefresh={getObjetivos}
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
