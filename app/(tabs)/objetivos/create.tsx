import { SafeAreaView, StyleSheet } from "react-native";
import { Button, TextInput, Text, useTheme } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { ObjetivoForm } from "@/types";
import { LoadingComponent, SpacerComponent } from "@/components";
import { useCallback, useState } from "react";
import { useError } from "@/contexts/error.context";
import { router } from "expo-router";
import { useObjetivos } from "@/contexts";

const styles = StyleSheet.create({
  main: {
    flex: 1,
    margin: 20,
  },
  hint: {
    marginTop: 5,
  },
});

const ObjetivosCreate = () => {
  const { create } = useObjetivos();
  const { setError } = useError();
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ObjetivoForm>({
    values: {
      nome: "",
    },
  });

  const onSubmit = useCallback(
    async ({ nome }: ObjetivoForm) => {
      setLoading(true);

      if (!create(nome)) {
        setError("Erro ao criar objetivo.");
        setLoading(false);
      } else {
        setLoading(false);
        router.back();
      }
    },
    [setLoading, setError, create],
  );

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <SafeAreaView style={styles.main}>
      <Controller
        control={control}
        name="nome"
        rules={{
          required: { message: "Valor obrigatório", value: true },
          minLength: { message: "Valor obrigatório", value: 1 },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nome"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
        )}
      />
      {errors.nome && (
        <Text
          style={{ ...styles.hint, color: theme.colors.error }}
          variant="labelLarge"
        >
          {errors.nome?.message}
        </Text>
      )}

      <SpacerComponent />

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Salvar
      </Button>
    </SafeAreaView>
  );
};

export default ObjetivosCreate;
