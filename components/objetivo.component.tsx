import { Objetivo } from "@/types";
import { getPlinioFromObjetivo } from "@/utils";
import { daysBetween } from "@/utils/date.utils";
import { FC } from "react";
import {
  Avatar,
  IconButton,
  List,
  MD3Theme,
  useTheme,
} from "react-native-paper";

export type ObjetivoComponentProps = {
  objetivo: Objetivo;
  onPress: () => void;
  onDelete: () => void;
};

const getDescriptionColor = (
  fim: Date,
  today: Date,
  theme: MD3Theme,
): string => {
  const days = daysBetween(fim, today);

  if (days > 1) {
    return theme.colors.error;
  }

  if (days === 0) {
    return "#5cb85c";
  }

  return "black";
};

export const ObjetivoComponent: FC<ObjetivoComponentProps> = ({
  objetivo,
  onPress,
  onDelete,
}) => {
  const today = new Date();
  const theme = useTheme();
  const days = daysBetween(objetivo.inicio, objetivo.fim);

  return (
    <List.Item
      title={objetivo.nome}
      descriptionStyle={{
        color: getDescriptionColor(objetivo.fim, today, theme),
      }}
      description={`${days} dia${days === 1 ? "" : "s"}`}
      onPress={onPress}
      left={({ style, ...props }) => (
        <Avatar.Image
          {...props}
          style={{
            ...style,
            backgroundColor: theme.colors.elevation.level5,
          }}
          size={50}
          source={{ uri: getPlinioFromObjetivo(objetivo).uri }}
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
