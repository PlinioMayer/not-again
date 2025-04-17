import {
  ErrorComponent,
  LoadingComponent,
  PlinioCardComponent,
  SpacerComponent,
} from "@/components";
import { usePlinio } from "@/contexts";
import { Plinio } from "@/types";
import { axiosInstance } from "@/utils";
import { useCallback, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";

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
  const { show } = usePlinio();
  const [plinios, setPlinios] = useState<Plinio[][] | undefined | null>();
  const fetch = useCallback(() => {
    axiosInstance.plinios.get().then((plinios) => {
      const temp: Plinio[][] = [];
      plinios?.forEach((plinio, i) => {
        if (i % 2) {
          temp[Math.floor(i / 2)][1] = plinio;
        } else {
          temp[i / 2] = [plinio];
        }
      });
      setPlinios(temp);
    });
  }, [setPlinios]);

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
              <PlinioCardComponent plinio={item[0]} />
            </TouchableRipple>
            {item[1] ? (
              <TouchableRipple
                style={styles.listItem}
                onPress={() => {
                  show(item[1]);
                }}
              >
                <PlinioCardComponent plinio={item[1]} />
              </TouchableRipple>
            ) : (
              <SpacerComponent />
            )}
          </View>
        )}
        keyExtractor={(item) => item[0].documentId}
        refreshing={plinios === undefined}
      />
    </SafeAreaView>
  );
};

export default Plinios;
