import { Text } from "@/components/restyle";
import Button from "@/components/theme/Button";
import { Container } from "@/components/theme/Container";
import { TextInput } from "@/components/theme/TextInput";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "expo-router";
import { Formik } from "formik";

export default function Register() {
  const { replace } = useRouter();
  const { register } = useAuth();

  return (
    <Container variant="screen">
      <Text variant="header" mt="xxxl">
        Crie a sua conta
      </Text>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
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
            await register({
              name: values.name,
              email: values.email,
              password: values.password,
            });
            replace("/(tabs)/house");
          } catch (err: any) {
            const message =
              err?.message ||
              "Erro ao realizar cadastro. Verifique suas credenciais.";
            setFieldError("password", message);
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
              placeholder="Nome"
              autoCapitalize="none"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            {errors.name && touched.name ? (
              <Text mt="s" variant="label-error">
                {errors.name}
              </Text>
            ) : null}

            <TextInput
              marginTop="m"
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
          </>
        )}
      </Formik>
    </Container>
  );
}
