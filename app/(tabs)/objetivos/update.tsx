import {
  ContadorComponent,
  ErrorComponent,
  LoadingComponent,
} from "@/components";
import { useError, usePlinio } from "@/contexts";
import { useObjetivos } from "@/contexts/objetivos.context";
import { Objetivo, Plinio } from "@/types";
import { daysBetween } from "@/utils/date.utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

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
  confetti: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

const Conteudo = ({
  objetivo,
  setLoading,
  setPlinio,
}: {
  objetivo: Objetivo;
  setLoading: (loading: boolean) => void;
  setPlinio: (plinio: Plinio | undefined) => void;
}) => {
  const { update, delette, create } = useObjetivos();
  const theme = useTheme();
  const today = new Date();
  const dias = daysBetween(objetivo.fim, today);
  const { setError } = useError();
  const router = useRouter();

  const updateObjetivo = useCallback(async () => {
    setLoading(true);
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const res = await update(objetivo.nome, { fim: today });
    setPlinio(res);
    setLoading(false);
  }, [update, setLoading, objetivo.nome, today, setPlinio]);

  const resetObjetivo = useCallback(async () => {
    const message = "Erro ao resetar objetivo.";
    setLoading(true);
    const deleted = await delette(objetivo.nome);

    if (!deleted) {
      setError(message);
      return;
    }

    const created = await create(objetivo.nome);
    setLoading(false);
    router.navigate(`/objetivos/update?nome=${created.nome}`);
  }, [setLoading, setError, objetivo.nome, delette, create, router]);

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
  const { nome } = useLocalSearchParams();
  const { get } = useObjetivos();
  const [loading, setLoading] = useState<boolean>(false);
  const [plinio, setPlinio] = useState<Plinio | undefined>();
  const { show, clear } = usePlinio();

  const objetivo = get(nome as string);

  useEffect(() => {
    if (plinio) {
      show(plinio, {
        animated: true,
        title: "PARABÉNS!!!\nVOCÊ DESBLOQUEOU:",
      });
    } else {
      clear();
    }
  }, [plinio, show, clear]);

  if (loading) {
    return <LoadingComponent />;
  }

  if (!objetivo) {
    return <ErrorComponent message="Qual é o meu objetivo???" />;
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

      <Conteudo
        objetivo={objetivo}
        setLoading={setLoading}
        setPlinio={setPlinio}
      />
    </SafeAreaView>
  );
};

export default ObjetivosUpdate;
