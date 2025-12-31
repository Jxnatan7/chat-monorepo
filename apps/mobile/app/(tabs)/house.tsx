import React from "react";
import { Alert } from "react-native";
import { Text } from "@/components/restyle";
import { Container } from "@/components/theme/Container";
import { Form, FormButton, FormTextInput } from "@/components/theme/Form";
import { providerResidenceFormValidation } from "@/utils/schemaValidation";
import {
  useResidenceForm,
  ResidenceFormValues,
} from "@/hooks/useResidenceForm";
import { PressableCopyPaste } from "@/components/theme/PressableCopyPaste";

const SectionTitle = ({
  children,
  mt = "l",
}: {
  children: string;
  mt?: "l" | "xl";
}) => (
  <Text
    width="100%"
    maxWidth={450}
    textAlign="left"
    variant="infoTitle"
    mt={mt}
    mb="l"
  >
    {children}
  </Text>
);

export default function House() {
  const { initialValues, handleSubmit, isEditing, isLoading } =
    useResidenceForm();

  const onSubmit = async (values: ResidenceFormValues) => {
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
      containerHeaderProps={{ title: "Configuração", hideBackButton: true }}
    >
      <Form
        initialValues={initialValues}
        validate={providerResidenceFormValidation}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <SectionTitle>Gerenciador</SectionTitle>

        <FormTextInput
          name="providerName"
          label="Nome"
          placeholder="Nome do Gerenciador"
        />

        <FormTextInput
          containerProps={{ marginTop: "s" }}
          name="providerDescription"
          label="Descrição"
          placeholder="Descrição do Gerenciador"
        />

        {initialValues.providerCode && (
          <PressableCopyPaste
            label="Código"
            value={initialValues.providerCode}
            containerProps={{ marginTop: "s" }}
          />
        )}

        <SectionTitle mt="xl">Informações da Residência</SectionTitle>

        <FormTextInput
          name="residenceName"
          label="Nome da Residência"
          placeholder="Ex: Casa de Praia"
        />

        <FormTextInput
          containerProps={{ marginTop: "s" }}
          name="residenceAddress"
          label="Endereço"
          placeholder="Endereço completo"
        />

        <FormTextInput
          containerProps={{ marginTop: "s" }}
          name="residenceDescription"
          label="Descrição"
          placeholder="Detalhes adicionais para entregadores"
        />

        <FormButton
          text={isEditing ? "Atualizar Dados" : "Salvar Tudo"}
          marginTop="xxxl"
        />
      </Form>
    </Container>
  );
}
