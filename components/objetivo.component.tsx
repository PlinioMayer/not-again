import { Objetivo } from "@/types";
import { daysBetween } from "@/utils/date.utils";
import { FC } from "react";
import { Avatar, IconButton, List, useTheme } from "react-native-paper";

export type ObjetivoComponentProps = {
  objetivo: Objetivo;
  onPress: () => void;
  onDelete: () => void;
};

export const ObjetivoComponent: FC<ObjetivoComponentProps> = ({
  objetivo: {
    nome,
    inicio,
    fim,
    plinio: { url },
  },
  onPress,
  onDelete,
}) => {
  const theme = useTheme();
  return (
    <List.Item
      title={nome}
      description={`${daysBetween(inicio, fim).toString()} dias`}
      onPress={onPress}
      left={({ style, ...props }) => (
        <Avatar.Image
          {...props}
          style={{
            ...style,
            backgroundColor: theme.colors.elevation.level5,
          }}
          size={50}
          source={{ uri: url }}
        />
      )}
      right={(props) => (
        <IconButton
          icon="delete-outline"
          {...props}
          iconColor={theme.colors.error}
          size={25}
          onPress={onDelete}
        />
      )}
    />
  );
};
