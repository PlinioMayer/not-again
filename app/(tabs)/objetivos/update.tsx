import { ContadorComponent } from "@/components";
import { daysBetween } from "@/utils/date.utils";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  contador: {
    height: 40,
    flex: undefined,
  },
});

const ObjetivosUpdate = () => {
  const objetivo = JSON.parse(useLocalSearchParams().objetivo as string);
  objetivo.inicio = new Date(objetivo.inicio);
  objetivo.fim = new Date(objetivo.fim);

  return (
    <SafeAreaView style={styles.main}>
      <ContadorComponent
        value={daysBetween(objetivo.inicio, objetivo.fim)}
        style={styles.contador}
      />
    </SafeAreaView>
  );
};

export default ObjetivosUpdate;
