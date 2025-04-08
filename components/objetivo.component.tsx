import { Objetivo } from "@/types";
import { FC } from "react";
import { List } from "react-native-paper";

export type ObjetivoComponentProps = {
  objetivo: Objetivo;
};

export const ObjetivoComponent: FC<ObjetivoComponentProps> = ({
  objetivo: { nome, inicio, fim },
}) => (
  <List.Item
    title={nome}
    left={(props) => <List.Icon {...props} icon="folder" />}
  />
);
