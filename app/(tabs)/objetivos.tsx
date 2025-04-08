import {
  ErrorComponent,
  LoadingComponent,
  ObjetivoComponent,
} from "@/components";
import { Objetivo } from "@/types";
import { axiosInstance } from "@/utils/axios.utils";
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

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
    <FlatList
      data={objetivos}
      renderItem={({ item }) => <ObjetivoComponent objetivo={item} />}
      keyExtractor={(item) => item.documentId}
      onRefresh={getObjetivos}
      refreshing={objetivos === undefined}
    />
  );
};

export default Objetivos;
