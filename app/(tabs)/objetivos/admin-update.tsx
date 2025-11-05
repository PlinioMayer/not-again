import { StyleSheet, View } from "react-native";
import { Button, TextInput, Text, useTheme } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { Objetivo } from "@/types";
import { LoadingComponent, SpacerComponent } from "@/components";
import { useCallback, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useObjetivos } from "@/contexts";
import { SafeAreaView } from "react-native-safe-area-context";
import { DatePickerInput } from "react-native-paper-dates";

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
  const { nome } = useLocalSearchParams();
  const { get, update } = useObjetivos();
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);

  const objetivo = get(nome as string)!;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Objetivo>({
    values: {
      nome: objetivo.nome,
      inicio: objetivo.inicio,
      fim: objetivo.fim,
    },
  });

  const onSubmit = useCallback(
    async (data: Objetivo) => {
      setLoading(true);
      await update(objetivo.nome, data);
      setLoading(false);
    },
    [setLoading, objetivo.nome, update],
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

      <Controller
        control={control}
        name="inicio"
        rules={{
          required: { message: "Valor obrigatório", value: true },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginTop: 50 }}>
            <DatePickerInput
              locale="pt"
              label="Início"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputMode="start"
            />
          </View>
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

      <Controller
        control={control}
        name="fim"
        rules={{
          required: { message: "Valor obrigatório", value: true },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={{ marginTop: 80 }}>
            <DatePickerInput
              locale="pt"
              label="Fim"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              inputMode="start"
            />
          </View>
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
