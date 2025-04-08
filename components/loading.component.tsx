import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export const LoadingComponent = () => (
  <View style={styles.main}>
    <ActivityIndicator size="large" />
  </View>
);
