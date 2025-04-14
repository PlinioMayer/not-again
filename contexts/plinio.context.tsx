import { Plinio } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { StyleSheet, Image, View } from "react-native";
import { IconButton, Modal, Portal, Text } from "react-native-paper";

export const PlinioContext = createContext<{
  show: (plinio: Plinio, callback: () => void) => void;
  clear: () => void;
}>({
  show: () => {
    throw new Error("PlinioContext.show não inicializado");
  },
  clear: () => {
    throw new Error("PlinioContext.clear não inicializado");
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
  },
  main: {
    backgroundColor: "white",
    borderRadius: 10,
    height: "80%",
    width: "80%",
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
  icon: {},
});
export const PlinioProvider = ({ children }: { children: ReactNode }) => {
  const [plinio, setPlinio] = useState<Plinio | undefined>();
  const [callback, setCallback] = useState<() => void>();
  const show = useCallback(
    (plinio: Plinio, callback: () => void) => {
      setPlinio(plinio);
      setCallback(() => callback);
    },
    [setPlinio, setCallback],
  );
  const clear = useCallback(() => {
    setPlinio(undefined);
    if (callback) {
      callback();
    }
  }, [setPlinio, callback]);

  return (
    <PlinioContext.Provider value={{ show, clear }}>
      <Portal>
        <Modal
          visible={!!plinio}
          onDismiss={clear}
          contentContainerStyle={styles.container}
        >
          <View style={styles.main}>
            <Image source={{ uri: plinio?.url }} style={styles.image} />
            <Text variant="labelLarge">{plinio?.nome}</Text>
          </View>
          <IconButton
            icon="close-circle-outline"
            style={styles.icon}
            onPress={clear}
            iconColor="black"
            size={30}
          />
        </Modal>
      </Portal>
      {children}
    </PlinioContext.Provider>
  );
};

export const usePlinio = () => useContext(PlinioContext);
