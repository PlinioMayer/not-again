import { PlinioCardComponent } from "@/components";
import { Plinio } from "@/types";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { IconButton, Modal, Portal } from "react-native-paper";

export const PlinioContext = createContext<{
  show: (plinio: Plinio, callback?: () => void) => void;
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
  plinioCard: {
    width: "80%",
  },
});
export const PlinioProvider = ({ children }: { children: ReactNode }) => {
  const [plinio, setPlinio] = useState<Plinio | undefined>();
  const [callback, setCallback] = useState<() => void>();
  const show = useCallback(
    (plinio: Plinio, callback?: () => void) => {
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
          <PlinioCardComponent style={styles.plinioCard} plinio={plinio} />
          <IconButton
            icon="close-circle-outline"
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
