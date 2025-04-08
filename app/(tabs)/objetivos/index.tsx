import {
  ErrorComponent,
  LoadingComponent,
  ObjetivoComponent,
} from "@/components";
import { Objetivo } from "@/types";
import { axiosInstance } from "@/utils/axios.utils";
import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { AnimatedFAB, Divider } from "react-native-paper";

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
  const navigation = useNavigation();
  const [objetivos, setObjetivos] = useState<Objetivo[] | undefined | null>();
  const getObjetivos = useCallback((): void => {
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
        message="Erro ao carregar objetivos"
      />
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        data={objetivos}
        renderItem={({ item }) => <ObjetivoComponent objetivo={item} />}
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
          navigation.push("create");
        }}
        visible={true}
      />
    </SafeAreaView>
  );
};

export default Objetivos;
