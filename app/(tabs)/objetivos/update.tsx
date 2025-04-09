import {
  ContadorComponent,
  ErrorComponent,
  LoadingComponent,
} from "@/components";
import { axiosInstance } from "@/utils";
import { daysBetween } from "@/utils/date.utils";
import { useLocalSearchParams } from "expo-router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, MD3Theme, Text, useTheme } from "react-native-paper";

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

const getConteudo = (dias: number, theme: MD3Theme): ReactNode => {
  switch (dias) {
    case 0:
      return <Text variant="headlineMedium">Volte amanhã</Text>;

    case 1:
      return (
        <>
          <Text variant="headlineMedium">Mais um dia?</Text>

          <View style={styles.buttonsContainer}>
            <Button mode="contained" buttonColor="#5cb85c">
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
            <Button mode="contained" buttonColor="#5cb85c">
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
  const theme = useTheme();
  const [today, setToday] = useState<string | undefined | null>();
  const { inicio, fim } = useLocalSearchParams();
  const getToday = useCallback(() => {
    axiosInstance.utils.today().then(setToday);
  }, [setToday]);

  useEffect(() => {
    getToday();
  }, [getToday]);

  if (today === undefined) {
    return <LoadingComponent />;
  }

  if (today === null) {
    return (
      <ErrorComponent reload={getToday} message="Não sei que dia é hoje" />
    );
  }

  const daysBetweenFimHoje = daysBetween(
    new Date(fim as string),
    new Date(today),
  );

  const daysBetweenInicioFim = daysBetween(
    new Date(inicio as string),
    new Date(fim as string),
  );

  if (today)
    return (
      <SafeAreaView style={styles.main}>
        <View style={styles.contadorContainer}>
          <ContadorComponent
            value={daysBetweenInicioFim}
            style={styles.contador}
          />
          <Text variant="headlineLarge">Dias</Text>
        </View>

        {getConteudo(daysBetweenFimHoje, theme)}
      </SafeAreaView>
    );
};

export default ObjetivosUpdate;
