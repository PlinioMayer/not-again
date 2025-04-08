import { Objetivo } from "@/types";
import { daysBetween } from "@/utils/date.utils";
import { FC } from "react";
import { Avatar, List, MD3LightTheme } from "react-native-paper";

export type ObjetivoComponentProps = {
  objetivo: Objetivo;
};

export const ObjetivoComponent: FC<ObjetivoComponentProps> = ({
  objetivo: {
    nome,
    inicio,
    fim,
    plinio: { url },
  },
}) => (
  <List.Item
    title={nome}
    description={daysBetween(inicio, fim).toString()}
    onPress={() => {}}
    left={({ style, ...props }) => (
      <Avatar.Image
        {...props}
        style={{
          ...style,
          backgroundColor: MD3LightTheme.colors.elevation.level5,
        }}
        size={30}
        source={{ uri: url }}
      />
    )}
  />
);
