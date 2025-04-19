import {
  ContadorComponent,
  ErrorComponent,
  LoadingComponent,
} from "@/components";
import { useDate, useError, usePlinio } from "@/contexts";
import { useObjetivos } from "@/contexts/objetivos.context";
import { Objetivo, Plinio } from "@/types";
import { daysBetween } from "@/utils/date.utils";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useAudioPlayer } from "expo-audio";
import { ConfettiComponent } from "@/components/confetti.component";

const cheers = require("../../../assets/audio/cheers.mp3");
const aww = require("../../../assets/audio/aww.mp3");

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
  setSucesso,
  setPlinio,
}: {
  objetivo: Objetivo;
  setLoading: (loading: boolean) => void;
  setSucesso: (sucesso: boolean) => void;
  setPlinio: (plinio: Plinio | undefined) => void;
}) => {
  const { update, fetch, delette, create } = useObjetivos();
  const theme = useTheme();
  const { today } = useDate();
  const dias = daysBetween(objetivo.fim, today);
  const { setError } = useError();
  const awwPlayer = useAudioPlayer(aww);
  const router = useRouter();

  const updateObjetivo = useCallback(async () => {
    setLoading(true);
    const res = await update(objetivo.documentId, { fim: "today" });

    if (res === null) {
      setLoading(false);
      setError("Erro ao atualizar objetivo.");
      return;
    }

    await fetch();
    setLoading(false);

    setSucesso(true);
    setPlinio(res);
  }, [update, setLoading, setError, fetch, objetivo, setSucesso, setPlinio]);

  const resetObjetivo = useCallback(async () => {
    const message = "Erro ao resetar objetivo.";
    setLoading(true);
    const deleted = await delette(objetivo.documentId);

    if (!deleted) {
      setError(message);
      return;
    }

    const created = await create(objetivo.nome);

    if (created === null) {
      setError(message);
      return;
    }

    await fetch();
    setLoading(false);
    router.navigate(
      `/objetivos/update?objetivoId=${created.objetivo.documentId}`,
    );
  }, [
    setLoading,
    setError,
    objetivo.documentId,
    objetivo.nome,
    fetch,
    delette,
    create,
    router,
  ]);

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
            <Button
              onPress={() => awwPlayer.play()}
              mode="contained"
              buttonColor={theme.colors.error}
            >
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
            <Button
              onPress={() => awwPlayer.play()}
              mode="contained"
              buttonColor={theme.colors.error}
            >
              Não
            </Button>
          </View>
        </>
      );
  }
};

const ObjetivosUpdate = () => {
  const cheersPlayer = useAudioPlayer(cheers);
  const { objetivoId } = useLocalSearchParams();
  const { get, fetch } = useObjetivos();
  const [loading, setLoading] = useState<boolean>(false);
  const [sucesso, setSucesso] = useState<boolean>(false);
  const [plinio, setPlinio] = useState<Plinio | undefined>();
  const { show, clear } = usePlinio();

  const objetivo = get(objetivoId as string);

  useEffect(() => {
    if (sucesso) {
      cheersPlayer.play();
    }
  }, [sucesso, cheersPlayer]);

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
    return <ErrorComponent reload={fetch} message="Qual é o meu objetivo???" />;
  }

  const daysBetweenInicioFim = daysBetween(objetivo.inicio, objetivo.fim);

  return (
    <SafeAreaView style={styles.main}>
      <ConfettiComponent show={sucesso} style={styles.confetti} />
      <View style={styles.contadorContainer}>
        <ContadorComponent
          value={daysBetweenInicioFim}
          style={styles.contador}
        />
        <Text variant="headlineLarge">Dias</Text>
      </View>

      <Conteudo
        objetivo={objetivo}
        setSucesso={setSucesso}
        setLoading={setLoading}
        setPlinio={setPlinio}
      />
    </SafeAreaView>
  );
};

export default ObjetivosUpdate;
