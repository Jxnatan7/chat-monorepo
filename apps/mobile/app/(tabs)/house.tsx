import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";

export default function House() {
  return (
    <Container
      variant="screen"
      containerHeaderProps={{ title: "Residência", hideBackButton: true }}
    >
      <Text width="100%" textAlign="left" variant="infoTitle" my="l">
        Gerenciador
      </Text>
      <TextInput label="Nome" placeholder="Nome do Gerenciador" />
      <TextInput
        containerProps={{ marginTop: "s" }}
        label="Descrição"
        placeholder="Descrição do Gerenciador"
      />
      <Text width="100%" textAlign="left" variant="infoTitle" mt="xl" mb="l">
        Informações da Residência
      </Text>
      <TextInput
        containerProps={{ marginTop: "s" }}
        label="Nome da Residência"
        placeholder="Nome que será exibido para o entregador"
      />
      <TextInput
        containerProps={{ marginTop: "s" }}
        label="Endereço"
        placeholder="Endereço da Residência"
      />
      <TextInput
        containerProps={{ marginTop: "s" }}
        label="Descrição"
        placeholder="Descrição da Residência"
      />
      <Button
        text="Salvar"
        variant="primary"
        alignSelf="center"
        marginTop="xxl"
      />
    </Container>
  );
}
