import { ErrorComponent, LoadingComponent } from "@/components";
import { useAxios } from "@/contexts";
import { Objetivo } from "@/types";
import { useState } from "react";
import { Text, View } from "react-native";

const Objetivos = () => {
  const axios = useAxios();
  const [objetivos, setObjetivos] = useState<Objetivo[] | undefined | null>(
    null,
  );

  if (objetivos === undefined) {
    return <LoadingComponent />;
  }

  if (objetivos === null) {
    return (
      <ErrorComponent reload={() => {}} message="Erro ao carregar objetivos" />
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
      <Text>Objetivos</Text>
    </View>
  );
};

export default Objetivos;
