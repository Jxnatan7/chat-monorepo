export const loginFormValidation = (values: any) => {
  const errors: { email?: string; password?: string } = {};
  if (!values.email) {
    errors.email = "Email obrigatório";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }
  if (!values.password) {
    errors.password = "Senha obrigatória";
  }
  return errors;
};

export const registerFormValidation = (values: {
  name?: string;
  email?: string;
  password?: string;
}) => {
  const errors: { name?: string; email?: string; password?: string } = {};

  if (!values.name) {
    errors.name = "Nome obrigatório";
  }

  if (!values.email) {
    errors.email = "Email obrigatório";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }

  if (!values.password) {
    errors.password = "Senha obrigatória";
  }

  return errors;
};

export const providerResidenceFormValidation = (values: {
  providerName?: string;
  providerDescription?: string;
  residenceName?: string;
  residenceAddress?: string;
  residenceDescription?: string;
}) => {
  const errors: {
    providerName?: string;
    providerDescription?: string;
    residenceName?: string;
    residenceAddress?: string;
    residenceDescription?: string;
  } = {};

  if (!values.providerName) {
    errors.providerName = "Nome do provedor obrigatório";
  }

  if (!values.providerDescription) {
    errors.providerDescription = "Descrição do provedor obrigatória";
  }

  if (!values.residenceName) {
    errors.residenceName = "Nome da residência obrigatório";
  }

  if (!values.residenceAddress) {
    errors.residenceAddress = "Endereço da residência obrigatório";
  }

  if (!values.residenceDescription) {
    errors.residenceDescription = "Descrição da residência obrigatória";
  }

  return errors;
};

export const userFormValidation = (values: any) => {
  const errors: { name?: string; email?: string; phone?: string } = {};
  if (!values.name) {
    errors.name = "Nome obrigatório";
  }
  if (!values.email) {
    errors.email = "Email obrigatório";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Email inválido";
  }
  if (!values.phone) {
    errors.phone = "Telefone obrigatório";
  }
  return errors;
};
