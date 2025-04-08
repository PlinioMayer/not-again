import { ErrorComponent, LoadingComponent } from "@/components";
import { Objetivo } from "@/types";
import { axiosInstance } from "@/utils/axios.utils";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

const Objetivos = () => {
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
    <View
      style={{
        flex: 1,
      }}
    >
      {objetivos.map((objetivo) => (
        <Text key={objetivo.documentId}>{objetivo.nome}</Text>
      ))}
    </View>
  );
};

export default Objetivos;
