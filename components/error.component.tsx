import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View } from "react-native";
import { TouchableRipple, Text } from "react-native-paper";

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});

export type ErrorComponentProps = {
  reload?: () => void;
  message: string;
};

export const ErrorComponent = ({ reload, message }: ErrorComponentProps) => (
  <TouchableRipple style={styles.touchable} onPress={reload}>
    <View style={styles.main}>
      <Text variant="titleLarge">{message}</Text>
      <MaterialCommunityIcons name="reload" size={30} />
      <Text variant="titleSmall">Toque para recarregar.</Text>
    </View>
  </TouchableRipple>
);
