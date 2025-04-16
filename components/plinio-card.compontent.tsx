import { Plinio } from "@/types";
import { StyleSheet, View, Image, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "lightgrey",
  },
});

export const PlinioCardComponent = ({
  plinio,
  style,
}: {
  plinio?: Plinio;
  style?: ViewStyle;
}) => (
  <View style={[styles.main, style]}>
    <Image source={{ uri: plinio?.url }} style={styles.image} />
    <Text variant="labelLarge">{plinio?.nome}</Text>
  </View>
);
