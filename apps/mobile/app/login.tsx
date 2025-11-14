import React, { useEffect } from "react";
import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "expo-router";
import { Formik } from "formik";

export default function Login() {
  const { push } = useRouter();
  const { login, token } = useAuth();

  useEffect(() => {
    if (token) {
      console.log("🚀 ~ Login ~ token:", token);
    }
  }, [token]);

  return (
    <Container variant="screen">
      <Text variant="header" mt="xxxl">
        Faça o seu Login
      </Text>

      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: { email?: string; password?: string } = {};
          if (!values.email) {
            errors.email = "Email obrigatório";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Email inválido";
          }
          if (!values.password) {
            errors.password = "Senha obrigatória";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await login(values.email, values.password);
          } catch (err: any) {
            const message =
              err?.message ||
              "Erro ao realizar login. Verifique suas credenciais.";
            setFieldError("password", message);
            console.error("Login error:", err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <TextInput
              autoFocus
              marginTop="xl"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
            {errors.email && touched.email ? (
              <Text mt="s" variant="label-error">
                {errors.email}
              </Text>
            ) : null}

            <TextInput
              marginTop="m"
              placeholder="Senha"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
            {errors.password && touched.password ? (
              <Text mt="s" variant="label-error">
                {errors.password}
              </Text>
            ) : null}

            <Button
              text="Continuar"
              marginTop="xxxl"
              onPress={() => handleSubmit() as any}
              disabled={isSubmitting}
            />

            <Button
              variant="secondary"
              text="Criar Conta"
              marginTop="s"
              onPress={() => push("/register")}
            />
          </>
        )}
      </Formik>
    </Container>
  );
}
