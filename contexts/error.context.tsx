import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";

export const ErrorContex = createContext<{
  setError: (message: string) => void;
}>({
  setError: () => {
    throw new Error("ErrorContext.setError não inicializado");
  },
});

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | undefined>();
  const clearError = useCallback(() => {
    setError(undefined);
  }, [setError]);

  return (
    <ErrorContex.Provider value={{ setError }}>
      <Portal>
        <Dialog visible={!!error} onDismiss={clearError}>
          <Dialog.Title>Erro</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{error}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={clearError}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {children}
    </ErrorContex.Provider>
  );
};

export const useError = () => useContext(ErrorContex);
