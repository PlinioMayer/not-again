import { ObjetivoComponent } from "@/components";
import { useObjetivos } from "@/contexts/objetivos.context";
import { useRouter } from "expo-router";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { AnimatedFAB, Text } from "react-native-paper";

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
  const { objetivos, fetchObjetivos } = useObjetivos();

  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        data={objetivos}
        ListEmptyComponent={() => (
          <Text variant="headlineMedium">
            Adicione um objetivo para começar
          </Text>
        )}
        renderItem={({ item }) => (
          <ObjetivoComponent
            onPress={() => {
              router.push(`/objetivos/update?objetivoId=${item.documentId}`);
            }}
            objetivo={item}
          />
        )}
        keyExtractor={(item) => item.documentId}
        onRefresh={fetchObjetivos}
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
