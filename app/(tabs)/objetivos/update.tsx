import {
  ContadorComponent,
  ErrorComponent,
  LoadingComponent,
} from "@/components";
import { useDate, useError } from "@/contexts";
import { useObjetivos } from "@/contexts/objetivos.context";
import { Objetivo } from "@/types";
import { daysBetween } from "@/utils/date.utils";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  contadorContainer: {
    width: "80%",
    flexDirection: "row",
    gap: 10,
  },
  contador: {
    height: 40,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 40,
  },
  perdidoHeadline: {
    textAlign: "center",
  },
});

const Conteudo = ({
  objetivo,
  setLoading,
}: {
  objetivo: Objetivo;
  setLoading: (loading: boolean) => void;
}) => {
  const { update, fetch } = useObjetivos();
  const theme = useTheme();
  const { today } = useDate();
  const dias = daysBetween(objetivo.fim, today);
  const { setError } = useError();

  const updateObjetivo = useCallback(async () => {
    setLoading(true);
    const res = await update(objetivo.documentId, { fim: "today" });

    if (!res) {
      setLoading(false);
      setError("Erro ao atualizar objetivo.");
      return;
    }

    await fetch();
    setLoading(false);
  }, [update, setLoading, setError, fetch, objetivo]);

  const resetObjetivo = useCallback(async () => {
    setLoading(true);
    const res = await update(objetivo.documentId, {
      inicio: today,
      fim: today,
    });
    setLoading(false);

    if (!res) {
      setError("Erro ao atualizar objetivo.");
      return;
    }
  }, [update, setLoading, setError, today, objetivo.documentId]);

  switch (dias) {
    case 0:
      return <Text variant="headlineMedium">Volte amanhã</Text>;

    case 1:
      return (
        <>
          <Text variant="headlineMedium">Mais um dia?</Text>

          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              buttonColor="#5cb85c"
              onPress={updateObjetivo}
            >
              Sim
            </Button>
            <Button mode="contained" buttonColor={theme.colors.error}>
              Não
            </Button>
          </View>
        </>
      );

    default:
      return (
        <>
          <Text variant="headlineSmall" style={styles.perdidoHeadline}>
            {"Objetivo perdido.\nDeseja reiniciar?"}
          </Text>

          <View style={styles.buttonsContainer}>
            <Button
              mode="contained"
              buttonColor="#5cb85c"
              onPress={resetObjetivo}
            >
              Sim
            </Button>
            <Button mode="contained" buttonColor={theme.colors.error}>
              Não
            </Button>
          </View>
        </>
      );
  }
};

const ObjetivosUpdate = () => {
  const { objetivoId } = useLocalSearchParams();
  const { get, fetch } = useObjetivos();
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return <LoadingComponent />;
  }
  const objetivo = get(objetivoId as string);

  if (!objetivo) {
    return <ErrorComponent reload={fetch} message="Qual é o meu objetivo???" />;
  }

  const daysBetweenInicioFim = daysBetween(objetivo.inicio, objetivo.fim);

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.contadorContainer}>
        <ContadorComponent
          value={daysBetweenInicioFim}
          style={styles.contador}
        />
        <Text variant="headlineLarge">Dias</Text>
      </View>

      <Conteudo objetivo={objetivo} setLoading={setLoading} />
    </SafeAreaView>
  );
};

export default ObjetivosUpdate;
