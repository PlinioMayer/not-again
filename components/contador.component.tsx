import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ViewStyle } from "react-native";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
  },
  digito: {
    flex: 1,
    borderColor: "black",
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});

export const ContadorComponent = ({
  value,
  style,
}: {
  value: number;
  style: ViewStyle;
}) => {
  const [list, setList] = useState<[number, number, number, number, number]>([
    0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    setList([0, 0, 0, 0, 0]);
    const stringValue = value.toString();

    if (stringValue.length > 5) {
      throw TypeError("Valor do contador pode conter no máximo 5 dígitos");
    }

    const newList = stringValue.split("").map((v) => parseInt(v)) as [
      number,
      number,
      number,
      number,
      number,
    ];

    for (let i = newList.length; i < 5; i++) {
      newList.push(0);
    }

    setList(newList);
  }, [value, setList]);

  return (
    <View style={{ ...styles.main, ...style }}>
      <View style={styles.digito}>
        <Text>{list[4]}</Text>
      </View>
      <View style={styles.digito}>
        <Text>{list[3]}</Text>
      </View>
      <View style={styles.digito}>
        <Text>{list[2]}</Text>
      </View>
      <View style={styles.digito}>
        <Text>{list[1]}</Text>
      </View>
      <View style={styles.digito}>
        <Text>{list[0]}</Text>
      </View>
    </View>
  );
};
