import { Text } from "@/components/restyle";
import { Container } from "@/components/theme/Container";
import { Form, FormButton, FormTextInput } from "@/components/theme/Form";
import { useUserForm } from "@/hooks/useUserForm";
import { userFormValidation } from "@/utils/schemaValidation";
import { Alert } from "react-native";

export default function User() {
  const { initialValues, handleSubmit, isEditing, isLoading } = useUserForm();

  const onSubmit = async (values: any) => {
    try {
      await handleSubmit(values);
      Alert.alert("Sucesso", "Informações salvas com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  return (
    <Container
      variant="screen"
      containerHeaderProps={{ title: "Seu Perfil", hideBackButton: true }}
    >
      <Text width="100%" textAlign="left" variant="infoTitle" my="l">
        Usuário
      </Text>
      <Form
        initialValues={initialValues}
        validate={userFormValidation}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <FormTextInput name="name" label="Nome" placeholder="Seu Nome" />

        <FormTextInput
          containerProps={{ marginTop: "s" }}
          name="email"
          label="Email"
          placeholder="Seu Email"
          keyboardType="email-address"
        />

        <FormTextInput
          containerProps={{ marginTop: "s" }}
          name="phone"
          label="Telefone"
          placeholder="Seu Telefone"
        />

        <FormButton
          text={isEditing ? "Atualizar Dados" : "Salvar Tudo"}
          marginTop="xxxl"
        />
      </Form>
    </Container>
  );
}
