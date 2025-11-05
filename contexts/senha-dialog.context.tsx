import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import {
  Dialog,
  Portal,
  TextInput,
  Text,
  useTheme,
  Button,
} from "react-native-paper";

type SenhaForm = {
  senha: string;
};
type SenhaDialogCallback = () => void;
const senhaDialogCallback: SenhaDialogCallback = () => {};

export const SenhaDialogContext = createContext<{
  callback?: SenhaDialogCallback;
  show: (callback: SenhaDialogCallback) => void;
  hide: () => void;
}>({
  show: () => {
    throw new Error("SenhaDialogContext.show não inicializada");
  },
  hide: () => {
    throw new Error("SenhaDialogContext.hide não inicializada");
  },
});

export const SenhaDialogProvider = ({ children }: { children: ReactNode }) => {
  const [callback, setCallback] = useState<SenhaDialogCallback>();
  const show = useCallback(
    (callback?: SenhaDialogCallback) =>
      setCallback(callback ? () => callback : senhaDialogCallback),
    [setCallback],
  );
  const hide = useCallback(() => setCallback(undefined), [setCallback]);

  return (
    <SenhaDialogContext.Provider value={{ callback, show, hide }}>
      {children}
    </SenhaDialogContext.Provider>
  );
};

export const useSenhaDialog = () => useContext(SenhaDialogContext);

const styles = StyleSheet.create({
  hint: {
    marginTop: 5,
  },
});

export const SenhaDialog = () => {
  const { callback, hide } = useSenhaDialog();
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SenhaForm>({
    values: {
      senha: "",
    },
  });

  return (
    <Portal>
      <Dialog visible={!!callback} onDismiss={hide}>
        <Dialog.Title>Você é o Plínio?</Dialog.Title>
        <Dialog.Content>
          <Controller
            control={control}
            name="senha"
            rules={{
              validate: (value) =>
                value === process.env.EXPO_PUBLIC_PLINIO_PASSWORD ||
                "Senha incorreta",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                secureTextEntry={true}
                error={!!errors.senha}
                label="Senha"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.senha && (
            <Text
              style={{ ...styles.hint, color: theme.colors.error }}
              variant="labelLarge"
            >
              {errors.senha?.message}
            </Text>
          )}
        </Dialog.Content>
        <Dialog.Actions style={{ justifyContent: "space-between" }}>
          <Button onPress={hide}>Não</Button>
          <Button
            onPress={handleSubmit(() => {
              hide();
              setValue("senha", "");
              callback!();
            })}
          >
            Sim
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
