import { SafeAreaView, StyleSheet } from "react-native";
import { Button, TextInput, Text, useTheme } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { ObjetivoForm } from "@/types";
import { SpacerComponent } from "@/components";

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
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ObjetivoForm>({
    values: {
      nome: "",
    },
  });
  const onSubmit = (data: ObjetivoForm) => {
    console.log(data);
  };

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
            onChange={onChange}
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
