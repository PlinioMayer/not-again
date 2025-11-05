import {
  ErrorComponent,
  LoadingComponent,
  PlinioCardComponent,
  SpacerComponent,
} from "@/components";
import { useObjetivos, usePlinio } from "@/contexts";
import { Plinio } from "@/types";
import { getAllPlinios } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  fab: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListText: {
    textAlign: "center",
  },
  listRow: {
    flexDirection: "row",
    gap: 10,
    height: 200,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullContainer: {
    padding: 10,
  },
  listItem: {
    flex: 1,
  },
});

const Plinios = () => {
  const { objetivos } = useObjetivos();
  const { show } = usePlinio();
  const [plinios, setPlinios] = useState<Plinio[][] | undefined | null>();
  const fetch = useCallback(() => {
    const temp: Plinio[][] = [];
    getAllPlinios(objetivos).forEach((plinio, i) => {
      if (i % 2) {
        temp[Math.floor(i / 2)][1] = plinio;
      } else {
        temp[i / 2] = [plinio];
      }
    });

    setPlinios(temp);
  }, [setPlinios, objetivos]);

  useEffect(fetch, [fetch]);

  if (plinios === undefined) {
    return <LoadingComponent />;
  }

  if (plinios === null) {
    return <ErrorComponent message="Perdi meus plínios :(" reload={fetch} />;
  }

  return (
    <SafeAreaView style={styles.main}>
      <FlatList
        data={plinios}
        onRefresh={fetch}
        contentContainerStyle={
          !plinios.length ? styles.emptyContainer : styles.fullContainer
        }
        ListEmptyComponent={() => (
          <Text variant="headlineSmall" style={styles.emptyListText}>
            Nenhum Plínio pra você
          </Text>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <View style={styles.listRow}>
            <TouchableRipple
              style={styles.listItem}
              onPress={() => {
                show(item[0]);
              }}
            >
              <PlinioCardComponent plinio={item[0]} dias={true} />
            </TouchableRipple>
            {item[1] ? (
              <TouchableRipple
                style={styles.listItem}
                onPress={() => {
                  show(item[1]);
                }}
              >
                <PlinioCardComponent plinio={item[1]} dias={true} />
              </TouchableRipple>
            ) : (
              <SpacerComponent />
            )}
          </View>
        )}
        keyExtractor={(item) => item[0].nome}
        refreshing={plinios === undefined}
      />
    </SafeAreaView>
  );
};

export default Plinios;
