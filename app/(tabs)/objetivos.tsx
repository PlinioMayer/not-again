import { ErrorComponent, LoadingComponent } from "@/components";
import { useAxios } from "@/contexts";
import { Objetivo } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

const Objetivos = () => {
  const axios = useAxios();
  const [objetivos, setObjetivos] = useState<Objetivo[] | undefined | null>();
  const getObjetivos = useCallback((): void => {
    axios.objetivos.get().then((objetivos) => {
      console.log(objetivos);
      setObjetivos(objetivos);
    });
  }, [axios, setObjetivos]);

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {objetivos.map((objetivo) => (
        <Text key={objetivo.documentId}>{objetivo.nome}</Text>
      ))}
    </View>
  );
};

export default Objetivos;
