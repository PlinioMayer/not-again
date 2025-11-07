import { Plinio } from "@/types";
import { StyleSheet, View, Image, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#EFE8E1",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#EBECEE",
    marginBottom: 10,
  },
  back: {
    backgroundColor: "#EFE8E1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  outerCircle: {
    padding: 10,
    borderRadius: "100%",
    borderColor: "black",
    borderWidth: 1,
  },
  innerCircle: {
    padding: 50,
    borderRadius: "100%",
    borderColor: "black",
    borderWidth: 1,
  },
});

export const PlinioCardComponent = ({
  plinio,
  style,
  dias,
}: {
  plinio?: Plinio;
  dias?: boolean;
  style?: ViewStyle;
}) => (
  <View style={[styles.main, style]}>
    <Image source={plinio?.uri} style={styles.image} />
    <Text variant="labelLarge">{plinio?.nome}</Text>
    {dias && <Text variant="labelMedium">{plinio?.dias} dias</Text>}
  </View>
);

export const PlinioBackComponent = () => (
  <View style={styles.back}>
    <View style={styles.outerCircle}>
      <View style={styles.innerCircle}>
        <Text variant="titleLarge">PM</Text>
      </View>
    </View>
  </View>
);
