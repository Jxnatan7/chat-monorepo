import React from "react";
import { useRouter } from "expo-router";
import { Container } from "@/components/theme/Container";
import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Form, FormTextInput, FormButton } from "@/components/theme/Form";
import { loginFormValidation } from "@/utils/schemaValidation";
import { useAuthActions } from "@/contexts/AuthProvider";

export default function Login() {
  const { replace, push } = useRouter();
  const { login } = useAuthActions();

  const onSubmit = (values: any, { setFieldError }: any) => {
    try {
      login(values.email, values.password).then(() => {
        replace("/(tabs)/user");
      });
    } catch (err: any) {
      const message = "Erro ao realizar login.";
      setFieldError("password", message);
    }
  };

  return (
    <Container variant="screen">
      <Text variant="header" mt="xxxl">
        Faça o seu Login
      </Text>

      <Form
        initialValues={{ email: "", password: "" }}
        validate={loginFormValidation}
        onSubmit={onSubmit}
      >
        <FormTextInput
          name="email"
          marginTop="xl"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoFocus
        />
        <FormTextInput
          name="password"
          marginTop="m"
          placeholder="Senha"
          secureTextEntry
        />
        <FormButton text="Continuar" marginTop="xxxl" />
      </Form>
      <Button
        variant="secondary"
        text="Criar Conta"
        marginTop="s"
        onPress={() => push("/register")}
      />
    </Container>
  );
}
